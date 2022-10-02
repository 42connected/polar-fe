import styled from '@emotion/styled';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { OneButtonModal } from '../../../components/modal/one-button-modal/one-button-modal';
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
  cursor: pointer;
`;

export interface ApplyDetailModalProps {
  id: string;
  status: string;
  content: string;
  mentoringTopic: string;
  meetingAt: Date[];
  requestTime: Date[][];
  mentor: {
    name: string;
    intraId: string;
  };
  rejectMessage: string;
  setApplyModal: (b: boolean) => void;
  feedbackMessage: string | null;
}

export const MENTORING_STATUS = {
  CANCLE: '취소',
  WAITING: '대기중',
  CONFIRM: '확정',
  DONE: '완료',
};

export function ApplyDetailModal(props: ApplyDetailModalProps) {
  const [isReject, setIsReject] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<string>('');
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');

  return (
    <Box>
      {modal && (
        <OneButtonModal
          TitleText="✅ 42폴라 알림"
          Text={modalText}
          ButtonText="닫기"
          ButtonBg={`${defaultTheme.colors.polarSimpleMain}`}
          ButtonFunc={() => {
            setModal(false);
            window.location.reload();
          }}
        />
      )}
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
        <StatusBox
          style={{
            backgroundColor:
              props.status === MENTORING_STATUS.CANCLE
                ? defaultTheme.colors.Red
                : props.status === MENTORING_STATUS.DONE
                ? defaultTheme.colors.polarSimpleMain
                : defaultTheme.colors.polarBrightMain,
          }}
        >
          {props.status}
        </StatusBox>
      </ModalHeader>
      <ModalBody>
        {props.status === '대기중' ? (
          <Wait
            content={props.content}
            mentoringTopic={props.mentoringTopic}
            requestTime={props.requestTime}
            mentor={props.mentor}
            isReject={isReject}
            isRejectSetter={setIsReject}
            rejectReason={rejectReason}
            rejectReasonSetter={setRejectReason}
            selectedTimeIndex={selectedTimeIndex}
            setSelectedTimeIndex={setSelectedTimeIndex}
            rejectMessage={props.rejectMessage}
          />
        ) : (
          <Confirm
            content={props.content}
            meetingAt={props.meetingAt}
            mentoringTopic={props.mentoringTopic}
            mentor={props.mentor}
            isReject={isReject}
            isRejectSetter={setIsReject}
            rejectReason={rejectReason}
            rejectReasonSetter={setRejectReason}
            rejectMessage={props.rejectMessage}
            feedbackMessage={props.feedbackMessage}
          />
        )}
      </ModalBody>
      <ModalFooter
        id={props.id}
        status={props.status}
        isReject={isReject}
        setIsReject={setIsReject}
        rejectReason={rejectReason}
        selectedTime={props.requestTime[parseInt(selectedTimeIndex)]}
        setModal={setModal}
        setModalText={setModalText}
      />
    </Box>
  );
}
