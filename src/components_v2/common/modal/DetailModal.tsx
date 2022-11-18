import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import defaultTheme from '@/styles/themeV2';
import Button from '../Button';
import ModalInfoRow from './ModalInfoRow';
import ModalInputBox from './ModalInputBox';
import { DetailModalBox } from './ModalBox';

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
  margin: 2rem 0;
`;

const ModalInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  padding-top: 0.6rem;
`;

const ModalStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.5rem;
  height: 2rem;
  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeMedium};
  background-color: ${defaultTheme.colors.green};
  color: ${defaultTheme.colors.white};
  border-radius: 0.5rem;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: auto;
  background-color: ${defaultTheme.colors.inputBoxColor};
  border-radius: 1rem;
  margin: 0 auto;
  margin-top: 2.6rem;
  padding: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 2.6rem;
  margin-top: 2.6rem;
`;

const DetailButton = styled.div`
  width: 8.3rem;
`;

interface ModalProps {
  status: string;
  XButtonFunc: () => void;
}

function DetailModal(props: ModalProps) {
  const { status, XButtonFunc } = props;
  return (
    <div>
      <ModalBackground>
        <DetailModalBox>
          <XButton onClick={XButtonFunc}>
            <FontAwesomeIcon
              icon={faXmark}
              size="2x"
              style={{ opacity: 0.3, cursor: 'pointer' }}
              onClick={XButtonFunc}
            />
          </XButton>
          <ModalTitleContainer>
            <ModalTitle>
              멘토링 세부사항<ModalStatus>{status}</ModalStatus>
            </ModalTitle>
          </ModalTitleContainer>
          <ModalContainer>
            <ModalBody>
              <ModalInfoBox>
                <ModalInfoRow
                  title="신청시간"
                  content="2022. 10. 30 05:00 (2시간 30분)"
                />
                <ModalInfoRow title="카뎃 이름" content="jokang(강주현)" />
                <ModalInfoRow title="보고서 작성" content="작성불가" />
                <ModalInfoRow
                  title="멘토링 주제"
                  content="42 폴라 프론트엔드 새로운 개발을 하게 되었습니다 어떤식으로 해야할 지 잘...생각중 입니다"
                />
              </ModalInfoBox>
              <ModalInputBox title="질문 내용" content="" />
            </ModalBody>
            <ModalBody>
              <ModalInputBox title="거절 사유" content="" />
            </ModalBody>
          </ModalContainer>
          <ButtonContainer>
            <DetailButton>
              <Button
                type="button"
                size="medium"
                onClick={XButtonFunc}
                fullWidth
              >
                수락
              </Button>
            </DetailButton>
            <DetailButton>
              <Button
                type="button"
                size="medium"
                bgColor="red"
                onClick={XButtonFunc}
                fullWidth
              >
                창 닫기
              </Button>
            </DetailButton>
          </ButtonContainer>
        </DetailModalBox>
      </ModalBackground>
    </div>
  );
}

export default DetailModal;
