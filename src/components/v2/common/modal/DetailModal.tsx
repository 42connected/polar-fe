import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import defaultTheme from '@/styles/themeV2';
import Button from '../Button';
import ModalInfoRow from './ModalInfoRow';
import ModalInputBox from './ModalInputBox';
import { DetailModalBox } from './ModalBox';
import StatusButton from './StatusButton';
import { useEffect } from 'react';

interface ModalProps {
  status: '확정' | '완료' | '취소' | '대기중';
  XButtonFunc: () => void;
  meetDate: string;
  mentee: string;
  report: '작성 완료' | '작성 불가' | '작성 필요' | '작성중' | '수정 기간';
  text: string;
}

function DetailModal(props: ModalProps) {
  const { status, XButtonFunc, meetDate, mentee, report, text } = props;
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);
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
          <ModalTitle>
            멘토링 세부사항
            <div style={{ width: '5rem' }}>
              <StatusButton status={status} />
            </div>
          </ModalTitle>
          <ModalContainer>
            <ModalBody>
              <ModalInfoBox>
                <ModalInfoRow title="신청시간" content={meetDate} />
                <ModalInfoRow title="카뎃 이름" content={mentee} />
                <ModalInfoRow title="보고서 작성" content={report} />
                <ModalInfoRow title="멘토링 주제" content={text} />
              </ModalInfoBox>
              <ModalInputBox title="질문 내용" content="" />
            </ModalBody>
            <ModalBody>
              <ModalInputBox title="거절 사유" content="" />
            </ModalBody>
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
          </ModalContainer>
        </DetailModalBox>
      </ModalBackground>
    </div>
  );
}

export default DetailModal;

const ModalBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(246, 246, 246, 0.7);
  z-index: ${defaultTheme.zIndex.modal};
`;

const XButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  border: none;
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeLarge};
`;

const ModalContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  margin: 0;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 26rem;
  height: auto;
  background-color: ${defaultTheme.colors.inputBoxColor};
  border-radius: 1rem;
  margin: 2rem auto;
  padding: 1rem;
`;

const ModalInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  padding-top: 0.6rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding-bottom: 2.6rem;
`;

const DetailButton = styled.div`
  width: 8.3rem;
`;
