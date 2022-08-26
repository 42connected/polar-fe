import styled from '@emotion/styled';
import defaultTheme from '../../../../styles/theme';
import { Count } from '../confirm/confirm';
import { ModalInfoElement } from '../modal-info-element';
import { selectTime } from './select-time';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0px;
  /*background-color: ${defaultTheme.colors.polarBrightMain};*/
`;

const Input = styled.textarea`
  width: 80%;
  height: 100px;
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  vertical-align: top;
  resize: none;
  &:focus {
    outline: none;
  }
  background-color: ${defaultTheme.colors.polarGray};
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
        link={''}
      />
      <ModalInfoElement
        title={'카뎃 이름'}
        titleColor={'black'}
        content={props?.cadet?.name}
        link={''}
      />
      <ModalInfoElement
        title={'카뎃 Intra ID'}
        titleColor={'black'}
        content={props?.cadet?.intraId}
        link={''}
      />
      <ModalInfoElement
        title={'카뎃 이력서'}
        titleColor={'black'}
        content={
          props?.cadet?.resumeUrl
            ? `${props?.cadet?.resumeUrl.slice(0, 30)}...`
            : '링크 없음'
        }
        link={props?.cadet?.resumeUrl}
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
        <>
          <Input
            onChange={e => {
              props.rejectReasonSetter(e.target.value);
            }}
            value={props.rejectReason}
            maxLength={250}
          />
          <Count>{props.rejectReason.length} / 250</Count>
        </>
      ) : (
        <Input disabled={true} value={props.content} />
      )}
    </Container>
  );
}
