import styled from 'styled-components';
import theme from '../../styles/theme';
import { useEffect, useState } from 'react';
import { Button, debounce } from '@mui/material';
import { InputCounter } from './apply-input-counter';
import axios, { AxiosError } from 'axios';
import { PostApply } from './apply-interface';
import {
  axiosInstance,
  axiosWithNoData,
  AXIOS_METHOD_WITH_NO_DATA,
} from '../../context/axios-interface';
import { Navigate, useParams } from 'react-router-dom';
import AuthStore, { USER_ROLES } from '../../states/auth/AuthStore';
import { OneButtonModal } from '../../components/modal/one-button-modal/one-button-modal';
import { defaultTheme } from 'react-select';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '../../states/error/ErrorStore';
import { ApplyCalendarModal } from '../../components/apply-page/apply-calendar-modal';
import LoadingStore from '../../states/loading/LoadingStore';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import MentorDetailProps from '../../interface/mentor-detail/mentor-detail.interface';
import { NewDateKr, NowDateKr } from '../../states/date-kr';

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
  height: calc(100vh - 220px);
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
  background-color: ${theme.colors.backgoundWhite};
  color: ${theme.colors.blackOne};
`;

const MovApplyContainer = styled.div`
  left: 0;
  ${theme.fontSize.sizeMedium};
  ${theme.font.sebangGothic};
  height: calc(100% - 220px);
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
  background-color: ${theme.colors.backgoundWhite};
  color: ${theme.colors.blackOne};
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
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadow.buttonShadow};
  text-align: center;
  flex-wrap: wrap;
  ${theme.font.sebangGothic};
  font-size: 2rem;
  color: ${theme.fontColor.whiteColor};
  background-color: ${theme.colors.polarSimpleMain};
  margin-top: 4rem;
  border-radius: 20px;
  width: 30rem;
  height: 8rem;
  cursor: pointer;
  border: none;
`;

const MovPlanButton1 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadow.buttonShadow};
  text-align: center;
  flex-wrap: wrap;
  ${theme.font.sebangGothic};
  font-size: 2rem;
  color: ${theme.fontColor.whiteColor};
  background-color: ${theme.colors.polarSimpleMain};
  margin-top: 4rem;
  border-radius: 20px;
  width: 24rem;
  height: 8rem;
  cursor: pointer;
  border: none;
`;

const PlanButton2 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  word-break: break-all;
  white-space: pre-wrap;
  box-shadow: ${theme.shadow.buttonShadow};
  ${theme.font.sebangGothic};
  font-size: 2rem;
  text-align: center;
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
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${theme.shadow.buttonShadow};
  ${theme.font.sebangGothic};
  font-size: 2rem;
  text-align: center;
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
  margin-left: -61.5%;
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
  margin-left: -57%;
  margin-bottom: -2rem;
`;

const MovMiddleText3 = styled.div`
  ${theme.fontSize.sizeExtraSmall};
  font-weight: 400;
  color: ${theme.colors.grayTwo};
  margin-right: 78%;
  margin-bottom: -2rem;
`;

const ApplyButton = styled.button`
  margin-top: 4rem;
  box-shadow: ${theme.shadow.buttonShadow};
  text-align: center;
  ${theme.fontSize.sizeExtraSmall};
  ${theme.font.sebangGothic};
  color: ${theme.fontColor.whiteColor};
  background-color: ${theme.colors.polarSimpleMain};
  border-radius: 20px;
  width: 9rem;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
`;

const ApplyButtonDiv = styled.div`
  position: relative;
`;

const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const DateDiv = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  padding-left: 3rem;
  padding-right: 3rem;
  justify-content: space-between;
  ${theme.fontFrame.bodyMiddle};
`;

const HourDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${theme.fontSize.sizeExtraMedium};
`;

type RequestErrorResponse = {
  message: string;
  path: string;
  statusCode: number;
  timestamp: Date;
};

const ApplyPage = () => {
  const [modalOpen, setModalOpen] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [topic, setTopic] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { mentorId } = useParams();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const [isExist, setIsExist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [errorModalMsg, setErrorModalMsg] = useState<string>('');
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [firstStartTime, setFirstStartTime] = useState<Date>();
  const [firstEndTime, setFirstEndTime] = useState<Date>();
  const [secondStartTime, setSecondStartTime] = useState<Date>();
  const [secondEndTime, setSecondEndTime] = useState<Date>();
  const [thirdStartTime, setThirdStartTime] = useState<Date>();
  const [thirdEndTime, setThirdEndTime] = useState<Date>();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<PostApply>({
    topic: topic,
    content: content,
    requestTime1: [NowDateKr(), NowDateKr()],
    requestTime2: null,
    requestTime3: null,
  });

  const handleResize = debounce(() => {
    if (window.innerWidth < 1070) setIsMobile(true);
    else setIsMobile(false);
  }, 10);

  const postApply = async () => {
    try {
      LoadingStore.on();
      await axiosInstance
        .post(`cadets/mentorings/apply/${mentorId}`, postData, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then(res => {
          if (res.status === 201) {
            setSuccessModal(true);
          } else {
            setErrorModalMsg('요청 에러 발생');
            setErrorModal(true);
          }
        });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorModalMsg(
          `${(err.response?.data as RequestErrorResponse).message}`,
        );
      } else {
        setErrorModalMsg('요청 에러 발생');
      }
      setErrorModal(true);
    } finally {
      LoadingStore.off();
    }
  };

  useEffect(() => {
    console.log('isLoading' + isLoading);
  }, [isLoading]);

  useEffect(() => {
    LoadingStore.on();
    setToken(AuthStore.getAccessToken());
    setRole(AuthStore.getUserRole());
    try {
      axiosWithNoData(AXIOS_METHOD_WITH_NO_DATA.GET, `mentors/${mentorId}`)
        .then(response => {
          if (response.status === 200) {
            setIsExist(true);
          }
          const { isActive }: MentorDetailProps = response.data;
          if (isActive === true) {
            setActive(true);
          }
        })
        .finally(() => {
          LoadingStore.off();
          setIsLoading(false);
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ErrorStore.on(
          (error.response?.data as RequestErrorResponse).message,
          ERROR_DEFAULT_VALUE.TITLE,
        );
      } else {
        ErrorStore.on('요청 에러 발생', ERROR_DEFAULT_VALUE.TITLE);
      }
      navigate('/');
    }

    window.innerWidth <= 1070 ? setIsMobile(true) : setIsMobile(false);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (firstStartTime && firstEndTime) {
      postData.requestTime1 = [firstStartTime, firstEndTime];
    } else if (firstStartTime === undefined && firstEndTime === undefined) {
      if (secondStartTime && secondEndTime) {
        setFirstStartTime(NewDateKr(secondStartTime));
        setFirstEndTime(NewDateKr(secondEndTime));
        setSecondStartTime(undefined);
        setSecondEndTime(undefined);
      } else postData.requestTime1 = [];
    }
  }, [firstStartTime, firstEndTime]);

  useEffect(() => {
    if (secondStartTime && secondEndTime) {
      postData.requestTime2 = [secondStartTime, secondEndTime];
    } else if (secondStartTime === undefined && secondEndTime === undefined) {
      if (thirdStartTime && thirdEndTime) {
        setSecondStartTime(NewDateKr(thirdStartTime));
        setSecondEndTime(NewDateKr(thirdEndTime));
        setThirdStartTime(undefined);
        setThirdEndTime(undefined);
      } else postData.requestTime2 = null;
    }
  }, [secondStartTime, secondEndTime]);

  useEffect(() => {
    if (thirdStartTime && thirdEndTime) {
      postData.requestTime3 = [thirdStartTime, thirdEndTime];
    } else if (thirdStartTime === undefined && thirdEndTime === undefined)
      postData.requestTime3 = null;
  }, [thirdStartTime, thirdEndTime]);

  useEffect(() => {
    postData.content = content;
  }, [content]);

  useEffect(() => {
    postData.topic = topic;
  }, [topic]);

  function setRequestTime(props: { slot: number }) {
    let startTime: (date: Date) => void;
    let endTime: (date: Date) => void;
    let filledSlot = 0;

    if (firstStartTime !== undefined) {
      filledSlot += 1;
    }
    if (secondStartTime !== undefined) {
      filledSlot += 1;
    }
    if (thirdStartTime !== undefined) {
      filledSlot += 1;
    }

    if (props.slot > filledSlot + 1) {
      if (filledSlot === 0) {
        startTime = setFirstStartTime;
        endTime = setFirstEndTime;
      } else {
        startTime = setSecondStartTime;
        endTime = setSecondEndTime;
      }
    } else {
      if (props.slot === 1) {
        startTime = setFirstStartTime;
        endTime = setFirstEndTime;
      } else if (props.slot === 2) {
        startTime = setSecondStartTime;
        endTime = setSecondEndTime;
      } else {
        startTime = setThirdStartTime;
        endTime = setThirdEndTime;
      }
    }
    if (mentorId === undefined) return <></>;
    return (
      <ApplyCalendarModal
        XButtonFunc={() => {
          setModalOpen(0);
        }}
        mentorIntraId={mentorId}
        setStartDateTime={startTime}
        setEndDateTime={endTime}
      ></ApplyCalendarModal>
    );
  }

  const ClickEvent = () => {
    if (!(firstStartTime && firstEndTime)) {
      setErrorModalMsg('첫번째 가능시간은 필수로 입력되어야 합니다.');
    } else if (topic.length <= 0) {
      setErrorModalMsg('주제를 입력해주세요');
    } else if (content.length <= 0) {
      setErrorModalMsg('궁금한 점을 입력해주세요');
    } else {
      postApply();
      return;
    }
    setErrorModal(true);
  };

  if (isLoading) {
    return <></>;
  } else if (mentorId === undefined) {
    ErrorStore.on('잘못된 접근입니다.', ERROR_DEFAULT_VALUE.TITLE);
    return <Navigate to="/" />;
  } else if (isExist === false) {
    ErrorStore.on('존재하지 않는 멘토입니다.', ERROR_DEFAULT_VALUE.TITLE);
    return <Navigate to="/" />;
  } else if (active === false) {
    ErrorStore.on(
      '멘토링이 가능하지 않은 멘토입니다.',
      ERROR_DEFAULT_VALUE.TITLE,
    );
    return <Navigate to="/" />;
  } else if (!token) {
    ErrorStore.on('로그인이 필요한 서비스입니다.', ERROR_DEFAULT_VALUE.TITLE);
    AuthStore.Login();
    return <></>;
  } else if (role !== USER_ROLES.CADET) {
    ErrorStore.on('접근 권한이 없습니다.', ERROR_DEFAULT_VALUE.TITLE);
    return <Navigate to="/" />;
  } else
    return (
      <div>
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
        {successModal && (
          <OneButtonModal
            TitleText="요청 완료"
            Text="요청이 성공적으로 완료되었습니다"
            XButtonFunc={() => {
              setSuccessModal(false);
              navigate('/cadets/mentorings');
            }}
            ButtonText="확인"
            ButtonFunc={() => {
              setSuccessModal(false);
              navigate('/cadets/mentorings');
            }}
          />
        )}
        {!isMobile ? (
          <div>
            <ApplyContainer>
              <Chooseplan>
                <Line1> </Line1>
                <MainText>일정 선택하기</MainText>
                <Line2> </Line2>
                <MiddleText>*최소 1개의 신청 시간을 선택해 주세요</MiddleText>
                <Wrapper>
                  <ApplyButtonDiv>
                    <PlanButton1
                      onClick={() => {
                        setModalOpen(1);
                      }}
                    >
                      {firstStartTime && firstEndTime ? (
                        <ButtonDiv>
                          <DateDiv>
                            {firstStartTime.toLocaleDateString('ko-KR')}
                          </DateDiv>
                          <HourDiv>
                            {firstStartTime
                              .toTimeString()
                              .slice(
                                0,
                                firstStartTime.toTimeString().lastIndexOf(':'),
                              ) +
                              '~' +
                              firstEndTime
                                .toTimeString()
                                .slice(
                                  0,
                                  firstEndTime.toTimeString().lastIndexOf(':'),
                                )}
                          </HourDiv>
                        </ButtonDiv>
                      ) : (
                        '가능시간1'
                      )}
                    </PlanButton1>
                    {firstStartTime && firstEndTime ? (
                      <FontAwesomeIcon
                        icon={faX}
                        size="sm"
                        style={{
                          opacity: 0.3,
                          cursor: 'pointer',
                          color: 'white',
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                        }}
                        onClick={() => {
                          setFirstStartTime(undefined);
                          setFirstEndTime(undefined);
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </ApplyButtonDiv>
                  {modalOpen !== 0 && setRequestTime({ slot: modalOpen })}
                  <ApplyButtonDiv>
                    <PlanButton2
                      onClick={() => {
                        setModalOpen(2);
                      }}
                    >
                      {secondStartTime && secondEndTime ? (
                        <ButtonDiv>
                          <DateDiv>
                            {secondStartTime.toLocaleDateString('ko-KR')}
                          </DateDiv>
                          <HourDiv>
                            {secondStartTime
                              .toTimeString()
                              .slice(
                                0,
                                secondStartTime.toTimeString().lastIndexOf(':'),
                              ) +
                              ' ~ ' +
                              secondEndTime
                                .toTimeString()
                                .slice(
                                  0,
                                  secondEndTime.toTimeString().lastIndexOf(':'),
                                )}
                          </HourDiv>
                        </ButtonDiv>
                      ) : (
                        '가능시간2'
                      )}
                    </PlanButton2>
                    {secondStartTime && secondEndTime ? (
                      <FontAwesomeIcon
                        icon={faX}
                        size="sm"
                        style={{
                          opacity: 0.3,
                          cursor: 'pointer',
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                        }}
                        onClick={() => {
                          setSecondStartTime(undefined);
                          setSecondEndTime(undefined);
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </ApplyButtonDiv>
                  <ApplyButtonDiv>
                    <PlanButton2
                      onClick={() => {
                        setModalOpen(3);
                      }}
                    >
                      {thirdStartTime && thirdEndTime ? (
                        <ButtonDiv>
                          <DateDiv>
                            {thirdStartTime.toLocaleDateString('ko-KR')}
                          </DateDiv>
                          <HourDiv>
                            {thirdStartTime
                              .toTimeString()
                              .slice(
                                0,
                                thirdStartTime.toTimeString().lastIndexOf(':'),
                              ) +
                              ' ~ ' +
                              thirdEndTime
                                .toTimeString()
                                .slice(
                                  0,
                                  thirdEndTime.toTimeString().lastIndexOf(':'),
                                )}
                          </HourDiv>
                        </ButtonDiv>
                      ) : (
                        '가능시간3'
                      )}
                    </PlanButton2>
                    {thirdStartTime && thirdEndTime ? (
                      <FontAwesomeIcon
                        icon={faX}
                        size="sm"
                        style={{
                          opacity: 0.3,
                          cursor: 'pointer',
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                        }}
                        onClick={() => {
                          setThirdStartTime(undefined);
                          setThirdEndTime(undefined);
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </ApplyButtonDiv>
                  <BottomSize></BottomSize>
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
                  setter={setContent}
                  value={content}
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
                  <ApplyButtonDiv>
                    <MovPlanButton1
                      onClick={() => {
                        setModalOpen(1);
                      }}
                    >
                      {firstStartTime && firstEndTime ? (
                        <ButtonDiv>
                          <DateDiv>
                            {firstStartTime.toLocaleDateString('ko-KR')}
                          </DateDiv>
                          <HourDiv>
                            {firstStartTime
                              .toTimeString()
                              .slice(
                                0,
                                firstStartTime.toTimeString().lastIndexOf(':'),
                              ) +
                              '~' +
                              firstEndTime
                                .toTimeString()
                                .slice(
                                  0,
                                  firstEndTime.toTimeString().lastIndexOf(':'),
                                )}
                          </HourDiv>
                        </ButtonDiv>
                      ) : (
                        '가능시간1'
                      )}
                    </MovPlanButton1>
                    {firstStartTime && firstEndTime ? (
                      <FontAwesomeIcon
                        icon={faX}
                        size="sm"
                        style={{
                          opacity: 0.3,
                          cursor: 'pointer',
                          color: 'white',
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                        }}
                        onClick={() => {
                          setFirstStartTime(undefined);
                          setFirstEndTime(undefined);
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </ApplyButtonDiv>
                  {modalOpen !== 0 && setRequestTime({ slot: modalOpen })}
                  <ApplyButtonDiv>
                    <MovPlanButton2
                      onClick={() => {
                        setModalOpen(2);
                      }}
                    >
                      {secondStartTime && secondEndTime ? (
                        <ButtonDiv>
                          <DateDiv>
                            {secondStartTime.toLocaleDateString('ko-KR')}
                          </DateDiv>
                          <HourDiv>
                            {secondStartTime
                              .toTimeString()
                              .slice(
                                0,
                                secondStartTime.toTimeString().lastIndexOf(':'),
                              ) +
                              ' ~ ' +
                              secondEndTime
                                .toTimeString()
                                .slice(
                                  0,
                                  secondEndTime.toTimeString().lastIndexOf(':'),
                                )}
                          </HourDiv>
                        </ButtonDiv>
                      ) : (
                        '가능시간2'
                      )}
                    </MovPlanButton2>
                    {secondStartTime && secondEndTime ? (
                      <FontAwesomeIcon
                        icon={faX}
                        size="sm"
                        style={{
                          opacity: 0.3,
                          cursor: 'pointer',
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                        }}
                        onClick={() => {
                          setSecondStartTime(undefined);
                          setSecondEndTime(undefined);
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </ApplyButtonDiv>
                  <ApplyButtonDiv>
                    <MovPlanButton2
                      onClick={() => {
                        setModalOpen(3);
                      }}
                    >
                      {thirdStartTime && thirdEndTime ? (
                        <ButtonDiv>
                          <DateDiv>
                            {thirdStartTime.toLocaleDateString('ko-KR')}
                          </DateDiv>
                          <HourDiv>
                            {thirdStartTime
                              .toTimeString()
                              .slice(
                                0,
                                thirdStartTime.toTimeString().lastIndexOf(':'),
                              ) +
                              ' ~ ' +
                              thirdEndTime
                                .toTimeString()
                                .slice(
                                  0,
                                  thirdEndTime.toTimeString().lastIndexOf(':'),
                                )}
                          </HourDiv>
                        </ButtonDiv>
                      ) : (
                        '가능시간3'
                      )}
                    </MovPlanButton2>
                    {thirdStartTime && thirdEndTime ? (
                      <FontAwesomeIcon
                        icon={faX}
                        size="sm"
                        style={{
                          opacity: 0.3,
                          cursor: 'pointer',
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                        }}
                        onClick={() => {
                          setThirdStartTime(undefined);
                          setThirdEndTime(undefined);
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </ApplyButtonDiv>
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
                  setter={setContent}
                  value={content}
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
      </div>
    );
};

export default ApplyPage;
