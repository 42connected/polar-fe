import styled from 'styled-components';
import { faCircleQuestion, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultTheme from '../../../styles/theme';
import { GuideModalBox } from './ModalBox';
import Button from '../Button';
import ModalInputBox from './ModalInputBox';

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

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 25rem;
  height: 28rem;
  background-color: ${defaultTheme.colors.inputBoxColor};
  border-radius: 1rem;
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

const GuideButton = styled.div`
  width: 8.3rem;
`;

interface ModalProps {
  XButtonFunc: () => void;
}

function GuideModal(props: ModalProps) {
  const { XButtonFunc } = props;
  return (
    <div>
      <ModalBackground>
        <GuideModalBox>
          <ModalTitleContainer>
            <XButton onClick={XButtonFunc}>
              <FontAwesomeIcon
                icon={faXmark}
                size="2x"
                style={{ opacity: 0.3, cursor: 'pointer' }}
                onClick={XButtonFunc}
              />
            </XButton>
            <ModalTitle>
              <div>
                멘토링 안내
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  size="1x"
                  style={{ paddingLeft: '0.5rem', opacity: 0.3 }}
                />
              </div>
            </ModalTitle>
          </ModalTitleContainer>
          <ModalBody>
            <ModalInputBox
              title="멘토링 상태 안내"
              content={`🚨 보고서는 멘토링을 실시한 달에 작성하셔야 합니다 (신청한 달이 아닌 멘토링한 달). 그렇지 않으면 보고서를 작성하지 못해 멘토링 비용을 받지 못할 수 있습니다.

작성불가: 멘토링 상태가 완료가 아닌 상태입니다. 완료는 멘토링 시작 시간 이후 작성가능합니다.

작성필요 : 멘토링이 완료되어 보고서를 작성, 임시저장 및 제출할 수 있습니다.
* 멘토링 확정 상태일 때 ‘전체보기’ 클릭 후 멘토링 완료를 누르면 멘토링이 완료상태로 바뀝니다.
* 보고서 작성을 위해서는 완료 상태에서 ‘전체보기’를 클릭해서 보고서 작성하기를 누르거나 ‘작성필요’버튼을 누릅니다.

작성중: 임시 저장된 보고서를 확인 및 수정하여 제출할 수 있습니다.

작성완료: 임시저장된 보고서를 확인 및 수정하여 제출할 수 있습니다.

수정기간: 해당 달의 보고서를 취합하는 기간입니다. 보고서를 관리자의 권한으로 멘토링 보고서를 수정할 수 있게 됩니다.`}
            />
            <ModalInputBox
              title="보고서 안내"
              content={`대기중: 멘토님께 온 카뎃의 멘토링 신청을 확인하고, 수락 및 거절할 수 있습니다.

⚠️ 48시간 이내에 수락하지 않으면 자동취소가 이루어집니다.

⚠️ 선택 가능한 시간이 존재하지 않으면 자동취소가 이루어집니다.

확정: 멘토링이 확정된 상태이며, 부득이하게 멘토링을 진행하지 못할 시 취소하거나 멘토링이 끝난 뒤 완료할 수 있습니다.

완료: 멘토링 시작시간이 지난 후 주제를 클릭하고 변경 가능합니다.`}
            />
          </ModalBody>
          <ButtonContainer>
            <GuideButton>
              <Button
                type="button"
                size="medium"
                bgColor="darkGray"
                onClick={XButtonFunc}
                fullWidth
              >
                창 닫기
              </Button>
            </GuideButton>
            <GuideButton>
              <Button
                type="button"
                size="medium"
                bgColor="red"
                onClick={XButtonFunc}
                fullWidth
              >
                멘토링 취소
              </Button>
            </GuideButton>
          </ButtonContainer>
        </GuideModalBox>
      </ModalBackground>
    </div>
  );
}

export default GuideModal;
