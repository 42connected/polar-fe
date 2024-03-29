import styled from '@emotion/styled';
import { InputCounter } from '../../../../components/input-counter';
import defaultTheme from '../../../../styles/theme';
import { ModalInfoElement } from '../modal-info-element';
import { selectTime } from './select-time';

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
  cadet: {
    name: string;
    intraId: string;
    isCommon: boolean;
    resumeUrl: string;
  };
  isReject: boolean;
  isRejectSetter: (p: boolean) => void;
  rejectReason: string;
  rejectReasonSetter: (input: string) => void;
  selectedTimeIndex: string;
  setSelectedTimeIndex: (s: string) => void;
}

export function Wait(props: WaitProps) {
  return (
    <Container>
      {selectTime(
        props?.requestTime,
        props?.selectedTimeIndex,
        props?.setSelectedTimeIndex,
      )}
      <ModalInfoElement
        title={'멘토링 구분'}
        titleColor={'black'}
        content={props?.cadet?.isCommon ? '공통과정' : '심화과정'}
      />
      <ModalInfoElement
        title={'카뎃 이름'}
        titleColor={'black'}
        content={props?.cadet?.name}
      />
      <ModalInfoElement
        title={'카뎃 Intra ID'}
        titleColor={'black'}
        content={props?.cadet?.intraId}
      />
      <ModalInfoElement
        title={'카뎃 이력서'}
        titleColor={'black'}
        content={
          props?.cadet?.resumeUrl
            ? `${props?.cadet?.resumeUrl.slice(0, 25)}...`
            : '링크 없음'
        }
        link={props?.cadet?.resumeUrl ? props?.cadet?.resumeUrl : ''}
      />
      <ModalInfoElement
        title={'멘토링 주제'}
        titleColor={'black'}
        content={props?.mentoringTopic}
      />
      <ModalInfoElement
        title={props.isReject ? '거절 사유' : '질문 내용'}
        titleColor={defaultTheme?.colors?.polarSimpleMain}
        content={''}
      />
      {props.isReject ? (
        <InputCounter
          setter={props.rejectReasonSetter}
          value={props.rejectReason}
          maxLength={250}
          inputDisabled={false}
          countDisabled={false}
        />
      ) : (
        <InputCounter
          value={props.content}
          inputDisabled={true}
          countDisabled={true}
        />
      )}
    </Container>
  );
}
