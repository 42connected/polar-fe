import styled from '@emotion/styled';
import { NewDateKr } from '@/states/date-kr';
import { MentoringLogs } from '@/states/my-mentoring-mentor/MentorLogStore';
import defaultTheme from '@/styles/theme';
import {
  getDayToString,
  START_TIME,
  END_TIME,
  getTimeToString,
} from '@/containers/reports/report-form';
import { sliceMoreInfoStr } from '@/containers/my-mentoring-mentor/email';
import { isValidTime } from '@/containers/my-mentoring-mentor/modal/wait/select-time';
import { ReportButton } from '@/containers/my-mentoring-mentor/report-button';
import { StatusButton } from '@/containers/my-mentoring-mentor/status-button';

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
  color: ${defaultTheme.colors.polarSimpleMain};
  cursor: pointer;
  &:hover {
    text-decoration: underline wavy;
    opacity: 0.6;
    text-underline-position: under;
  }
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
  const startTime: Date = NewDateKr(meetingAt);
  if (!isValidTime(startTime)) {
    return '-';
  }

  return `${startTime.getFullYear().toString().substring(2)}.${
    startTime.getMonth() + 1
  }.${startTime.getDate()}
  `;
};

function stringToDate(log: MentoringLogs) {
  log.createdAt = NewDateKr(log.createdAt);
  if (log.meetingAt) {
    log.meetingAt = [
      NewDateKr(log.meetingAt[START_TIME]),
      NewDateKr(log.meetingAt[END_TIME]),
    ];
  }
  if (log.meta.requestTime[0])
    log.meta.requestTime[0] = [
      NewDateKr(log.meta.requestTime[0][START_TIME]),
      NewDateKr(log.meta.requestTime[0][END_TIME]),
    ];
  if (log.meta.requestTime[1])
    log.meta.requestTime[1] = [
      NewDateKr(log.meta.requestTime[1][START_TIME]),
      NewDateKr(log.meta.requestTime[1][END_TIME]),
    ];
  if (log.meta.requestTime[2])
    log.meta.requestTime[2] = [
      NewDateKr(log.meta.requestTime[2][START_TIME]),
      NewDateKr(log.meta.requestTime[2][END_TIME]),
    ];
}

export function TableRow(props: TableRowProps) {
  const log = JSON.parse(JSON.stringify(props.log));
  stringToDate(log);
  return (
    <TableColumnLine>
      <TableColumnDate>{getDayToShortString(props?.createdAt)}</TableColumnDate>
      <TableColumnUser>{props.user}</TableColumnUser>
      <TableColumnTopic
        onClick={() => {
          props.setLog(log);
          props.setApplyModal(true);
        }}
      >
        {sliceMoreInfoStr(props.topic, 17)}
      </TableColumnTopic>
      <TableColumnTime>
        <Time>{getDayToString(NewDateKr(props?.meetingAt?.[START_TIME]))}</Time>
        <TimeWhile>
          {getTimeToString([
            NewDateKr(props?.meetingAt?.[START_TIME]),
            NewDateKr(props?.meetingAt?.[END_TIME]),
          ])}
        </TimeWhile>
      </TableColumnTime>
      <StatusButton
        status={props.mentoringState}
        log={log}
        setLog={props.setLog}
        setApplyModal={props.setApplyModal}
      />
      <ReportButton
        mentoringLogStatus={props.mentoringState}
        report={props?.report}
        mentoringId={props?.mentoringId}
      />
    </TableColumnLine>
  );
}
