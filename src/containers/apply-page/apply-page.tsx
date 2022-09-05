import styled from 'styled-components';
import theme from '../../styles/theme';
import { useEffect, useState } from 'react';
import Modal from './modal';
import { debounce } from '@mui/material';
import { InputCounter } from './apply-input-counter';
import axios, { AxiosError } from 'axios';
import { PostApply } from './apply-interface';
import { axiosInstance } from '../../context/axios-interface';
import { useParams } from 'react-router-dom';
import AuthStore, { USER_ROLES } from '../../states/auth/AuthStore';
import { OneButtonModal } from '../../components/modal/one-button-modal/one-button-modal';
import { defaultTheme } from 'react-select';

const Wrapper = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: ${theme.colors.grayFour};
  }
  .modal button {
    outline: none;
    cursor: pointer;
    border: 0;
  }
  .modal > section {
    width: 90%;
    max-width: 960px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;
  }

  .modal > section > header {
    position: relative;
    padding: 16px 64px 16px 16px;
    background-color: #f1f1f1;
    font-weight: 700;
    ${theme.fontFrame.titleLarge};
  }
  .modal > section > header button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    background-color: transparent;
  }
  .modal > section > main {
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
  }
  .modal > section > footer {
    padding: 12px 16px;
    text-align: right;
  }
  .modal > section > footer button {
    padding: 6px 12px;
    color: #fff;
    background-color: #6c757d;
    border-radius: 5px;
    font-size: 13px;
  }
  .modal.openModal {
    display: flex;
    align-items: center;
    /* 모달 애니메이션 */
    animation: modal-bg-show 0.3s;
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ApplyContainer = styled.div`
  left: 0;
  ${theme.fontSize.sizeMedium};
  ${theme.font.sebangGothic};
  height: 77vh;
  width: 100%;
  display: grid;
  grid-template-rows: 80rem;
  grid-template-columns: 75rem 75rem;
  transition: all 0.25s ease-in-out;
  grid-template-areas: 'time applyText';
  text-align: center;
  align-content: center;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${theme.colors.polarBackground};
  color: ${theme.colors.blackOne};
`;

const MovApplyContainer = styled.div`
  left: 0;
  ${theme.fontSize.sizeMedium};
  ${theme.font.sebangGothic};
  height: 200vh;
  width: 100%;
  display: grid;
  grid-template-rows: 70rem 70rem;
  grid-template-columns: 45rem;
  transition: all 0.25s ease-in-out;
  grid-template-areas:
    'time '
    'applyText ';
  text-align: center;
  align-content: center;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${theme.colors.polarBackground};
  color: ${theme.colors.blackOne};
`;

const ApplypageStyle = styled.body`
  width: 100vw;
  height: 120vh;
  display: flex;
  flex-direction: row;
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;
  background-color: ${theme.colors.polarBackground};
`;
const Chooseplan = styled.div`
  display: flex;
  flex-flow: row;
  text-align: center;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  grid-area: time;
  grid-column-start: 1;
  grid-row-start: 1;
`;
const Content = styled.div`
  display: flex;
  flex-flow: row;
  text-align: center;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  grid-area: applyText;
  grid-column-start: 2;
  grid-row-start: 1;
`;

const MovChooseplan = styled.div`
  display: flex;
  flex-flow: row;
  text-align: center;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  grid-area: time;
`;
const MovContent = styled.div`
  display: flex;
  flex-flow: row;
  text-align: center;
  align-items: center;
  flex-direction: column;
  grid-area: applyText;
`;

const PlanButton1 = styled.button`
  padding-left: 11rem;
  box-shadow: ${theme.shadow.buttonShadow};
  text-align: center;
  align-items: center;
  ${theme.font.sebangGothic};
  font-size: 2rem;
  color: ${theme.fontColor.whiteColor};
  background-color: ${theme.colors.polarSimpleMain};
  margin-top: 4rem;
  border-radius: 20px;
  width: 30rem;
  height: 8rem;
  cursor: pointer;
  line-height: 12.5rem;
  border: none;
`;

const MovPlanButton1 = styled.button`
  padding-left: 8rem;
  box-shadow: ${theme.shadow.buttonShadow};
  text-align: center;
  align-items: center;
  ${theme.font.sebangGothic};
  font-size: 2rem;
  color: ${theme.fontColor.whiteColor};
  background-color: ${theme.colors.polarSimpleMain};
  margin-top: 4rem;
  border-radius: 20px;
  width: 24rem;
  height: 8rem;
  cursor: pointer;
  line-height: 12.5rem;
  border: none;
`;

const PlanButton2 = styled.button`
  padding-left: 11rem;
  box-shadow: ${theme.shadow.buttonShadow};
  ${theme.font.sebangGothic};
  font-size: 2rem;
  text-align: center;
  align-items: center;
  line-height: 12.5rem;
  color: ${theme.fontColor.whiteColor};
  background-color: ${theme.colors.polarBrightMain};
  margin-top: 4rem;
  border-radius: 20px;
  width: 30rem;
  height: 8rem;
  cursor: pointer;
  border: none;
`;

const MovPlanButton2 = styled.button`
  padding-left: 8rem;
  box-shadow: ${theme.shadow.buttonShadow};
  ${theme.font.sebangGothic};
  font-size: 2rem;
  text-align: center;
  align-items: center;
  line-height: 12.5rem;
  color: ${theme.fontColor.whiteColor};
  background-color: ${theme.colors.polarBrightMain};
  margin-top: 4rem;
  border-radius: 20px;
  width: 24rem;
  height: 8rem;
  cursor: pointer;
  border: none;
`;

const BottomSize = styled.div`
  margin-bottom: 1.5rem;
`;

const Line1 = styled.div`
  text-align: center;
  align-items: center;
  border-top: 0.3rem solid #000000;
  width: 60rem;
`;

const MovLine1 = styled.div`
  text-align: center;
  align-items: center;
  border-top: 0.3rem solid #000000;
  width: 45rem;
  margin-left: 2%;
  margin-right: 2%;
`;

const Line2 = styled.div`
  margin-top: 2rem;
  text-align: center;
  align-items: center;
  border-top: 0.1rem solid #000000;
  width: 60rem;
`;

const MovLine2 = styled.div`
  margin-top: 2rem;
  text-align: center;
  align-items: center;
  border-top: 0.1rem solid #000000;
  width: 45rem;
`;

const MainText = styled.div`
  margin-top: 2rem;
  text-align: center;
  ${theme.font.sebangGothic};
  ${theme.fontSize.sizeExtraMedium};
`;

const MainText2 = styled.div`
  margin-top: 2rem;
  text-align: center;
  ${theme.font.sebangGothic};
  ${theme.fontSize.sizeExtraMedium};
`;

const MiddleText = styled.div`
  margin-top: 4rem;
  ${theme.font.sebangGothic};
  color: ${theme.colors.grayTwo};
  ${theme.fontSize.sizeExtraSmall};
`;

const MiddleText2 = styled.div`
  ${theme.fontSize.sizeExtraSmall};
  font-weight: 400;
  color: ${theme.colors.grayTwo};
  margin-left: -55%;
  margin-top: 4rem;
  margin-bottom: -2rem;
`;

const MovMiddleText2 = styled.div`
  ${theme.fontSize.sizeExtraSmall};
  font-weight: 400;
  color: ${theme.colors.grayTwo};
  text-align: left;
  margin-right: 84%;
  margin-top: 4rem;
  margin-bottom: -2rem;
`;

const MiddleText3 = styled.div`
  ${theme.fontSize.sizeExtraSmall};
  font-weight: 400;
  color: ${theme.colors.grayTwo};
  margin-left: -51.5%;
  margin-bottom: -2rem;
`;

const MovMiddleText3 = styled.div`
  ${theme.fontSize.sizeExtraSmall};
  font-weight: 400;
  color: ${theme.colors.grayTwo};
  margin-right: 78%;
  margin-bottom: -2rem;
`;

const TextBox1 = styled.textarea`
  box-shadow: ${theme.shadow.buttonShadow};
  width: 50rem;
  height: 6rem;
  border-radius: 20px;
  ${theme.font.sebangGothic};
  ${theme.fontSize.sizeExtraSmall};
`;

const TextBox2 = styled.textarea`
  box-shadow: ${theme.shadow.buttonShadow};
  width: 50rem;
  height: 31rem;
  border-radius: 20px;
  ${theme.fontSize.sizeExtraSmall};
  ${theme.font.sebangGothic};
`;

const ModalView = styled.div.attrs(props => ({
  role: 'dialog',
}))`
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: white;
  border-radius: 30px;
  color: #4000c7;
`;

const ApplyButton = styled.button`
  margin-top: 4rem;
  box-shadow: ${theme.shadow.buttonShadow};
  text-align: center;
  ${theme.fontSize.sizeExtraSmall};
  ${theme.font.sebangGothic};
  color: ${theme.fontColor.titleColor};
  background-color: ${theme.colors.backgoundWhite};
  border-radius: 20px;
  width: 9rem;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
`;

const ApplyPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [topic, setTopic] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [requestTime, setRequestTime] = useState<Date[]>([]);
  const [done, setDone] = useState(false);
  const { mentorId } = useParams();
  const [token, setToken] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [errorModalMsg, setErrorModalMsg] = useState<string>('');

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleResize = debounce(() => {
    if (window.innerWidth < 1070) setIsMobile(true);
    else setIsMobile(false);
  }, 10);

  const postData: PostApply = {
    topic: topic,
    content: question,
    requestTime1: [
      new Date('2022-08-25T06:30:00Z'),
      new Date('2022-08-25T08:30:00Z'),
    ],
    requestTime2: null,
    requestTime3: null,
  };

  const postApply = async () => {
    try {
      await axiosInstance.post(
        `cadets/mentorings/apply/${mentorId}`,
        postData,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
    } catch (err) {
      setErrorModalMsg('요청 에러 발생');
      setErrorModal(true);
    }
  };

  useEffect(() => {
    setToken(AuthStore.getAccessToken());
    setRole(AuthStore.getUserRole());
    window.innerWidth <= 1070 ? setIsMobile(true) : setIsMobile(false);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const ClickEvent = () => {
    if (requestTime.length <= 0) {
      setErrorModalMsg('신청 시간을 선택해주세요');
    } else if (topic.length <= 0) {
      setErrorModalMsg('주제를 입력해주세요');
    } else if (question.length <= 0) {
      setErrorModalMsg('궁금한 점을 입력해주세요');
    } else {
      postApply();
      return;
    }
    setErrorModal(true);
  };

  return (
    <div className="applypage">
      {errorModal && (
        <OneButtonModal
          TitleText="⚠️ 42폴라 경고"
          Text={errorModalMsg}
          XButtonFunc={() => {
            setErrorModal(false);
          }}
          ButtonText="닫기"
          ButtonBg="gray"
          ButtonFunc={() => {
            setErrorModal(false);
          }}
        />
      )}
      {!isMobile ? ( //pc
        <div>
          <ApplyContainer>
            <Chooseplan>
              <Line1> </Line1>
              <MainText>일정 선택하기</MainText>
              <Line2> </Line2>
              <MiddleText>*최소 1개의 신청 시간을 선택해 주세요</MiddleText>
              <Wrapper>
                <PlanButton1 onClick={openModal}> 가능시간1</PlanButton1>
                <Modal
                  open={modalOpen}
                  close={closeModal}
                  header="멘토링 일정 선택"
                ></Modal>
                <PlanButton2 onClick={openModal}> 가능시간2</PlanButton2>
                <Modal
                  open={modalOpen}
                  close={closeModal}
                  header="멘토링 일정 선택"
                ></Modal>
                <PlanButton2 onClick={openModal}> 가능시간3 </PlanButton2>
                <BottomSize></BottomSize>
                <Modal
                  open={modalOpen}
                  close={closeModal}
                  header="멘토링 일정 선택"
                ></Modal>
              </Wrapper>
            </Chooseplan>
            <Content>
              <Line1> </Line1>
              <MainText2>신청 정보</MainText2>
              <Line2> </Line2>
              <MiddleText2> * 주제 </MiddleText2>
              <InputCounter
                setter={setTopic}
                value={topic}
                maxLength={150}
                width="50rem"
                disabled={false}
                height="2.6rem"
              />
              <MiddleText3> * 궁금한 점 </MiddleText3>
              <InputCounter
                setter={setQuestion}
                value={question}
                maxLength={500}
                width="50rem"
                disabled={false}
                height="12rem"
              />
              <ApplyButton onClick={ClickEvent}>제출</ApplyButton>
            </Content>
          </ApplyContainer>
        </div>
      ) : (
        <div>
          <MovApplyContainer>
            <MovChooseplan>
              <MovLine1> </MovLine1>
              <MainText>일정 선택하기</MainText>
              <MovLine2> </MovLine2>
              <MiddleText>*최소 1개의 신청 시간을 선택해 주세요</MiddleText>
              <Wrapper>
                <MovPlanButton1 onClick={openModal}> 가능시간1</MovPlanButton1>
                <Modal
                  open={modalOpen}
                  close={closeModal}
                  header="멘토링 일정 선택"
                ></Modal>
                <MovPlanButton2 onClick={openModal}> 가능시간2</MovPlanButton2>
                <Modal
                  open={modalOpen}
                  close={closeModal}
                  header="멘토링 일정 선택"
                ></Modal>
                <MovPlanButton2 onClick={openModal}> 가능시간3</MovPlanButton2>
                <Modal
                  open={modalOpen}
                  close={closeModal}
                  header="멘토링 일정 선택"
                ></Modal>
              </Wrapper>
            </MovChooseplan>
            <MovContent>
              <MovLine1> </MovLine1>
              <MainText2>신청 정보</MainText2>
              <MovLine2> </MovLine2>
              <MovMiddleText2> * 주제 </MovMiddleText2>
              <InputCounter
                setter={setTopic}
                value={topic}
                maxLength={150}
                width="40rem"
                disabled={false}
                height="4rem"
              />
              <MovMiddleText3> * 궁금한 점 </MovMiddleText3>
              <InputCounter
                setter={setQuestion}
                value={question}
                maxLength={800}
                width="40rem"
                disabled={false}
                height="20rem"
              />
              <ApplyButton onClick={ClickEvent}>제출</ApplyButton>
            </MovContent>
          </MovApplyContainer>
        </div>
      )}
      ;
    </div>
  );
};

export default ApplyPage;
