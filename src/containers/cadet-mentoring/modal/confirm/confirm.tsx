import styled from '@emotion/styled';
import { InputCounter } from '../../../../components/input-counter';
import defaultTheme from '../../../../styles/theme';
import { ModalInfoElement } from '../modal-info-element';
import { constTime } from './const-time';

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
}

export function Confirm(props: ConfirmProps) {
  return (
    <Container>
      {constTime(props?.meetingAt)}
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
      {props.rejectMessage ? (
        <ModalInfoElement
          title={'거절 사유'}
          titleColor={'black'}
          content={props?.rejectMessage}
          link={''}
        />
      ) : (
        <></>
      )}
      <ModalInfoElement
        title={props.isReject ? '취소 사유' : '질문 내용'}
        titleColor={defaultTheme.colors.polarSimpleMain}
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
