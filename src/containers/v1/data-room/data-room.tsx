import theme from '@/styles/theme';
import React, { useState, useCallback, ReactNode, useEffect } from 'react';
import { Pagination } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Button from '@/components/v1/button';
import { ThemeProvider } from '@mui/system';
import styled from 'styled-components';
import DataRoomList from '@/containers/v1/data-room/data-room-list';
import SearchBox from '@/components/v1/data-room/search-box';
import AuthStore, { USER_ROLES } from '@/states/auth/AuthStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { dataRoomQuery } from '@/interfaces/v1/data-room/data-room-query.interface';
import { useMediaQuery } from 'react-responsive';
import LoadingStore from '@/states/loading/LoadingStore';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '@/states/error/ErrorStore';
import { OneButtonModal } from '@/components/v1/modal/one-button-modal/one-button-modal';
import { NowDateKr } from '@/states/date-kr';
import {
  axiosWithNoData,
  AXIOS_METHOD_WITH_NO_DATA,
} from '@/context/axios-interface';
import axios from 'axios';
import { RequestErrorResponse } from '@/containers/v1/apply-page/apply-page';
import { dataRoomProps } from '@/interfaces/v1/data-room/data-room-props.interface';

export const muiPaginationTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.polarSimpleMain,
    },
    secondary: {
      main: theme.colors.polarBrightMain,
    },
  },
  typography: {
    fontFamily: 'SEBANG Gothic',
    fontSize: 20,
    fontWeightLight: 700,
  },
});

const DataRoomDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const DataRoomTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 10rem;
  padding-left: 3rem;
  padding-bottom: 2rem;
  ${theme.fontFrame.titleMedium}
`;

const DataRoomButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  height: 4rem;
  ${theme.fontFrame.titleMedium}
`;

const DataRoomNavigationDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const DataRoomButton = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-left: 1rem;
  ${theme.fontFrame.titleMedium}
`;

const Back = styled.div`
  position: fixed;
  width: 100%;
  height: 23rem;
  top: 0;
  left: 0;
`;

const DRButton = styled(Button)`
  z-index: 100;
`;

const DRButtonReport = styled(Button)`
  z-index: 100;
  background-color: ${theme.colors.polarSimpleMain};
  border-radius: 30%;
`;

const DRButtonReportAll = styled(Button)`
  z-index: 100;
  background-color: ${theme.colors.polarSimpleMain};
  border-radius: 20%;
`;

type DRProps = {
  children: ReactNode;
};

const DataRoomBodyForPcLarge = styled.div`
  width: 120rem;
`;
const DataRoomBodyForPcSmall = styled.div`
  width: 160rem;
  margin-left: -10rem;
  margin-right: -10rem;
  -webkit-transform: scale(0.75);
  transform: scale(0.75);
  transform-origin: top;
`;

function DataRoom() {
  const take = 20; //한 페이지
  const [page, setPage] = useState<number>(1); //현재 페이지
  const [total, setTotal] = useState<number>(0); //전체 값
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [query, setQuery] = useState<dataRoomQuery>({
    page: page,
    take: take,
    isAscending: false,
  });
  const [datas, setDatas] = useState<dataRoomProps[]>(
    Array(query.take).fill({}),
  );
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [errorModalMsg, setErrorModalMsg] = useState<string>('');
  const onClickSearchBoxModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);
  const navigate = useNavigate();
  const isDesktopLarge = useMediaQuery({
    minWidth: 900,
  });
  const isDesktopSmall = useMediaQuery({
    maxWidth: 900,
    minWidth: 500,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const DataRoomBodyForDesktop: React.FC<DRProps> = props => {
    return (
      <>
        {isDesktopLarge ? (
          <DataRoomBodyForPcLarge>{props.children}</DataRoomBodyForPcLarge>
        ) : (
          <DataRoomBodyForPcSmall>{props.children}</DataRoomBodyForPcSmall>
        )}
      </>
    );
  };

  useEffect(() => {
    LoadingStore.on();
    let url = `/bocals/data-room?page=${query.page}&take=${query.take}`;

    if (query.isAscending)
      url = url.concat(`&isAscending=${query.isAscending}`);
    if (query.date) url = url.concat(`&date=${query.date}`);
    if (query.mentorIntra)
      url = url.concat(`&mentorIntra=${query.mentorIntra}`);
    if (query.mentorName) url = url.concat(`&mentorName=${query.mentorName}`);

    try {
      axiosWithNoData(AXIOS_METHOD_WITH_NO_DATA.GET, url, {
        headers: {
          Authorization: `bearer ${AuthStore.getAccessToken()}`,
        },
      })
        .then(async response => {
          if (response.status === 200) {
            const tmpOffset: number =
              query.page * query.take > response.data.total
                ? response.data.total % query.take
                : query.take;

            if (tmpOffset < query.take) {
              setDatas(
                response.data.reports.concat(
                  Array(query.take - tmpOffset).fill({}),
                ),
              );
            } else setDatas(response.data.reports);
            setTotal(response.data.total);
            setOffset(tmpOffset);
          } else {
            ErrorStore.on(
              '데이터를 가져오는 중 오류가 발생하였습니다.',
              ERROR_DEFAULT_VALUE.TITLE,
            );
          }
        })
        .catch(error => {
          if (axios.isAxiosError(error)) {
            const message = (error.response?.data as RequestErrorResponse)
              .message;
            ErrorStore.on(message, ERROR_DEFAULT_VALUE.TITLE);
          } else
            ErrorStore.on(
              '데이터를 가져오는 중 오류가 발생하였습니다.',
              ERROR_DEFAULT_VALUE.TITLE,
            );
          if (error.response?.status === 401 || error.response?.status === 403)
            navigate('/');
        })
        .finally(() => {
          setIsLoading(false);
          LoadingStore.off();
        });
    } catch (error) {
      ErrorStore.on(
        '데이터를 가져오는 중 오류가 발생하였습니다.',
        ERROR_DEFAULT_VALUE.TITLE,
      );
    }
  }, [query, offset, setOffset, setTotal, total]);

  const SetReportStatusAllToModify = async () => {
    LoadingStore.on();

    const realurl = `${process.env.REACT_APP_BASE_BACKEND_URL}/bocals/data-room/reports/all/edit`;

    try {
      const res = await fetch(realurl, {
        method: 'PATCH',
        headers: {
          Authorization: `bearer ${AuthStore.getAccessToken()}`,
          'Content-type': 'application/json',
        },
      });

      if (res.status === 200) {
      } else {
        LoadingStore.off();
        ErrorStore.on(
          '레포트 상태를 변경하는 도중 오류가 발생하였습니다.',
          ERROR_DEFAULT_VALUE.TITLE,
        );
        return;
      }
    } catch (error) {
      LoadingStore.off();
      ErrorStore.on(
        '레포트 상태를 변경하는 도중 오류가 발생하였습니다.',
        ERROR_DEFAULT_VALUE.TITLE,
      );
      return;
    }

    LoadingStore.off();

    window.location.reload();
  };

  const SetReportStatusAllToDone = async () => {
    LoadingStore.on();

    const realurl = `${process.env.REACT_APP_BASE_BACKEND_URL}/bocals/data-room/reports/all/done`;

    try {
      const res = await fetch(realurl, {
        method: 'PATCH',
        headers: {
          Authorization: `bearer ${AuthStore.getAccessToken()}`,
          'Content-type': 'application/json',
        },
      });

      if (res.status === 200) {
      } else {
        LoadingStore.off();
        ErrorStore.on(
          '레포트 상태를 변경하는 도중 오류가 발생하였습니다.',
          ERROR_DEFAULT_VALUE.TITLE,
        );
        return;
      }
    } catch (error) {
      LoadingStore.off();
      ErrorStore.on(
        '레포트 상태를 변경하는 도중 오류가 발생하였습니다.',
        ERROR_DEFAULT_VALUE.TITLE,
      );
      return;
    }

    LoadingStore.off();

    window.location.reload();
  };

  const SetReportStatusToModify = async () => {
    LoadingStore.on();

    const realurl = `${process.env.REACT_APP_BASE_BACKEND_URL}/bocals/data-room/reports/edit`;
    const data = {
      id: selectedList,
    };

    if (selectedList.length === 0) {
      LoadingStore.off();
      setErrorModalMsg('멘토링 정보를 하나 이상 선택해주세요.');
      setErrorModal(true);
      return;
    }

    try {
      const res = await fetch(realurl, {
        method: 'PATCH',
        headers: {
          Authorization: `bearer ${AuthStore.getAccessToken()}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
      } else {
        LoadingStore.off();
        ErrorStore.on(
          '레포트 상태를 변경하는 도중 오류가 발생하였습니다.',
          ERROR_DEFAULT_VALUE.TITLE,
        );
        return;
      }
    } catch (error) {
      LoadingStore.off();
      ErrorStore.on(
        '레포트 상태를 변경하는 도중 오류가 발생하였습니다.',
        ERROR_DEFAULT_VALUE.TITLE,
      );
      return;
    }

    LoadingStore.off();

    window.location.reload();
  };

  const SetReportStatusToDone = async () => {
    LoadingStore.on();

    const realurl = `${process.env.REACT_APP_BASE_BACKEND_URL}/bocals/data-room/reports/done`;
    const data = {
      id: selectedList,
    };

    if (selectedList.length === 0) {
      LoadingStore.off();
      setErrorModalMsg('멘토링 정보를 하나 이상 선택해주세요.');
      setErrorModal(true);
      return;
    }

    try {
      const res = await fetch(realurl, {
        method: 'PATCH',
        headers: {
          Authorization: `bearer ${AuthStore.getAccessToken()}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
      } else {
        LoadingStore.off();
        ErrorStore.on(
          '레포트 상태를 변경하는 도중 오류가 발생하였습니다.',
          ERROR_DEFAULT_VALUE.TITLE,
        );
        return;
      }
    } catch (error) {
      LoadingStore.off();
      ErrorStore.on(
        '레포트 상태를 변경하는 도중 오류가 발생하였습니다.',
        ERROR_DEFAULT_VALUE.TITLE,
      );
      return;
    }

    LoadingStore.off();

    window.location.reload();
  };

  const getExcel = async () => {
    LoadingStore.on();
    const realurl = `${process.env.REACT_APP_BASE_BACKEND_URL}/bocals/data-room/excel`;
    const data = {
      reportIds: selectedList,
    };

    if (selectedList.length === 0) {
      LoadingStore.off();
      setErrorModalMsg('멘토링 정보를 하나 이상 선택해주세요.');
      setErrorModal(true);
      return;
    }

    try {
      const res = await fetch(realurl, {
        method: 'POST',
        headers: {
          Authorization: `bearer ${AuthStore.getAccessToken()}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.status === 201) {
        const blob = await res.blob();
        const newBlob = new Blob([blob]);
        const blobUrl = window.URL.createObjectURL(newBlob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute(
          'download',
          `mentoring-data_${NowDateKr()
            .toLocaleDateString('ko-KR')
            .replaceAll(' ', '')}xlsx`,
        );
        document.body.appendChild(link);
        link.click();
        link?.parentNode?.removeChild(link);

        window.URL.revokeObjectURL(blobUrl);
      } else {
        LoadingStore.off();
        ErrorStore.on(
          '엑셀 데이터를 가져오는 중 오류가 발생하였습니다.',
          ERROR_DEFAULT_VALUE.TITLE,
        );
        return;
      }
    } catch (error) {
      LoadingStore.off();
      ErrorStore.on(
        '엑셀 데이터를 가져오는 중 오류가 발생하였습니다.',
        ERROR_DEFAULT_VALUE.TITLE,
      );
      return;
    }

    LoadingStore.off();
  };

  function printReports() {
    LoadingStore.on();
    let url = '/report-detail?autoPrint=true';
    if (selectedList.length === 0) {
      LoadingStore.off();
      setErrorModalMsg('멘토링 정보를 하나 이상 선택해주세요.');
      setErrorModal(true);
      return;
    }
    selectedList.forEach(data => (url += `&reportId=${data}`));
    LoadingStore.off();
    navigate(url);
  }

  if (!AuthStore.getAccessToken()) {
    ErrorStore.on('로그인이 필요한 서비스입니다.', ERROR_DEFAULT_VALUE.TITLE);
    AuthStore.Login();
    return <></>;
  } else if (AuthStore.getUserRole() !== USER_ROLES.BOCAL) {
    ErrorStore.on('접근 권한이 없습니다.', ERROR_DEFAULT_VALUE.TITLE);
    return <Navigate to="/" />;
  } else
    return (
      <>
        {errorModal && (
          <OneButtonModal
            TitleText="⚠️ 42폴라 경고"
            Text={errorModalMsg}
            XButtonFunc={() => {
              setErrorModal(false);
            }}
            ButtonText="닫기"
            ButtonBg="gray"
            ButtonFunc={() => {
              setErrorModal(false);
            }}
          />
        )}
        {!isLoading && (
          <DataRoomDiv>
            <DataRoomBodyForDesktop>
              <DataRoomTitle>데이터룸</DataRoomTitle>
              <DataRoomButtonDiv>
                <DataRoomButton>
                  {isOpenModal && (
                    <>
                      <Back onClick={onClickSearchBoxModal}></Back>
                      <SearchBox
                        query={query}
                        setPage={setPage}
                        setQuery={setQuery}
                        setSelectedList={setSelectedList}
                      />
                    </>
                  )}
                  <DRButton text="정렬" onClick={onClickSearchBoxModal} />
                </DataRoomButton>
                <DataRoomButton>
                  <DRButton text="출력" onClick={printReports} />
                </DataRoomButton>
                <DataRoomButton>
                  <DRButton text="엑셀 저장" onClick={getExcel} />
                </DataRoomButton>
                <DataRoomButton>
                  <DRButtonReport
                    text="선택수정"
                    onClick={SetReportStatusToModify}
                  />
                </DataRoomButton>
                <DataRoomButton>
                  <DRButtonReport
                    text="선택완료"
                    onClick={SetReportStatusToDone}
                  />
                </DataRoomButton>
                <DataRoomButton>
                  <DRButtonReportAll
                    text="전체수정"
                    onClick={SetReportStatusAllToModify}
                  />
                </DataRoomButton>
                <DataRoomButton>
                  <DRButtonReportAll
                    text="전체완료"
                    onClick={SetReportStatusAllToDone}
                  />
                </DataRoomButton>
              </DataRoomButtonDiv>
              {DataRoomList(
                query,
                setQuery,
                offset,
                datas,
                selectedList,
                setSelectedList,
                isDesktopLarge || isDesktopSmall,
              )}
              <DataRoomNavigationDiv>
                <ThemeProvider theme={muiPaginationTheme}>
                  <Pagination
                    count={Math.ceil(total / take)}
                    color="primary"
                    showFirstButton
                    showLastButton
                    page={page}
                    onChange={(_, page) => {
                      setPage(page);
                      setQuery({ ...query, page: page });
                      setOffset(page * take > total ? total % take : take);
                    }}
                  />
                </ThemeProvider>
              </DataRoomNavigationDiv>
            </DataRoomBodyForDesktop>
          </DataRoomDiv>
        )}
      </>
    );
}

export default DataRoom;
