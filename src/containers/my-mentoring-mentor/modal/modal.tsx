import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { MentoringLogs } from '../../../states/my-mentoring-mentor/MentorLogStore';
import defaultTheme from '../../../styles/theme';
import { ApplyDetailModal } from './apply-detail-modal';

const move = keyframes`
	//단계 별로 변화를 주는 코드
	0%{
    	top: 20px;
        left: 20px;
        background:green;
    }

    30%{
    	top: 50px;
        background:orange;
    }

    50%{
    	top: 100px;
        opacity: 0;
        left: 200px;
    }

    70%{
    	top: 150px;
        background: blue;
    }

    100%{
    	top: 20px;
        background: green;
        opacity: 1;
    }
`;

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
  log: MentoringLogs | undefined;
  applyModal: boolean;
  setApplyModal: (b: boolean) => void;
}

export function ApplyModal(props: ApplyDetailModalContainerProps) {
  return (
    <>
      {props.log && (
        <>
          {props.applyModal && (
            <Background>
              <ApplyDetailModal
                id={props?.log?.id}
                status={props?.log?.status}
                content={props?.log?.meta?.content}
                mentoringTopic={props?.log?.topic}
                meetingAt={props?.log?.meetingAt}
                requestTime={props?.log?.meta?.requestTime}
                button1={{
                  content: `${
                    props?.log?.status === '대기중' ? '수락' : '거절'
                  }`,
                  bg: `${defaultTheme.colors.polarSimpleMain}`,
                }}
                button2={{
                  content: `${
                    props?.log?.status === '대기중' ? '거절' : '나가기'
                  }`,
                  bg: 'gray',
                }}
                cadet={props?.log?.cadet}
                setApplyModal={props.setApplyModal}
              />
            </Background>
          )}
        </>
      )}
    </>
  );
}