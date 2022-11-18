import styled from '@emotion/styled';
import {
  Fade,
  ModalBody,
  ModalBox,
  ModalButton,
  ModalButtonContainer,
  ModalTitle,
} from '@/components/modal/modal-styled';
import ErrorStore from '@/states/error/ErrorStore';
import defaultTheme from '@/styles/theme';
import { sliceMoreInfoStr } from '@/containers/v1/my-mentoring-mentor/email';

export const ErrorModalBackground = styled.div`
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

  z-index: 1000;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  animation: ${Fade} 0.3s;
`;

interface ErrorProps {
  TitleText: string;
  errorMsg: string;
}

export function Error(props: ErrorProps) {
  return (
    <ErrorModalBackground>
      <ModalBox>
        <ModalTitle>{props.TitleText}</ModalTitle>
        <ModalBody>{sliceMoreInfoStr(props.errorMsg, 120)}</ModalBody>
        <ModalButtonContainer>
          <ModalButton
            onClick={() => {
              ErrorStore.off();
            }}
            style={{
              backgroundColor: defaultTheme.colors.Red,
            }}
          >
            {sliceMoreInfoStr('닫기', 6)}
          </ModalButton>
        </ModalButtonContainer>
      </ModalBox>
    </ErrorModalBackground>
  );
}
