import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faPencil,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/button';
import { InputCounter } from '../../components/input-counter';
import ButtonBoxComponent from '../../components/mentor-detail/button-box';
import SelectKeywords from '../../components/mentor-detail/select-keywords';
import TagInputBoxComponent from '../../components/mentor-detail/tag-input-box';
import { OneButtonModal } from '../../components/modal/one-button-modal/one-button-modal';
import { TwoButtonModal } from '../../components/modal/two-button-modal.tsx/two-button-modal';
import PageNationComponent from '../../components/page-nation';
import { axiosInstance } from '../../context/axios-interface';
import { getCookie, TOKEN_LIST } from '../../context/cookies';
import { appointmentsInterface } from '../../interface/mentor-detail/appointments.interface';
import { CommentProps } from '../../interface/mentor-detail/comment-props.interface';
import { CommentsWithPageProps } from '../../interface/mentor-detail/comments-with-page.interface';
import { mentorAvailableTimeInterface } from '../../interface/mentor-detail/mentor-available-time.interface';
import MentorDetailProps from '../../interface/mentor-detail/mentor-detail.interface';
import AuthStore, { User } from '../../states/auth/AuthStore';
import theme from '../../styles/theme';
import MarkdownRender from './markdownRender';
import { ModalBackground } from '../../components/modal/modal-styled';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '../../states/error/ErrorStore';
import MentorInfoModal, { ModalType } from '../signup/mentor-info-modal';
import MyTableComponents from '../../components/mentor-detail/my-table';

function MentorDetail() {
  const mockMentorAvailableTime =
    '[[],[{"startHour":6,"startMinute":0,"endHour":10,"endMinute":0},{"startHour":10,"startMinute":0,"endHour":11,"endMinute":0}],[],[],[{"startHour":6,"startMinute":30,"endHour":9,"endMinute":0}],[],[{"startHour":6,"startMinute":30,"endHour":9,"endMinute":0}]]';
  const mockMentorAvailableTimeToArray = JSON.parse(mockMentorAvailableTime);

  const [mentorIntroduction, setMentorIntroduction] = useState<string>('');
  const [mentor, setMentor] = useState<MentorDetailProps | null>(null);

  const [isActiveMentorDetail, setIsActiveMentorDetail] =
    useState<boolean>(false);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [appointments, setAppointments] = useState<appointmentsInterface[]>([]);
  const [isActivateIntroductionEdit, setIsActivateIntroductionEdit] =
    useState<boolean>(false);
  const [isActivateMentor, setIsActivateMentor] = useState<boolean>(false);
  const [inputComment, setInputComment] = useState<string>('');
  const [mentorTags, setMentorTags] = useState<string[]>([]);
  const [isActivateMentorMarkdownEdit, setIsActivateMentorMarkdownEdit] =
    useState<boolean>(false);
  const [mentorMarkdown, setMentorMarkdown] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [take, setTake] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [isActivateDeleteModal, setIsActivateDeleteModal] =
    useState<boolean>(false);
  const [isActivateCommentSubmit, setIsActivateCommentSubmit] =
    useState<boolean>(false);
  const [isActivateApplyModal, setIsActivateApplyModal] =
    useState<boolean>(false);
  const [userCommentId, setUserCommentId] = useState<string>('');
  const [isActivateCommentDeleteModal, setIsActivateCommentDeleteModal] =
    useState<boolean>(false);
  const [isActivateMentorTimeEditModal, setIsActivateMentorTimeEditModal] =
    useState<boolean>(false);
  const [
    isActivateMentorMarkDownEditModal,
    setIsActivateMentorMarkDownEditModal,
  ] = useState<boolean>(false);
  const [isActivateMentorTimeModal, setIsActivateMentorTimeModal] =
    useState<boolean>(false);

  const setMentorAvailableTimeData = async (metorAvailableTimeData: string) => {
    const mentorAvailableTimeDataToArray = JSON.parse(metorAvailableTimeData);
    const appointmentsData: appointmentsInterface[] = [];
    const today = new Date();
    const todayDay = today.getDay();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    mentorAvailableTimeDataToArray?.forEach(
      (data: mentorAvailableTimeInterface[], index: number) => {
        if (data.length !== 0) {
          data.forEach(data2 => {
            const start = new Date(
              todayYear,
              todayMonth,
              todayDay,
              data2.startHour,
              data2.startMinute,
            );
            const end = new Date(
              todayYear,
              todayMonth,
              todayDay,
              data2.endHour,
              data2.endMinute,
            );

            appointmentsData.push({ start, end });
          });
        }
      },
    );
    console.log(appointmentsData);
    setAppointments(appointmentsData);
  };

  const getParams = useParams();
  useEffect(() => {
    const params = {
      page: page,
      take: take,
    };
    axiosInstance
      .get(`/mentors/${getParams.intraId}`)
      .then(result => {
        setMentor(result.data);
        setMentorTags(result.data.tags);
        setMentorIntroduction(
          result.data?.introduction
            ? result.data.introduction
            : result.data?.introduction,
        );
        setMentorMarkdown(
          result.data?.markdownContent
            ? result.data.markdownContent
            : result.data?.markdownContent,
        );
        setMentorAvailableTimeData(mockMentorAvailableTime);
      })
      .catch(err => {
        // ErrorStore.on(err, ERROR_DEFAULT_VALUE.TITLE);
        console.log(err);
      });
    axiosInstance
      .get(`/comments/${getParams.intraId}`, { params })
      .then(result => {
        setComments(result.data.comments);
        setMaxPage(Math.ceil(result.data.total / take));
      })
      .catch(err => {
        ErrorStore.on(err, ERROR_DEFAULT_VALUE.TITLE);
      });

    const user: User = {
      intraId: AuthStore.getUserIntraId(),
      role: AuthStore.getUserRole(),
    };
    setUser(user);
  }, []);

  const handleSubmitIntroductionTags = () => {
    const accessToken = getCookie(TOKEN_LIST.ACCESS_TOKEN);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const data = { introduction: mentorIntroduction, tags: mentorTags };
    axiosInstance.patch(`/mentors/${getParams.intraId}`, data, config);
  };

  const AddHashtag = mentorTags?.map(tag => {
    return <div>{tag.padStart(tag.length + 1, '#')}</div>;
  });

  const handleCommentSubmit = () => {
    if (inputComment !== '') {
      const params = {
        page: 1,
        take: page * take,
      };
      const accessToken = getCookie(TOKEN_LIST.ACCESS_TOKEN);
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const data = { content: inputComment };
      axiosInstance
        .post(`/comments/${getParams.intraId}`, data, config)
        .then(() => {
          axiosInstance
            .get(`/comments/${getParams.intraId}`, { params })
            .then(result => {
              setComments(result.data.comments);
              setMaxPage(Math.ceil(result.data.total / take));
            })
            .catch(err => {
              // ErrorStore.on(err, ERROR_DEFAULT_VALUE.TITLE);
            });
          setInputComment('');
        });
    }
  };

  const handleSubmitMentorMarkdown = () => {
    const accessToken = getCookie(TOKEN_LIST.ACCESS_TOKEN);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const data = { markdownContent: mentorMarkdown };
    axiosInstance
      .patch(`/mentors/${getParams.intraId}`, data, config)
      .then(() => {
        axiosInstance.get(`/mentors/${getParams.intraId}`).then(result => {
          setMentor(result.data);
          setMentorTags(result.data.tags);
          setMentorIntroduction(
            result.data?.introduction
              ? result.data.introduction
              : result.data?.introduction,
          );
          setMentorMarkdown(
            result.data?.markdownContent
              ? result.data.markdownContent
              : result.data?.markdownContent,
          );
        });
      })
      .catch(err => {
        ErrorStore.on(err, ERROR_DEFAULT_VALUE.TITLE);
      });
  };

  const deleteComment = (commentId: any) => {
    const params = {
      page: 1,
      take: take * page,
    };
    const accessToken = getCookie(TOKEN_LIST.ACCESS_TOKEN);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    axiosInstance.delete(`/comments/${commentId}`, config).then(() => {
      axiosInstance
        .get(`/comments/${getParams.intraId}`, { params })
        .then(result => {
          setComments(result.data.comments);
          setMaxPage(Math.ceil(result.data.total / take));
        });
    });
  };

  return (
    <MentorDetailTag>
      <MentorHeader>
        <MentorInfo>
          <MentorImage src={mentor?.profileImage} />
          <MentorInfoContent>
            <MentorName>
              <div className="mentor-name">{mentor?.name} 멘토</div>
              <div className="mentor-intra">{mentor?.intraId}</div>
              {user?.intraId === mentor?.intraId && user && mentor ? (
                <FontAwesomeIcon
                  icon={faPencil}
                  className="icon"
                  size="lg"
                  onClick={() => {
                    setIsActivateMentorTimeEditModal(
                      !isActivateMentorTimeEditModal,
                    );
                  }}
                />
              ) : null}
            </MentorName>
            <MentorActivateContainer>
              <Button
                fontFrame={theme.fontFrame.subTitleSmall}
                borderWidth="1px"
                text={`멘토링 ${isActivateMentor ? '가능' : '불가능'}`}
                backgroundColor={theme.colors.polarBackground}
                color={theme.colors.polarSimpleMain}
                width="12rem"
                height="2.5rem"
                borderRadius="20px"
                isUnActivated={true}
              />

              {isActivateMentorTimeEditModal && (
                <MentorInfoModal
                  intraId={getParams.intraId || ''}
                  modalType={ModalType.MENTOR_INFO}
                  setter={setIsActivateMentorTimeEditModal}
                  value={isActivateMentorTimeEditModal}
                />
              )}
            </MentorActivateContainer>
          </MentorInfoContent>
        </MentorInfo>
        {mentor?.isActive && user?.role == 'cadet' ? (
          <Link to={`/apply-page/${mentor?.intraId}`}>
            <Button
              text="멘토링 신청하기"
              width="21rem"
              height="6rem"
              backgroundColor={theme.colors.polarSimpleMain}
              color={theme.colors.backgoundWhite}
            />
          </Link>
        ) : (
          <Button
            text="멘토링 신청하기"
            width="21rem"
            height="6rem"
            backgroundColor={theme.colors.grayThree}
            color={theme.colors.backgoundWhite}
            isUnActivated={true}
            onClick={() => {
              setIsActivateApplyModal(true);
            }}
          />
        )}
        {isActivateApplyModal && (
          <OneButtonModal
            Text="멘토링 신청이 불가능합니다."
            TitleText="멘토링 신청"
            XButtonFunc={() => {
              setIsActivateApplyModal(false);
            }}
            ButtonFunc={() => {
              setIsActivateApplyModal(false);
            }}
            ButtonText="확인"
          />
        )}
      </MentorHeader>
      <MentorBody>
        <MentorBody1>
          <MentorBody1Left>
            <MenuBox>멘토링 이용 방법</MenuBox>
            <MentorHowToContent>
              <HowToContent>
                <div>카뎃</div>
                <ol type="1">
                  <li>멘토의 멘토링 상태 확인하고 멘토링 신청 버튼 클릭</li>
                  <li>만남 일정과 정보를 작성하고 제출</li>
                  <li>마이페이지에서 만남 상태 확인 가능</li>
                  <li>멘토링이 확정, 취소되면 카뎃에게 알림 메일 발송</li>
                  <li>장소협의 후 만남 일정 시간에 멘토링 진행</li>
                </ol>
              </HowToContent>
              <HowToContent>
                <div>멘토</div>
                <ol>
                  <li>카뎃의 멘토링 신청 시 알림 메일 발송</li>
                  <li>마이페이지에서 만남 상태 결정 가능</li>
                  <li>멘토링이 확정, 취소되면 카뎃에게 알림 메일 발송</li>
                  <li>장소협의 후 만남 일정 시간에 멘토링 진행</li>
                  <li>멘토링 진행 후 보고서 작성 가능</li>
                </ol>
              </HowToContent>
              <footer>
                * 48시간 이내에 만남 상태 확정 또는 취소 되지 않으면 자동취소
              </footer>
            </MentorHowToContent>
          </MentorBody1Left>
          <MentorBody1Right>
            <MentorBody1Right1>
              <MenuBox>
                멘토 소개
                {user?.intraId === mentor?.intraId && user && mentor ? (
                  <FontAwesomeIcon
                    icon={faPencil}
                    className="icon"
                    size="xs"
                    onClick={() => {
                      setIsActivateIntroductionEdit(
                        !isActivateIntroductionEdit,
                      );
                    }}
                  />
                ) : null}
              </MenuBox>
              {isActivateIntroductionEdit ? (
                <>
                  <InputCounter
                    value={mentorIntroduction}
                    setter={setMentorIntroduction}
                    countDisabled={false}
                    inputDisabled={false}
                    maxLength={150}
                    width={'100%'}
                    fontSize={theme.fontFrame.bodyMiddle}
                  />
                  <ButtonBoxComponent
                    items={mentorTags}
                    setter={setMentorTags}
                  />
                  <TagInputBoxComponent
                    setter={setMentorTags}
                    value={mentorTags}
                  />
                </>
              ) : (
                <>
                  <MentorIntroduction>{mentorIntroduction}</MentorIntroduction>
                  <MentorTags>{AddHashtag}</MentorTags>
                </>
              )}
              <SelectKeywords isActivatedEdit={isActivateIntroductionEdit} />
              <ButtonBox>
                {isActivateDeleteModal && (
                  <TwoButtonModal
                    Text="수정하시겠습니까?"
                    TitleText="수정"
                    XButtonFunc={() => {
                      setIsActivateDeleteModal(false);
                    }}
                    Button1Func={() => {
                      try {
                        setIsActivateDeleteModal(false);
                        setIsActivateIntroductionEdit(false);
                      } catch (e) {
                        // ErrorStore
                      }
                      handleSubmitIntroductionTags();
                    }}
                    Button2Func={() => {
                      setIsActivateDeleteModal(false);
                      setIsActivateIntroductionEdit(false);
                    }}
                    Button1Text="네"
                    Button2Text="아니요"
                  />
                )}
                {isActivateIntroductionEdit && (
                  <Button
                    text="수정완료"
                    borderRadius="20px"
                    onClick={() => {
                      setIsActivateDeleteModal(true);
                    }}
                  />
                )}
              </ButtonBox>
            </MentorBody1Right1>
            <MentorBody1Right2>
              <MenuBox1>
                <div>주제</div>
                <div>상태</div>
                <div>일시</div>
              </MenuBox1>
              <PageNationComponent />
            </MentorBody1Right2>
          </MentorBody1Right>
        </MentorBody1>
        <MentorBody2>
          <MenuBox3>
            <div>
              가능 시간
              {user?.intraId === mentor?.intraId && user && mentor ? (
                <FontAwesomeIcon
                  icon={faPencil}
                  size={'xs'}
                  className="icon"
                  onClick={() => setIsActivateMentorTimeModal(true)}
                />
              ) : null}
              {isActivateMentorTimeModal && (
                <MentorInfoModal
                  intraId={getParams.intraId || ''}
                  modalType={ModalType.AVAILABLE_TIME}
                  setter={setIsActivateMentorTimeModal}
                  value={isActivateMentorTimeModal}
                />
              )}
            </div>
            {mentor?.createdAt ? (
              <div style={{ color: `${theme.colors.fontGray}` }}>
                update: {mentor?.updatedAt?.substring(0, 10)}
              </div>
            ) : (
              <div style={{ color: `${theme.colors.fontGray}` }}>
                create: {mentor?.createdAt?.substring(0, 10)}
              </div>
            )}
          </MenuBox3>
          <MyTableComponents appointments={appointments} />
        </MentorBody2>
        <MentorBody3>
          <MentorBody3Toggle
            onClick={() => {
              setIsActiveMentorDetail(data => !data);
            }}
          >
            {isActiveMentorDetail ? (
              <FontAwesomeIcon icon={faAngleDown} size={'2x'} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} size={'2x'} rotation={270} />
            )}
            <div>멘토 상세 소개 보기</div>
          </MentorBody3Toggle>
          {isActiveMentorDetail ? (
            <>
              <MenuBox>
                멘토 정보
                {user?.intraId === mentor?.intraId && user && mentor ? (
                  <FontAwesomeIcon
                    icon={faPencil}
                    className="icon"
                    size="xs"
                    onClick={() => {
                      setIsActivateMentorMarkdownEdit(
                        !isActivateMentorMarkdownEdit,
                      );
                    }}
                  />
                ) : null}
              </MenuBox>

              {isActivateMentorMarkdownEdit ? (
                <>
                  <InputCounter
                    value={mentorMarkdown}
                    setter={setMentorMarkdown}
                    countDisabled={false}
                    inputDisabled={false}
                    maxLength={10000}
                    width={'100%'}
                    height={'50rem'}
                    fontSize={theme.fontFrame.bodyMiddle}
                  />
                  <SubmitButton>
                    <Button
                      text="편집완료"
                      width="12rem"
                      height="3.5rem"
                      backgroundColor={theme.colors.polarSimpleMain}
                      borderRadius="20px"
                      onClick={() => {
                        setIsActivateMentorMarkDownEditModal(true);
                      }}
                    />
                    {isActivateMentorMarkDownEditModal && (
                      <TwoButtonModal
                        Text="수정하시겠습니까?"
                        TitleText="수정"
                        XButtonFunc={() => {
                          setIsActivateMentorMarkDownEditModal(false);
                        }}
                        Button1Func={() => {
                          try {
                            handleSubmitMentorMarkdown();
                          } catch (err) {
                            // ErrorStore.on(err, ERROR_DEFAULT_VALUE.TITLE);
                          }
                          setIsActivateMentorMarkDownEditModal(false);
                          setIsActivateMentorMarkdownEdit(false);
                        }}
                        Button2Func={() => {
                          setIsActivateMentorMarkDownEditModal(false);
                          setIsActivateMentorMarkdownEdit(false);
                        }}
                        Button1Text="네"
                        Button2Text="아니요"
                      />
                    )}
                  </SubmitButton>
                </>
              ) : (
                <MarkdownRender markDown={mentorMarkdown} />
              )}
            </>
          ) : null}
        </MentorBody3>
        <MentorCommets>
          <MenuBox>댓글</MenuBox>
          {user?.intraId ? (
            <ReplyContainer>
              <Comment>
                <InputUserContent>{user.intraId}</InputUserContent>
                <InputCounter
                  value={inputComment}
                  setter={setInputComment}
                  countDisabled={true}
                  inputDisabled={false}
                  maxLength={300}
                  width={'100%'}
                  height={'6rem'}
                />
                <SubmitButton>
                  <Button
                    text="제출하기"
                    width="12rem"
                    height="3.5rem"
                    backgroundColor={
                      inputComment.length
                        ? theme.colors.polarSimpleMain
                        : theme.colors.grayThree
                    }
                    borderRadius="20px"
                    onClick={() => {
                      {
                        user.role === 'cadet'
                          ? handleCommentSubmit()
                          : setIsActivateCommentSubmit(true);
                      }
                    }}
                    isUnActivated={inputComment.length === 0}
                  />
                  {isActivateCommentSubmit && (
                    <OneButtonModal
                      TitleText="댓글 작성"
                      Text="댓글은 cadet만 작성할 수 있습니다."
                      XButtonFunc={() => {
                        setIsActivateCommentSubmit(false);
                      }}
                      ButtonFunc={() => {
                        setIsActivateCommentSubmit(false);
                      }}
                      ButtonText="확인"
                    />
                  )}
                </SubmitButton>
              </Comment>
            </ReplyContainer>
          ) : null}
          <MentorCommetsContent>
            {isActivateCommentDeleteModal && (
              <TwoButtonModal
                TitleText="댓글 삭제"
                Text="정말로 댓글을 삭제하시겠습니까?"
                XButtonFunc={() => {
                  setIsActivateCommentDeleteModal(false);
                }}
                Button1Func={() => {
                  setIsActivateCommentDeleteModal(false);
                  deleteComment(userCommentId);
                }}
                Button1Text="확인"
                Button2Func={() => {
                  setIsActivateCommentDeleteModal(false);
                }}
                Button2Text="취소"
              />
            )}
            {comments?.map((comment: CommentProps) => {
              return (
                <Comment>
                  <img src={comment?.cadets?.profileImage} />
                  <UserContent>
                    <div>
                      <div className="cadetName">
                        {comment?.cadets?.intraId}
                      </div>
                      {mentor?.updatedAt ? (
                        <div className="updatedAt">{`${mentor?.updatedAt.substring(
                          0,
                          4,
                        )}.${mentor?.updatedAt.substring(
                          5,
                          7,
                        )}.${mentor?.updatedAt.substring(8, 10)}`}</div>
                      ) : null}
                      {user?.intraId === comment?.cadets?.intraId && user ? (
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="icon"
                          color={'red'}
                          onClick={() => {
                            setUserCommentId(comment.id);
                            setIsActivateCommentDeleteModal(true);
                          }}
                        />
                      ) : null}
                    </div>
                    <div>{comment?.content}</div>
                  </UserContent>
                </Comment>
              );
            })}
            {maxPage <= page ? null : (
              <CommentPageNation
                onClick={() => {
                  const params = {
                    page: page + 1,
                    take: take,
                  };
                  axiosInstance
                    .get(`/comments/${getParams.intraId}`, { params })
                    .then(response => {
                      if (response.data.comments !== 0) {
                        setComments([...comments, ...response.data.comments]);
                      }
                      setMaxPage(Math.ceil(response.data.total / take));
                      if (response.data.total > page * take) {
                        setPage(page + 1);
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }}
              >
                댓글 더보기
              </CommentPageNation>
            )}
          </MentorCommetsContent>
        </MentorCommets>
      </MentorBody>
    </MentorDetailTag>
  );
}

const MentorActivateContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  .icon {
    margin-left: 1rem;
    cursor: pointer;
  }
`;

const InputUserContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${theme.fontFrame.titleSmall}
  margin-right: 1rem;
`;

const ReplyContainer = styled.div`
  border-bottom: 1px solid ${theme.colors.polarSimpleMain};
`;

const CommentPageNation = styled.div`
  cursor: pointer;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;

const MenuBox3 = styled.div`
  border-top: 2px solid ${props => props.theme.colors.blackThree};
  border-bottom: 1px solid ${props => props.theme.colors.grayFive};
  width: 100%;
  box-sizing: border-box;
  padding-left: 1rem;
  padding-top: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  ${theme.fontFrame.titleSmall};
  font-weight: 900;
  letter-spacing: 0.1rem;
  margin-bottom: 1.3rem;
  div:last-child {
    margin-bottom: 0.5rem;
    padding-left: 0.3rem;
    font-size: 1rem;
  }
  .icon {
    margin-left: 0.5rem;
    cursor: pointer;
  }
  padding-bottom: 0.5rem;
`;

const HowToContent = styled.div`
  margin: 0 1.5rem;
  color: ${theme.colors.grayOne};
`;
const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 1.5rem;
  .inputCommentName {
    font-weight: 900;
    margin-right: 1rem;
  }
  div:first-child {
    display: flex;
    text-align: end;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.2rem;
    .updatedAt {
      font-size: 1rem;
      padding-left: 0.7rem;
      color: ${props => props.theme.colors.grayThree};
      font-weight: normal;
      margin-top: 0.1rem;
    }
    .icon {
      margin-left: 1rem;
      cursor: pointer;
    }
  }
  div:last-child {
    ${props => props.theme.fontFrame.subTitleMiddle};
    font-weight: normal;
  }
`;

const Comment = styled.div`
  display: flex;
  margin: 2rem;
  position: relative;
  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }
`;

const TimTableScroll = styled.div`
  overflow-y: scroll;
  height: 70rem;
`;

const MentorCommetsContent = styled.div``;

const SubmitButton = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const MentorCommets = styled.div`
  margin-top: 5%;
`;

const MentorBody3Toggle = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 1rem;
  cursor: pointer;
  div {
    ${theme.fontFrame.subTitleMiddle};
    margin-left: 1rem;
  }
  margin-bottom: 5%;
`;

const MentorBody3 = styled.div`
  margin-top: 10%;
`;

const MentorBody2 = styled.div`
  margin-top: 10%;
`;

const MenuBox1 = styled.div`
  border-top: 2px solid ${props => props.theme.colors.blackThree};
  border-bottom: 1px solid ${props => props.theme.colors.grayFive};
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  font-weight: 700;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MentorBody1Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  grid-area: right;
`;
const MentorBody1Right2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const MentorTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${theme.colors.polarSimpleMain};
  ${theme.fontFrame.bodyMiddle};
  div {
    margin-right: 0.5rem;
  }
`;

const MentorIntroduction = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  word-break: break-all;
  margin: 1.3rem;
  ${theme.fontFrame.bodyMiddle};
  color: ${theme.colors.blackThree};
  font-weight: 900;
  word-spacing: 0.1rem;
`;

const MentorBody1Right1 = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10%;
`;

const MentorBody1 = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-template-areas:
    'left left left right right'
    'left left left right right'
    'left left left right right'
    'left left left right right'
    'left left left right right';
  grid-column-gap: 3rem;
  ${theme.fontSize.sizeSmall};
`;

const MentorHowToContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  ${theme.fontFrame.bodySmall}

  ol {
    margin-top: 0.5rem;
    padding-left: 3rem;
    margin-bottom: 2rem;
  }
  li {
    margin-bottom: 0.5rem;
    color: ${theme.colors.grayTwo};
    letter-spacing: 0.1rem;
    padding-top: 0.5rem;
    margin-left: 1rem;
  }
  footer {
    color: ${theme.colors.fontGray};
    font-size: 1rem;
    position: absolute;
    top: 100%;
    left: 5%;
  }
`;

const MentorBody1Left = styled.div`
  grid-area: left;
`;

const MentorHeader = styled.div`
  display: flex;
  width: 100%;
  height: 27rem;
  background-color: ${props => props.theme.colors.polarBackground};
  justify-content: space-around;
  align-items: center;
`;

const MentorImage = styled.img`
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
`;

const MentorInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const MentorInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.6rem;
  word-break: break-word;
  align-items: center;
`;
const MentorName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  .mentor-name {
    ${theme.fontFrame.titleLarge};
    ${theme.font.sebangGothic};
    font-weight: 900;
  }
  .mentor-intra {
    margin-left: 1rem;
    ${theme.fontFrame.titleSmall};
  }
  .icon {
    margin-left: 0.5rem;
    cursor: pointer;
  }
  margin-bottom: 0.5rem;
`;

const MentorBody = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
`;

const MenuBox = styled.div`
  border-top: 2px solid ${props => props.theme.colors.blackThree};
  border-bottom: 1px solid ${props => props.theme.colors.grayFive};
  width: 100%;
  box-sizing: border-box;
  padding-left: 1rem;
  padding-top: 1.3rem;
  display: flex;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
  ${theme.fontFrame.titleSmall};
  font-weight: 900;
  letter-spacing: 0.1rem;
  margin-bottom: 1.3rem;
  padding-bottom: 0.5rem;
`;
const MentorDetailTag = styled.div`
  ${theme.font.nanumGothic};
  background-color: ${theme.colors.backgoundWhite};
  .icon {
    margin-left: 0.5rem;
    cursor: pointer;
  }
`;

export default MentorDetail;
// TODO: alert 바꾸기
// TODO: error alert
// TODO: 존재하지 않은 mentor있을때 redirect
// TODO: loading 처리
// TODO: change grid to flex
