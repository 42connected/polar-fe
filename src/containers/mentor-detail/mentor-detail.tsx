import {
  faAngleDown,
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
import TimeTableMuiComponent from '../../components/mentor-detail/mui-table';
import TagInputBoxComponent from '../../components/mentor-detail/tag-input-box';
import ReportSummaryInputComponent from '../../components/report-summery-input';
import { axiosInstance } from '../../context/axios-interface';
import { getCookie, TOKEN_LIST } from '../../context/cookies';
import { appointmentsInterface } from '../../interface/mentor-detail/appointments.interface';
import { CommentProps } from '../../interface/mentor-detail/comment-props.interface';
import { CommentsWithPageProps } from '../../interface/mentor-detail/comments-with-page.interface';
import { mentorAvailableTimeInterface } from '../../interface/mentor-detail/mentor-available-time.interface';
import MentorDetailProps from '../../interface/mentor-detail/mentor-detail.interface';
import { MentoringLogProps } from '../../interface/mentor-detail/mentoringLogProps';
import AuthStore, { User } from '../../states/auth/AuthStore';
import theme from '../../styles/theme';
import MarkdownRender from './markdownRender';

function MentorDetail() {
  const mockMentoringLog: MentoringLogProps[] = [
    {
      topic: 'nestjs 프로젝트',
      state: '확정',
      meetingAt: new Date(),
    },
    {
      topic: 'nestjs',
      state: '완료',
      meetingAt: new Date(),
    },
    {
      topic: '백앤드 진로상담',
      state: '확정',
      meetingAt: new Date(),
    },
  ];

  const mockMentorAvailableTime =
    '[[],[{"startHour":6,"startMinute":0,"endHour":10,"endMinute":0},{"startHour":10,"startMinute":0,"endHour":11,"endMinute":0}],[],[],[{"startHour":6,"startMinute":30,"endHour":9,"endMinute":0}],[],[{"startHour":6,"startMinute":30,"endHour":9,"endMinute":0}]]';
  const mockMentorAvailableTimeToArray = JSON.parse(mockMentorAvailableTime);

  const appointmentsTest = [
    {
      startDate: new Date(2018, 5, 25, 9, 30),
      endDate: new Date(2018, 5, 25, 11, 30),
    },
    {
      startDate: new Date(2018, 5, 25, 12, 0),
      endDate: new Date(2018, 5, 25, 13, 0),
    },
  ];

  const [mentorIntroduction, setMentorIntroduction] = useState<string>('');
  const [mentor, setMentor] = useState<MentorDetailProps | null>(null);
  const [mentoringLog, setMentoringLog] =
    useState<MentoringLogProps[]>(mockMentoringLog);
  const [isActiveMentorDetail, setIsActiveMentorDetail] =
    useState<boolean>(false);
  const [comments, setComments] = useState<CommentsWithPageProps | null>(null);
  const [appointments, setAppointments] =
    useState<appointmentsInterface[]>(appointmentsTest);
  const [isActivateIntroductionEdit, setIsActivateIntroductionEdit] =
    useState<boolean>(false);
  const [isActivateMentor, setIsActivateMentor] = useState<boolean>(false);
  const [inputComment, setInputComment] = useState<string>('');
  const [mentorTags, setMentorTags] = useState<string[]>([]);
  const [isActivateMentorInfoEdit, setIsActivateMentorInfoEdit] =
    useState<boolean>(false);
  const [mentorInfo, setMentorInfo] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  //2018, 5, 25 화요일
  //const date2 = new Date('1995-12-17T03:24:00');
  // Sun Dec 17 1995 03:24:00 GMT...
  //2018-06-28
  // console.log(mockMentorAvailableTimeToArray);

  const setMentorAvailableTimeData = () => {
    const appointmentsData: appointmentsInterface[] = [];
    mockMentorAvailableTimeToArray.forEach(
      (data: mentorAvailableTimeInterface[], index: number) => {
        if (data.length !== 0) {
          data.forEach(data2 => {
            let day = 25 + index;
            if (index === 6) {
              day = 24;
            }
            const startDate = new Date(
              2018,
              5,
              day,
              data2.startHour,
              data2.startMinute,
            );
            const endDate = new Date(
              2018,
              5,
              day,
              data2.endHour,
              data2.endMinute,
            );
            appointmentsData.push({ startDate, endDate });
          });
        }
      },
    );
    return appointmentsData;
  };

  const getParams = useParams();
  useEffect(() => {
    const params = {
      page: 1,
      take: 5,
    };
    axiosInstance.get(`/mentors/${getParams.intraId}`).then(result => {
      console.log('mentor', result.data);
      result.data.tags = ['aaaa', 'bbbb', 'cccccccccc'];
      setMentor(result.data);
      setMentorTags(result.data.tags);
      setMentorIntroduction(
        result.data?.introduction ? result.data.introduction : '',
      );
      setMentorInfo(result.data?.info ? result.data.info : '');
    });
    axiosInstance
      .get(`/comments/${getParams.intraId}`, { params })
      .then(result => {
        console.log('comments', result.data);
        setComments(result.data);
      });

    const appointmentsData = setMentorAvailableTimeData();
    setAppointments(appointmentsData);
    const user: User = {
      intraId: AuthStore.getUserIntraId(),
      role: AuthStore.getUserRole(),
    };
    setUser(user);
  }, []);

  useEffect(() => {
    const accessToken = getCookie(TOKEN_LIST.ACCESS_TOKEN);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const data = { introduction: mentorIntroduction };
    axiosInstance.patch(`/mentors/${getParams.intraId}`, data, config);
  }, [isActivateIntroductionEdit]);
  useEffect(() => {
    const accessToken = getCookie(TOKEN_LIST.ACCESS_TOKEN);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const data = { introduction: mentorIntroduction };
    axiosInstance.patch(`/mentors/${getParams.intraId}`, data, config);
  }, [mentorTags]);

  useEffect(() => {
    const accessToken = getCookie(TOKEN_LIST.ACCESS_TOKEN);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const data = { isActive: isActivateMentor };
    axiosInstance.patch(`/mentors/${getParams.intraId}`, data, config);
  }, [isActivateMentor]);

  useEffect(() => {
    const accessToken = getCookie(TOKEN_LIST.ACCESS_TOKEN);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const data = { markdownContent: mentorInfo };
    axiosInstance.patch(`/mentors/${getParams.intraId}`, data, config);
  }, [isActivateMentorInfoEdit]);

  const AddHashtag = mentorTags.map(tag => {
    return <div>{tag.padStart(tag.length + 1, '#')}</div>;
  });

  const handleCommentSubmit = () => {
    if (inputComment !== '') {
      const accessToken = getCookie(TOKEN_LIST.ACCESS_TOKEN);
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const data = { content: inputComment };
      axiosInstance.post(`/comments/${getParams.intraId}`, data, config);
      setInputComment('');
      axiosInstance.get(`/comments/${getParams.intraId}`).then(result => {
        setComments(result.data.comments);
      });
    }
  };

  const mentoringLogList = mentoringLog.map(log => {
    const makeDate = `${log.meetingAt
      .getFullYear()
      .toString()
      .slice(-2)}/${log.meetingAt.getMonth()}/${log.meetingAt.getDay()}`;
    return (
      <MenuBox2>
        <div>{log.topic}</div>
        <div>{log.state}</div>
        <div>{makeDate}</div>
      </MenuBox2>
    );
  });

  const deleteComment = (commentId: any) => {
    const accessToken = getCookie(TOKEN_LIST.ACCESS_TOKEN);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    axiosInstance.delete(`/comments/${commentId}`, config);
    axiosInstance.get(`/comments/${getParams.intraId}`).then(result => {
      setComments(result.data.comments);
    });
  };

  // const MakeCommentsTags = ({ comments }: any) => {
  //   comments.map((comment: CommentProps) => {
  //     return (
  //       <Comment>
  //         <img src={comment?.cadets?.profileImage} />
  //         <div>
  //           <div>
  //             <div>{comment?.cadets?.intraId}</div>
  //             <div>{comment?.createdAt}</div>
  //           </div>
  //           <div>{comment?.content}</div>
  //         </div>
  //       </Comment>
  //     );
  //   });
  // };

  return (
    <MentorDetailTag>
      <MentorHeader>
        <MentorInfo>
          <MentorImage src={mentor?.profileImage} />
          <MentorInfoContent>
            <MentorName>
              <div className="mentor-name">{mentor?.name} 멘토</div>
              <div className="mentor-intra">{mentor?.intraId}</div>
            </MentorName>
            <Button
              fontFrame={theme.fontFrame.subTitleSmall}
              borderWidth="1px"
              text={`멘토링 ${isActivateMentor ? '가능' : '불가능'}`}
              backgroundColor={theme.colors.polarBackground}
              color={theme.colors.polarSimpleMain}
              width="12rem"
              height="2.5rem"
              borderRadius="20px"
              onClick={() => setIsActivateMentor(!isActivateMentor)}
            />
          </MentorInfoContent>
        </MentorInfo>
        {mentor?.isActive ? (
          <Link to={`/apply-page/${mentor?.intraId}`}>
            <Button
              text="멘토링 신청하기"
              width="21rem"
              height="6rem"
              background-color={theme.colors.polarSimpleMain}
              color={theme.colors.backgoundWhite}
            />
          </Link>
        ) : (
          <Button
            text="멘토링 신청하기"
            width="21rem"
            height="6rem"
            background-color={theme.colors.polarSimpleMain}
            color={theme.colors.backgoundWhite}
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
                    disabled={false}
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
                  <ButtonBox>
                    <Button
                      text="편집완료"
                      borderRadius="20px"
                      onClick={() => {
                        setIsActivateIntroductionEdit(
                          !isActivateIntroductionEdit,
                        );
                      }}
                    />
                  </ButtonBox>
                </>
              ) : (
                <>
                  <MentorIntroduction>{mentorIntroduction}</MentorIntroduction>
                  <MentorTags>{AddHashtag}</MentorTags>
                </>
              )}
            </MentorBody1Right1>
            <MentorBody1Right2>
              <MenuBox1>
                <div>주제</div>
                <div>상태</div>
                <div>일시</div>
              </MenuBox1>
              {mentoringLogList}
            </MentorBody1Right2>
          </MentorBody1Right>
        </MentorBody1>
        <MentorBody2>
          <MenuBox3>
            <div>
              가능 시간
              {user?.intraId === mentor?.intraId && user && mentor ? (
                <FontAwesomeIcon icon={faPencil} size={'xs'} className="icon" />
              ) : (
                <FontAwesomeIcon icon={faPencil} size={'xs'} className="icon" />
              )}
            </div>
            {mentor?.createdAt ? (
              <div>update: {mentor?.updatedAt?.substring(0, 10)}</div>
            ) : (
              <div>create: {mentor?.createdAt?.substring(0, 10)}</div>
            )}
          </MenuBox3>
          <TimTableScroll>
            <TimeTableMuiComponent
              appointments={appointments}
            ></TimeTableMuiComponent>
          </TimTableScroll>
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
                      setIsActivateMentorInfoEdit(!isActivateMentorInfoEdit);
                    }}
                  />
                ) : null}
              </MenuBox>

              {isActivateMentorInfoEdit ? (
                <>
                  <InputCounter
                    value={mentorInfo}
                    setter={setMentorInfo}
                    disabled={false}
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
                        setIsActivateMentorInfoEdit(!isActivateMentorInfoEdit);
                      }}
                    />
                  </SubmitButton>
                </>
              ) : (
                <MarkdownRender markdown={mentorInfo} />
              )}
            </>
          ) : null}
        </MentorBody3>
        <MentorCommets>
          <MenuBox>댓글</MenuBox>
          <MentorCommetsContent>
            {comments?.comments?.map((comment: CommentProps) => {
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
                      {user?.intraId === comment?.cadets?.intraId &&
                      user &&
                      comment?.cadets ? (
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="icon"
                          color={'red'}
                          onClick={() => {
                            deleteComment(comment?.id);
                          }}
                        />
                      ) : null}
                    </div>
                    <div>{comment?.content}</div>
                  </UserContent>
                </Comment>
              );
            })}
          </MentorCommetsContent>
          <InputCounter
            value={inputComment}
            setter={setInputComment}
            disabled={false}
            maxLength={300}
            width={'100%'}
          />
          <SubmitButton>
            <Button
              text="제출하기"
              width="12rem"
              height="3.5rem"
              backgroundColor={theme.colors.polarSimpleMain}
              borderRadius="20px"
              onClick={() => {
                handleCommentSubmit();
              }}
            />
          </SubmitButton>
        </MentorCommets>
      </MentorBody>
    </MentorDetailTag>
  );
}

const ButtonBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
    color: ${theme.colors.fontGray};
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

const MenuBox2 = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  border-bottom: 1px solid ${theme.colors.grayFive};
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  overflow-wrap: break-word;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  div:nth-child(2) {
    color: ${theme.colors.polarSimpleMain};
  }
`;

const MentorCommetsContent = styled.div``;

const SubmitButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MentorCommets = styled.div`
  margin-top: 5%;
  /* .submitButton {
    display: flex;
    justify-content: flex-end;
  } */
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

const MenuBoxHead = styled.div``;

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
  .icon {
    margin-left: 1rem;
    margin-bottom: 2%;
    cursor: pointer;
  }
`;
const MentorDetailTag = styled.div`
  ${theme.font.nanumGothic};
  background-color: ${theme.colors.backgoundWhite};
`;

export default MentorDetail;
