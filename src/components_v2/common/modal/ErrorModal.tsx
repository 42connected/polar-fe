import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import defaultTheme from '../../../styles/theme';
import Button from '../Button';
import { ErrorModalBox } from './ModalBox';

const ModalBackground = styled.div`
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
  z-index: ${defaultTheme.zIndex.modal};
`;

const XButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  border: none;
`;

const ModalTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeLarge};
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 2.6rem;
`;

const ErrorModalTitle = styled(ModalTitle)`
  justify-content: flex-start;
  margin-left: 2rem;
`;

const ErrorModalText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeMedium};
`;

const ErrorButton = styled.div`
  width: 6rem;
`;

interface ModalProps {
  XButtonFunc: () => void;
}

function ErrorModal(props: ModalProps) {
  const { XButtonFunc } = props;
  return (
    <ModalBackground>
      <ErrorModalBox>
        <ModalTitleContainer>
          <XButton onClick={XButtonFunc}>
            <FontAwesomeIcon
              icon={faXmark}
              size="2x"
              style={{ opacity: 0.3, cursor: 'pointer' }}
              onClick={XButtonFunc}
            />
          </XButton>
          <ErrorModalTitle>🚨 42폴라 에러</ErrorModalTitle>
        </ModalTitleContainer>
        <ModalContainer>
          <ErrorModalText>로그인이 필요한 페이지입니다.</ErrorModalText>
        </ModalContainer>
        <ButtonContainer>
          <ErrorButton>
            <Button
              type="button"
              size="medium"
              bgColor="red"
              onClick={XButtonFunc}
              fullWidth
            >
              닫기
            </Button>
          </ErrorButton>
        </ButtonContainer>
      </ErrorModalBox>
    </ModalBackground>
  );
}

export default ErrorModal;
