import DataRoomListElement from './data-room-list-element';
import {
  axiosWithNoData,
  AXIOS_METHOD_WITH_NO_DATA,
} from '../../context/axios-interface';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { dataRoomQuery } from '../../interface/data-room/data-room-query.interface';
import { dataRoomProps } from '../../interface/data-room/data-room-props.interface';
import { useState, useEffect } from 'react';
import CheckBox from '../../components/check-box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import AuthStore from '../../states/auth/AuthStore';
import DataRoomListElementMobile from './data-room-list-element-mobile';
import LoadingStore from '../../states/loading/LoadingStore';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHead = styled.th<{ width?: string }>`
  width: ${props => props.width ?? 'auto'};
  ${theme.fontFrame.subTitleMiddle};
  height: 3.6rem;
  border-top-style: solid;
  border-top-width: 0.2rem;
  border-bottom-style: solid;
  border-bottom-width: 0.05rem;
  border-color: ${theme.colors.grayThree};
`;

const API_URL = `/bocals/data-room`;
const config = {
  headers: {
    Authorization: `bearer ${AuthStore.getAccessToken()}`,
  },
};

function DataRoomList(
  query: dataRoomQuery,
  setQuery: (query: dataRoomQuery) => void,
  offset: number,
  setOffset: (offset: number) => void,
  total: number,
  setTotal: (total: number) => void,
  selectedList: string[],
  setSelectedList: (list: string[]) => void,
  isDesktop: boolean,
) {
  const [datas, setDatas] = useState<dataRoomProps[]>(
    Array(query.take).fill({}),
  );

  function buttonClickToggle(status: boolean, id: string) {
    if (status && selectedList.findIndex(data => data === id) === -1) {
      setSelectedList(selectedList.concat(id));
    } else if (!status) {
      setSelectedList(selectedList.filter(data => data !== id));
    }
  }

  function buttonAllToggle(status: boolean) {
    if (status) {
      setSelectedList(
        datas.slice(0, offset).map(data => {
          return data.id;
        }),
      );
    } else {
      setSelectedList([]);
    }
  }

  useEffect(() => {
    LoadingStore.on();
    let url = `${API_URL}?page=${query.page}&take=${query.take}`;

    if (query.isAscending)
      url = url.concat(`&isAscending=${query.isAscending}`);
    if (query.date) url = url.concat(`&date=${query.date}`);
    if (query.mentorIntra)
      url = url.concat(`&mentorIntra=${query.mentorIntra}`);
    if (query.mentorName) url = url.concat(`&mentorName=${query.mentorName}`);

    axiosWithNoData(AXIOS_METHOD_WITH_NO_DATA.GET, url, config)
      .then(async response => {
        const tmpOffset: number =
          query.page * query.take > response.data.total
            ? response.data.total % query.take
            : query.take;

        if (tmpOffset < query.take)
          setDatas(
            response.data.reports.concat(
              Array(query.take - tmpOffset).fill({}),
            ),
          );
        else setDatas(response.data.reports);
        setTotal(response.data.total);
        setOffset(tmpOffset);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        LoadingStore.off();
      });
  }, [query, offset, setOffset, setTotal, total]);

  function onAscendingChange() {
    setQuery({
      ...query,
      isAscending: !query.isAscending,
    });
  }

  return (
    <>
      <Table>
        <thead>
          <tr>
            <TableHead width="3%">
              <CheckBox
                key={'all'}
                onChange={e => buttonAllToggle(e.target.checked)}
                checked={
                  selectedList.length !== 0 && selectedList.length === offset
                    ? true
                    : false
                }
              ></CheckBox>
            </TableHead>
            {isDesktop && <TableHead width="10%">신청 일시</TableHead>}
            <TableHead width="8%">멘토 이름</TableHead>
            <TableHead width="8%">아이디</TableHead>
            <TableHead width="8%">카뎃 이름</TableHead>
            <TableHead width="8%">아이디</TableHead>
            <TableHead width="4%">구분</TableHead>
            <TableHead width="27%">
              멘토링 시간{' '}
              {query.isAscending === true && (
                <FontAwesomeIcon
                  icon={faSortUp}
                  fixedWidth
                  size="lg"
                  onClick={onAscendingChange}
                />
              )}
              {query.isAscending === false && (
                <FontAwesomeIcon
                  icon={faSortDown}
                  fixedWidth
                  size="lg"
                  onClick={onAscendingChange}
                />
              )}
            </TableHead>
            <TableHead width="8%">금액</TableHead>
            <TableHead width="8%">보고서</TableHead>
            {isDesktop && <TableHead width="8%">보고서 출력</TableHead>}
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => {
            if (isDesktop)
              return DataRoomListElement(
                data,
                index,
                buttonClickToggle,
                selectedList,
              );
            else
              return DataRoomListElementMobile(
                data,
                index,
                buttonClickToggle,
                selectedList,
              );
          })}
        </tbody>
      </Table>
      )
    </>
  );
}

export default DataRoomList;
