import styled from '@emotion/styled';
import defaultTheme from '../../styles/theme';
import {
  getDayToString,
  getTimeToString,
  START_TIME,
} from '../reports/report-form';
import { ReportButton } from './report-button';
import { StatusButton } from './status-button';

export const TableColumnLine = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  height: 40px;
`;

const TableColumnDate = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const TableColumnUser = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const TableColumnTopic = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  display: flex;
  width: 30%;
  justify-content: left;
  align-items: center;
  padding-left: 30px;
`;

const TableColumnTime = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
`;

const Time = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
`;

const TimeWhile = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  color: ${defaultTheme.colors.polarSimpleMain};
  margin-left: 5px;
`;

export interface TableRowProps {
  //  applyTime: Date;
  //  meetingTime: Date[];
  user: string;
  topic: string;
  mentoringId: string;
  mentoringState: string;
  report: {
    id: string;
    status: string;
  };
  createdAt: Date;
  meetingAt: Date[];
}

export function TableRow(props: TableRowProps) {
  return (
    <TableColumnLine>
      <TableColumnDate>{getDayToString(props.createdAt)}</TableColumnDate>
      <TableColumnUser>{props.user}</TableColumnUser>
      <TableColumnTopic>{props.topic}</TableColumnTopic>
      <TableColumnTime>
        <Time>{getDayToString(props.meetingAt[START_TIME])}</Time>
        <TimeWhile>{getTimeToString(props.meetingAt)}</TimeWhile>
      </TableColumnTime>
      <StatusButton status={props.mentoringState} />
      <ReportButton
        mentoringLogStatus={props.mentoringState}
        report={props?.report}
        mentoringId={props?.mentoringId}
      />
    </TableColumnLine>
  );
}
