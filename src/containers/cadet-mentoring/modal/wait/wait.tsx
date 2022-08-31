import styled from '@emotion/styled';
import { InputCounter } from '../../../../components/input-counter';
import defaultTheme from '../../../../styles/theme';
import { ModalInfoElement } from '../modal-info-element';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0px;
`;

export interface WaitProps {
  content: string;
  mentoringTopic: string;
  requestTime: Date[][];
  mentor: {
    name: string;
    intraId: string;
  };
  rejectMessage: string;
  isReject: boolean;
  isRejectSetter: (p: boolean) => void;
  rejectReason: string;
  rejectReasonSetter: (input: string) => void;
  selectedTimeIndex: string;
  setSelectedTimeIndex: (s: string) => void;
}

const getDurationTime = (meetingAt: Date[]): string => {
  const hour = meetingAt[1].getHours() - meetingAt[0].getHours();
  let minute = meetingAt[1].getMinutes() - meetingAt[0].getMinutes();
  minute = minute > 0 ? minute : -minute;
  return `${hour}시간 ${minute.toString().padStart(2, '0')}분`;
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
};

const getMeetingAt = (meetingAt: Date[]): string => {
  if (!meetingAt) {
    return '';
  }
  const hour = meetingAt[0].getHours().toString().padStart(2, '0');
  const minute = meetingAt[0].getMinutes().toString().padStart(2, '0');
  return `${formatDate(meetingAt[0])} ${hour}:${minute}  (${getDurationTime(
    meetingAt,
  )})`;
};

function formatRequestTimes(requestTime: Date[]): string {
  if (requestTime && requestTime.length) {
    return getMeetingAt(requestTime);
  }
  return '';
}

export function Wait(props: WaitProps) {
  return (
    <Container>
      {props.requestTime.map(time => {
        if (time && !isNaN(time[0].getDate())) {
          return (
            <ModalInfoElement
              title={'신청 시간'}
              titleColor={'black'}
              content={formatRequestTimes(time)}
              link={''}
            />
          );
        }
      })}
      <ModalInfoElement
        title={'멘토 이름'}
        titleColor={'black'}
        content={props?.mentor?.name}
        link={''}
      />
      <ModalInfoElement
        title={'멘토 Intra ID'}
        titleColor={'black'}
        content={props?.mentor?.intraId}
        link={''}
      />
      <ModalInfoElement
        title={'멘토링 주제'}
        titleColor={'black'}
        content={props?.mentoringTopic}
        link={''}
      />
      <ModalInfoElement
        title={props.isReject ? '거절 사유' : '질문 내용'}
        titleColor={defaultTheme?.colors?.polarSimpleMain}
        content={''}
        link={''}
      />
      {props.isReject ? (
        <InputCounter
          setter={props.rejectReasonSetter}
          value={props.rejectReason}
          maxLength={250}
          disabled={false}
        />
      ) : (
        <InputCounter value={props.content} disabled={true} />
      )}
    </Container>
  );
}
