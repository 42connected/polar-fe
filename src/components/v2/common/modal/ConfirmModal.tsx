import styled from 'styled-components';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultTheme from '@/styles/themeV2';
import Button from '../Button';
import { ConfirmModalBox } from './ModalBox';

interface ModalProps {
  XButtonFunc: () => void;
}

function ConfirmModal(props: ModalProps) {
  const { XButtonFunc } = props;

  return (
    <div>
      <ModalBackground>
        <ConfirmModalBox>
          <XButton>
            <FontAwesomeIcon
              icon={faXmark}
              size="2x"
              style={{ opacity: 0.3, cursor: 'pointer' }}
              onClick={XButtonFunc}
            />
          </XButton>
          <ModalContainer>
            <ModalConfirmText>정말로 취소하시겠습니까?</ModalConfirmText>
          </ModalContainer>
          <ButtonContainer>
            <ConfirmButton>
              <Button
                type="button"
                size="small"
                onClick={XButtonFunc}
                fullWidth
              >
                네
              </Button>
            </ConfirmButton>
            <ConfirmButton>
              <Button
                type="button"
                size="small"
                bgColor="red"
                onClick={XButtonFunc}
                fullWidth
              >
                아니오
              </Button>
            </ConfirmButton>
          </ButtonContainer>
        </ConfirmModalBox>
      </ModalBackground>
    </div>
  );
}

export default ConfirmModal;

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

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ModalConfirmText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeMedium};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 2.6rem;
`;

const ConfirmButton = styled.div`
  width: 5.7rem;
`;
