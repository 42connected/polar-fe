import CheckBox from '@/components/check-box';
import { dataRoomProps } from '@/src/interfaces/data-room/data-room-props.interface';
import {
  TableData,
  CustomLink,
  refineMeetingAt,
} from '@/containers/v1/data-room/data-room-list-element';

function DataRoomListElementMobile(
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
      <TableData>{data.mentors?.name ?? ''}</TableData>
      <TableData>{data.mentors?.intraId ?? ''}</TableData>
      <TableData>{data.cadets?.name ?? ''}</TableData>
      <TableData>{data.cadets?.intraId ?? ''}</TableData>
      <TableData>
        {data.cadets ? (data.cadets?.isCommon ? '공통' : '심화') : ''}
      </TableData>
      {data.mentoringLogs?.meetingAt[0] ? (
        refineMeetingAt(data.mentoringLogs.meetingAt)
      ) : (
        <TableData></TableData>
      )}
      <TableData>{data.money?.toLocaleString('ko-KR') ?? ''}</TableData>
      <TableData>
        <CustomLink to={'/report-detail?reportId=' + data.id}>
          {data.id ? '상세보기' : ''}
        </CustomLink>
      </TableData>
    </tr>
  );
}

export default DataRoomListElementMobile;
