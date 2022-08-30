import theme from '../../styles/theme';
import React, { useState, useCallback, ReactNode } from 'react';
import { Pagination } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Button from '../../components/button';
import { ThemeProvider } from '@mui/system';
import styled from 'styled-components';
import SearchBox from '../../components/data-room/search-box';
import DataRoomList from './data-room-list';
import { mentoringIds } from '../../interface/data-room/mentoring-ids.interface';
import { TOKEN } from './data-room-list';
import AuthStore, { USER_ROLES } from '../../states/auth/AuthStore';
import { Navigate } from 'react-router-dom';
import { dataRoomQuery } from '../../interface/data-room/data-room-query.interface';
import { useMediaQuery } from 'react-responsive';

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
    fontFamily: theme.font.sebangGothic,
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

type DRProps = {
  children: ReactNode;
};

const DataRoomBodyForPcLarge = styled.div`
  width: 120rem;
`;
const DataRoomBodyForPcSmall = styled.div`
  width: 140rem;
  zoom: 0.75;
`;

function DataRoom() {
  const take = 20; //한 페이지
  const [page, setPage] = useState<number>(1); //현재 페이지
  const [total, setTotal] = useState<number>(0); //전체 값
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedList, setSelectedList] = useState<mentoringIds[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const onClickSearchBoxModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);
  const isDesktopLarge = useMediaQuery({
    minWidth: 900,
  });
  const isDesktopSmall = useMediaQuery({
    maxWidth: 900,
    minWidth: 500,
  });

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

  const getExcel = async () => {
    const realurl = `${process.env.REACT_APP_BASE_BACKEND_URL}bocals/data-room/excel`;
    const data = {
      reportIds: selectedList.map((data: mentoringIds) => {
        return data.reportId;
      }),
    };

    if (selectedList.length === 0) {
      alert('멘토링 정보를 하나 이상 선택해주세요.');
      return;
    }

    const res = await fetch(realurl, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${TOKEN}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const blob = await res.blob();
    const newBlob = new Blob([blob]);
    const blobUrl = window.URL.createObjectURL(newBlob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute(
      'download',
      `mentoring-data_${new Date()
        .toLocaleDateString('ko-KR')
        .replace(' ', '')}.xlsx`,
    );
    document.body.appendChild(link);
    link.click();
    link?.parentNode?.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  };

  const [query, setQuery] = useState<dataRoomQuery>({
    page: page,
    take: take,
    isAscending: false,
  });

  if (AuthStore.getUserRole() !== USER_ROLES.BOCAL) {
    alert('접근 권한이 없습니다.');
    return <Navigate to="/" />;
  } else
    return (
      <DataRoomDiv>
        <DataRoomBodyForDesktop>
          <DataRoomTitle>데이터룸</DataRoomTitle>
          <DataRoomButtonDiv>
            <DataRoomButton>
              {isOpenModal && (
                <>
                  <Back onClick={onClickSearchBoxModal}></Back>
                  <SearchBox query={query} setQuery={setQuery} />
                </>
              )}
              <DRButton text="정렬" onClick={onClickSearchBoxModal} />
            </DataRoomButton>
            <DataRoomButton>
              <DRButton text="출력" />
            </DataRoomButton>
            <DataRoomButton>
              <DRButton text="엑셀 저장" onClick={getExcel} />
            </DataRoomButton>
          </DataRoomButtonDiv>
          {DataRoomList(
            query,
            setQuery,
            offset,
            setOffset,
            total,
            setTotal,
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
    );
}

export default DataRoom;
