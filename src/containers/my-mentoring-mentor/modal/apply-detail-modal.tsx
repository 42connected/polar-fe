import styled from '@emotion/styled';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import defaultTheme from '../../../styles/theme';
import { Confirm } from './confirm/confirm';
import { ModalFooter } from './modal-footer';
import { Wait } from './wait/wait';

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 500px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const PageTitle = styled.div`
  display: flex;
  justify-content: center;
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeMedium};
`;

const StatusBox = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontFrame.titleLarge};
  ${defaultTheme.fontSize.sizeExtraSmall};
  color: ${defaultTheme.fontColor.whiteColor};
  display: flex;
  justify-content: center;
  width: 50px;
  padding: 0px 5px;
  margin-left: 20px;
  height: min-content;
  background-color: ${defaultTheme.colors.polarBrightMain};
  border-radius: 10px;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const ModalBody = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  background-color: ${defaultTheme.colors.polarGray};
  border-radius: 10px;
  margin: 20px 0px;
`;

const XButton = styled.div`
  display: flex;
  width: 90%;
  justify-content: right;
  align-items: center;
  margin-top: 20px;
`;

//const ConfirmTime = () => {};

export interface ApplyDetailModalProps {
  id: string;
  status: string;
  content: string;
  mentoringTopic: string;
  meetingAt: Date[];
  requestTime: Date[][];
  button1: {
    content: string;
    bg: string;
    //do: () => void;
  };
  button2: {
    content: string;
    bg: string;
    //do: () => void;
  };
  cadet: {
    name: string;
    intraId: string;
    isCommon: boolean;
    resumeUrl: string;
  };
  setApplyModal: (b: boolean) => void;
}

export function ApplyDetailModal(props: ApplyDetailModalProps) {
  const [isReject, setIsReject] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<string>('');
  //useEffect(() => {
  //},[])

  return (
    <Box>
      <XButton>
        <FontAwesomeIcon
          icon={faX}
          size="2x"
          style={{ opacity: 0.2 }}
          onClick={() => props.setApplyModal(false)}
        />
      </XButton>
      <ModalHeader>
        <PageTitle>멘토링 신청 세부사항</PageTitle>
        <StatusBox>{props.status}</StatusBox>
      </ModalHeader>
      <ModalBody>
        {props.status === '대기중' ? (
          <Wait
            content={props.content}
            mentoringTopic={props.mentoringTopic}
            requestTime={props.requestTime}
            cadet={props.cadet}
            isReject={isReject}
            isRejectSetter={setIsReject}
            rejectReason={rejectReason}
            rejectReasonSetter={setRejectReason}
          />
        ) : (
          <Confirm
            content={props.content}
            meetingAt={props.meetingAt}
            mentoringTopic={props.mentoringTopic}
            cadet={props.cadet}
            isReject={isReject}
            isRejectSetter={setIsReject}
            rejectReason={rejectReason}
            rejectReasonSetter={setRejectReason}
          />
        )}
      </ModalBody>
      <ModalFooter
        id={props.id}
        status={props.status}
        isReject={isReject}
        setIsReject={setIsReject}
        rejectReason={rejectReason}
      />
    </Box>
  );
}
