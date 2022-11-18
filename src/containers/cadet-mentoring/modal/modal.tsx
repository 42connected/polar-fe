import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { MentoringLog } from '@/interfaces/cadet-mentoring/mentoring-log.interface';
import { ApplyDetailModal } from '@/containers/cadet-mentoring/modal/apply-detail-modal';

const Fade = keyframes`
  0% {
   opacity: 0;
  }
  10% {
    opacity: 0.1;
  }
  20% {
    opacity: 0.2;
  }
  30% {
    opacity: 0.3;
  }
  40% {
    opacity: 0.4;
  }
  50% {
   opacity: 0.5;
  }
  60% {
    opacity: 0.6;
  }
  70% {
    opacity: 0.7;
  }
  80% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.9;
  }
  100% {
   opacity: 1;
  }
 `;

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(246, 246, 246, 0.7);

  z-index: 999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  animation: ${Fade} 0.3s;
`;

export interface ApplyDetailModalContainerProps {
  log: MentoringLog | undefined;
  applyModal: boolean;
  setApplyModal: (b: boolean) => void;
}

export function ApplyModal(props: ApplyDetailModalContainerProps) {
  useEffect(() => {
    document.body.style.overflow = `hidden`;
    return () => {
      document.body.style.overflow = `auto`;
    };
  }, []);

  return (
    <>
      {props.log && (
        <>
          {props.applyModal && (
            <Background>
              <ApplyDetailModal
                rejectMessage={props.log?.meta?.rejectMessage}
                id={props?.log?.id}
                status={props?.log?.status}
                content={props?.log?.meta?.content}
                mentoringTopic={props?.log?.topic}
                meetingAt={props?.log?.meta?.meetingAt}
                requestTime={props?.log?.meta?.requestTime}
                mentor={props?.log?.mentor}
                setApplyModal={props.setApplyModal}
                feedbackMessage={props?.log?.meta?.feedbackMessage}
              />
            </Background>
          )}
        </>
      )}
    </>
  );
}
