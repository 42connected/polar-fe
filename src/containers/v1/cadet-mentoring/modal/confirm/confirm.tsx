import styled from '@emotion/styled';
import { InputCounter } from '@/components/v1/input-counter';
import defaultTheme from '@/styles/theme';
import { ModalInfoElement } from '@/containers/v1/my-mentoring-mentor/modal/modal-info-element';
import { constTime } from '@/containers/v1/cadet-mentoring/modal/confirm/const-time';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0px;
`;

export interface ConfirmProps {
  content: string;
  mentoringTopic: string;
  meetingAt: Date[];
  mentor: {
    name: string;
    intraId: string;
  };
  rejectMessage: string;
  isReject: boolean;
  isRejectSetter: (p: boolean) => void;
  rejectReason: string;
  rejectReasonSetter: (input: string) => void;
  feedbackMessage: string | null;
}

export function Confirm(props: ConfirmProps) {
  return (
    <Container>
      {constTime(props?.meetingAt)}
      <ModalInfoElement
        title={'멘토 이름'}
        titleColor={'black'}
        content={props?.mentor?.name}
      />
      <ModalInfoElement
        title={'멘토 Intra ID'}
        titleColor={'black'}
        content={props?.mentor?.intraId}
        link={`${process.env.REACT_APP_ORIGIN}/mentor-detail/${props?.mentor?.intraId}`}
      />
      <ModalInfoElement
        title={'멘토링 주제'}
        titleColor={'black'}
        content={props?.mentoringTopic}
      />
      <ModalInfoElement
        title={props.isReject ? '취소 사유' : '질문 내용'}
        titleColor={defaultTheme.colors.polarSimpleMain}
        content={''}
      />
      {props.isReject ? (
        <InputCounter
          setter={props.rejectReasonSetter}
          value={props.rejectReason}
          maxLength={250}
          countDisabled={false}
          inputDisabled={false}
        />
      ) : (
        <InputCounter
          value={props.content}
          countDisabled={true}
          inputDisabled={true}
        />
      )}
      {props.feedbackMessage && (
        <>
          <ModalInfoElement
            title={'피드백 메시지'}
            titleColor={defaultTheme.colors.polarSimpleMain}
            content={''}
          />
          <InputCounter
            value={props.feedbackMessage}
            countDisabled={true}
            inputDisabled={true}
          />
        </>
      )}
      {props.rejectMessage && (
        <>
          <ModalInfoElement
            title={'거절 사유'}
            titleColor={defaultTheme.colors.polarSimpleMain}
            content={''}
          />
          <InputCounter
            value={props?.rejectMessage}
            countDisabled={true}
            inputDisabled={true}
          />
        </>
      )}
    </Container>
  );
}
