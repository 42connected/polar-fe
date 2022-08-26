import styled from '@emotion/styled';
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

export const Count = styled.div`
  display: flex;
  width: 80%;
  justify-content: right;
  margin: 5px;
  align-items: center;
  ${defaultTheme.fontSize.sizeSmall};
  color: rgba(0, 0, 0, 0.5);
`;

export interface ConfirmProps {
  content: string;
  mentoringTopic: string;
  meetingAt: Date[];
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
}

export function Confirm(props: ConfirmProps) {
  return (
    <Container>
      {constTime(props?.meetingAt)}
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
        link={props?.cadet?.resumeUrl}
      />
      <ModalInfoElement
        title={'카뎃 Intra ID'}
        titleColor={'black'}
        content={props?.cadet?.intraId}
        link={props?.cadet?.resumeUrl}
      />
      <ModalInfoElement
        title={'멘토링 주제'}
        titleColor={'black'}
        content={props?.mentoringTopic}
        link={''}
      />
      <ModalInfoElement
        title={props.isReject ? '취소 사유' : '질문 내용'}
        titleColor={defaultTheme.colors.polarSimpleMain}
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
