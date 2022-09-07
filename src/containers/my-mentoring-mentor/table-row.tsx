import styled from '@emotion/styled';
import { MentoringLogs } from '../../states/my-mentoring-mentor/MentorLogStore';
import defaultTheme from '../../styles/theme';
import {
  getDayToString,
  getTimeToString,
  START_TIME,
} from '../reports/report-form';
import { sliceMoreInfoStr } from './email';
import { ReportButton } from './report-button';
import { StatusButton } from './status-button';

export const TableColumnLine = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  height: 40px;
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  @media screen and (max-width: 800px) {
    ${defaultTheme.fontSize.sizeSmall};
  }
  @media screen and (max-width: 700px) {
    font-size: 1rem;
  }
`;

const TableColumnDate = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const TableColumnUser = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const TableColumnTopic = styled.div`
  display: flex;
  width: 30%;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  text-decoration: underline wavy;
  text-decoration-color: rgba(0, 0, 0, 0.2);
  text-underline-position: under;
`;

const TableColumnTime = styled.div`
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
`;

const Time = styled.div``;

const TimeWhile = styled.div`
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
  log: MentoringLogs;
  setApplyModal: (b: boolean) => void;
  setLog: (l: MentoringLogs) => void;
}

const getDayToShortString = (meetingAt: Date): string => {
  if (!meetingAt) {
    return '-';
  }
  const FAILED_TO_MAKE_NEW_DATE = -1;
  const startTime: Date = new Date(meetingAt);
  if (startTime.toString().indexOf('Invalid Date') > FAILED_TO_MAKE_NEW_DATE) {
    return '-';
  }

  return `${startTime.getFullYear().toString().substring(2)}.${
    startTime.getMonth() + 1
  }.${startTime.getDate()}
  `;
};

export function TableRow(props: TableRowProps) {
  return (
    <TableColumnLine>
      <TableColumnDate>{getDayToShortString(props?.createdAt)}</TableColumnDate>
      <TableColumnUser>{props.user}</TableColumnUser>
      <TableColumnTopic
        onClick={() => {
          props.setLog(props.log);
          props.setApplyModal(true);
        }}
      >
        {sliceMoreInfoStr(props.topic, 17)}
      </TableColumnTopic>
      <TableColumnTime>
        <Time>{getDayToString(props?.meetingAt?.[START_TIME])}</Time>
        <TimeWhile>{getTimeToString(props?.meetingAt)}</TimeWhile>
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
