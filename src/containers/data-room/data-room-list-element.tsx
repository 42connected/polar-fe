import CheckBox from '../../components/check-box';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { dataRoomProps } from '../../interface/data-room/data-room-props.interface';
import { NewDateKr } from '../../states/date-kr';
import { Link } from 'react-router-dom';

export const TableData = styled.td`
  height: 3.6rem;
  ${theme.fontFrame.bodyMiddle};
  border-bottom-style: solid;
  border-bottom-width: 0.05rem;
  text-align: center;
  vertical-align: middle;
  border-color: ${theme.colors.grayFour};
`;

export const CustomLink = styled(Link)`
  color: ${theme.colors.polarSimpleMain};
  ${theme.fontWeight.weightLarge};
`;

export function refineMeetingAt(rawDate: Date[]) {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dateString: string[] = [
    NewDateKr(rawDate[0]).toLocaleString('ko-KR'),
    NewDateKr(rawDate[1]).toLocaleString('ko-KR'),
  ];
  const date: Date[] = [NewDateKr(rawDate[0]), NewDateKr(rawDate[1])];

  const Div = styled.div`
    display: inline;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  `;

  const ColoredDiv = styled(Div)`
    color: ${theme.colors.polarSimpleMain};
    ${theme.fontWeight.weightLarge};
  `;

  return (
    <>
      <TableData>
        <Div>
          {dateString[0].split(/ 오. /)[0] +
            '(' +
            week[date[0].getDay()] +
            ') ' +
            date[0]
              .toTimeString()
              .slice(0, date[0].toTimeString().split(' ')[0].lastIndexOf(':'))}
        </Div>
        <ColoredDiv>
          {'(' +
            Math.floor(
              (date[1].getTime() - date[0].getTime()) / (1000 * 60 * 60),
            ) +
            '시간 ' +
            (((date[1].getTime() - date[0].getTime()) / (1000 * 60 * 60)) % 1) *
              60 +
            '분' +
            ')'}
        </ColoredDiv>
      </TableData>
    </>
  );
}

function DataRoomListElement(
  data: dataRoomProps,
  index: number,
  buttonClickToggle: (status: boolean, ids: string) => void,
  selectedList: string[],
) {
  return (
    <tr>
      <TableData>
        {data.id && (
          <CheckBox
            key={index}
            onChange={e => {
              buttonClickToggle(e.target.checked, data.id);
            }}
            checked={
              selectedList.findIndex(list => list === data.id) !== -1
                ? true
                : false
            }
          ></CheckBox>
        )}
      </TableData>
      <TableData>
        {data.mentoringLogs?.createdAt
          ? NewDateKr(data.mentoringLogs?.createdAt).toLocaleDateString('ko-KR')
          : ''}
      </TableData>
      <TableData>{data.mentors?.name ?? ''}</TableData>
      <TableData>{data.mentors?.intraId ?? ''}</TableData>
      <TableData>{data.cadets?.intraId ?? ''}</TableData>
      <TableData>
        {data.cadets ? (data.cadets?.isCommon ? '공통' : '심화') : ''}
      </TableData>
      {data.mentoringLogs?.meetingAt?.[0] ? (
        refineMeetingAt(data.mentoringLogs.meetingAt)
      ) : (
        <TableData></TableData>
      )}
      <TableData>{data.money?.toLocaleString('ko-KR') ?? ''}</TableData>
      <TableData>
        <CustomLink to={`/report-detail?reportId=${data.id}`}>
          {data.id ? '상세보기' : ''}
        </CustomLink>
      </TableData>
      <TableData>{data.status ?? ''}</TableData>
      <TableData>
        {data.updatedAt
          ? NewDateKr(data.updatedAt).toLocaleString('ko-KR')
          : ''}
      </TableData>
    </tr>
  );
}

export default DataRoomListElement;
