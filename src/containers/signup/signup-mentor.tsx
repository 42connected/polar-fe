import { debounce, Switch } from '@mui/material';
import axios from 'axios';
import singupImage from '../../assets/signup/signup.png';
import addButtonImage from '../../assets/signup/addButton.png';
import { useEffect, useRef, useState } from 'react';
import Columns from '../../components/signup/getColumns';
import React from 'react';
import LoadingStore from '../../states/loading/LoadingStore';
import { Navigate } from 'react-router-dom';
import MentorStore from '../../states/my-mentoring-mentor/MentorStore';
import AuthStore from '../../states/auth/AuthStore';
import UserJoinStore from '../../states/user-join/UserJoinStore';
import {
  AddButtonImage,
  BodyBigFont,
  BodySmallFont,
  Button,
  CertificationSendingButton,
  ColumnDays,
  ColumnLine,
  ColumnName,
  ContainersMobile,
  ContainersPc,
  HeadLetters,
  InfoInput,
  NameTitle,
  OptionWrapper,
  RequiredWrapper,
  ResultMessage,
  SingupImage,
  TimeTableContainer,
  ToggleContainer,
} from './signup-style';

interface AddColumnsProps {
  rows: IRows[];
  onRemove: (id: number) => void;
  onChange: (id: number, index: number, value: number) => void;
}

interface IRows {
  id: number;
  date: number[];
}

function AddColumns(props: AddColumnsProps) {
  return (
    <>
      {props.rows.map(rows => (
        <Columns
          key={rows.id}
          onRemove={props.onRemove}
          onChange={props.onChange}
          id={rows.id}
          date={rows.date}
        ></Columns>
      ))}
    </>
  );
}

enum AvailableTimeError {
  INPUT_ERROR,
  OVERLAP_ERROR,
  SUCCESS,
}

const SignUpMentor = () => {
  const [isRedirection, setIsRedirection] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [slackId, setSlackId] = useState<string>('');
  const [isMailSucess, setIsMailSucesss] = useState(false);
  const [isMailFail, setIsMailFail] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState<boolean>(false);
  const [mailOverlaped, setMailOverlaped] = useState<boolean>(false);
  const [checked, setChecked] = useState(true);
  const [code, setCode] = useState<string>('');
  const [isCodeSucess, setIsCodeSucesss] = useState(false);
  const [isCodeFail, setIsCodeFail] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [rows, setRows] = useState<IRows[]>([
    {
      id: 0,
      date: [0, 0, 0, 0, 0],
    },
  ]);

  useEffect(() => {
    UserJoinStore.off();
    MentorStore.getMentor(AuthStore.getUserIntraId());
    window.innerWidth <= 500 ? setIsMobile(true) : setIsMobile(false);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextId = useRef(1);

  const handleResize = debounce(() => {
    if (window.innerWidth <= 500) setIsMobile(true);
    else setIsMobile(false);
  }, 10);

  const onRowCreate = () => {
    const newRows: IRows = {
      id: nextId.current,
      date: [0, 0, 0, 0, 0],
    };
    setRows([...rows, newRows]);
    nextId.current += 1;
  };

  const onRowRemove = (id: number) => {
    setRows(rows.filter(rows => rows.id !== id));
  };

  const onRowChange = (id: number, index: number, value: number) => {
    const firstIndex = 0;
    const row = rows.filter(rows => rows.id === id);
    row[firstIndex].date[index] = value;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const onSlackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlackId(event.target.value);
  };

  async function validateRows(rows: IRows[]): Promise<boolean> {
    const invaild_data = -1;

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].date.length; j++) {
        if (rows[i].date[j] === invaild_data) {
          return false;
        }
      }
    }
    return true;
  }

  async function validateAvailableTime(
    time: IAvailableDate[][],
  ): Promise<AvailableTimeError> {
    for (let i = 0; i < time.length; i++) {
      for (let j = 0; j < time[i].length; j++) {
        if (!isValidTime(time[i][j])) {
          return AvailableTimeError.INPUT_ERROR;
        }
      }
    }

    for (let day = 0; day < 7; day++) {
      const length = time[day].length;
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
          if (i === j) {
            continue;
          }
          if (!validateTimeOverlap(time[day][i], time[day][j])) {
            return AvailableTimeError.OVERLAP_ERROR;
          }
        }
      }
    }
    return AvailableTimeError.SUCCESS;
  }

  function isValidTime(time: IAvailableDate): boolean {
    if (
      !(time.startHour >= 0 && time.startHour < 24) ||
      !(time.startMinute === 0 || time.startMinute === 30) ||
      !(time.endHour >= 0 && time.endHour < 24) ||
      !(time.endMinute === 0 || time.endMinute === 30)
    ) {
      return false;
    }
    if (time.startHour >= time.endHour) {
      return false;
    }
    const endTotalMinute = time.endHour * 60 + time.endMinute;
    const startTotalMinute = time.startHour * 60 + time.startMinute;
    if (endTotalMinute - startTotalMinute < 60) {
      return false;
    }
    return true;
  }

  function validateTimeOverlap(
    time1: IAvailableDate,
    time2: IAvailableDate,
  ): boolean {
    if (time1.startHour <= time2.startHour && time1.endHour > time2.startHour) {
      return false;
    }
    if (
      time1.endHour === time2.startHour &&
      time1.endMinute === 30 &&
      time2.startMinute === 0
    ) {
      return false;
    }
    if (time2.startHour <= time1.startHour && time2.endHour > time1.startHour) {
      return false;
    }
    if (
      time2.endHour === time1.startHour &&
      time2.endMinute === 30 &&
      time1.endMinute === 0
    ) {
      return false;
    }
    return true;
  }

  async function joinMentorServer(rows: IRows[]) {
    if (!name) {
      alert('이름을 입력하세요');
      return;
    }

    if (!slackId) {
      alert('Slack ID를 입력하세요');
      return;
    }

    if (!alreadyRegistered && !isCodeSucess) {
      alert('e-mail 인증을 완료해주세요');
      return;
    }

    LoadingStore.on();

    if (!(await validateRows(rows))) {
      alert('가능시간에 빈 칸이 있습니다');
      LoadingStore.off();
      return;
    }

    const availableTime: IAvailableDate[][] = await getAvailableTime(rows);

    const resultVaildation: AvailableTimeError = await validateAvailableTime(
      availableTime,
    );

    if (resultVaildation === AvailableTimeError.INPUT_ERROR) {
      alert('가능시간은 시작 시간으로부터 1시간 이상이어야 합니다');
      LoadingStore.off();
      return;
    } else if (resultVaildation === AvailableTimeError.OVERLAP_ERROR) {
      alert('선택하신 가능시간 간에 중복이 있습니다');
      LoadingStore.off();
      return;
    }

    try {
      axios.defaults.headers.common[
        'Authorization'
      ] = `bearer ${AuthStore.getAccessToken()}`;

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/mentors/join`,
        {
          name: name,
          slackId: slackId,
          availableTime: availableTime,
          isActive: checked,
        },
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        alert('제출에 성공하셨습니다');

        setIsRedirection(true);
      } else {
        alert('제출에 실패하셨습니다');
      }
    } catch (err) {
      alert('제출에 실패하셨습니다');
    } finally {
      LoadingStore.off();
    }
  }

  interface IAvailableDate {
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
  }

  async function getAvailableTime(rows: IRows[]): Promise<IAvailableDate[][]> {
    const availableTime: IAvailableDate[][] = Array.from(Array(7), () =>
      Array(0).fill(null),
    );

    if (checked) {
      rows.map(row => {
        const temp: IAvailableDate = {
          startHour: (row.date[1] + 8) % 24,
          startMinute: row.date[2] ? 30 : 0,
          endHour: (row.date[3] + 8) % 24,
          endMinute: row.date[4] ? 30 : 0,
        };
        availableTime[row.date[0]].push(temp);
      });
    }

    return availableTime;
  }

  async function SendEmail(email: string) {
    if (!email) {
      alert('Email을 입력하세요');
      return;
    }

    setIsMailSucesss(false);
    setIsMailFail(false);
    setAlreadyRegistered(false);
    setMailOverlaped(false);

    try {
      LoadingStore.on();
      axios.defaults.headers.common[
        'Authorization'
      ] = `bearer ${AuthStore.getAccessToken()}`;

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/email-verifications`,
        {
          email: email,
        },
      );

      if (response.status === 201) {
        setIsMailSucesss(true);
      } else {
        setIsMailFail(true);
      }
    } catch (error: any) {
      if (MentorStore.mentor.email === email) {
        setAlreadyRegistered(true);
      } else if (error.response && error.response.status === 409) {
        setMailOverlaped(true);
      } else {
        setIsMailFail(true);
      }
    } finally {
      LoadingStore.off();
    }
  }

  async function certificateEmail(code: string) {
    if (!code) {
      alert('인증코드를 입력하세요');
      return;
    }

    setIsCodeSucesss(false);
    setIsCodeFail(false);

    try {
      LoadingStore.on();

      axios.defaults.headers.common[
        'Authorization'
      ] = `bearer ${AuthStore.getAccessToken()}`;

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/email-verifications/${code}`,
        {
          code: code,
        },
      );

      if (response.status === 201) {
        setIsCodeSucesss(true);
      } else {
        setIsCodeFail(true);
      }
    } catch (err) {
      setIsCodeFail(true);
    } finally {
      LoadingStore.off();
    }
  }

  return (
    <>
      {!isMobile && (
        <ContainersPc>
          <RequiredWrapper>
            <HeadLetters>필수 정보 입력</HeadLetters>
            <SingupImage src={singupImage} alt="singup-image" />

            <div style={{ paddingBottom: '5px' }}>
              <NameTitle>본인 이름</NameTitle>
              <InfoInput
                type="text"
                onChange={onNameChange}
                placeholder="보고서 작성 등에 사용됩니다."
                maxLength={10}
              ></InfoInput>
            </div>

            <div style={{ paddingBottom: '5px' }}>
              <NameTitle>슬랙 ID</NameTitle>
              <InfoInput
                type="text"
                onChange={onSlackChange}
                maxLength={100}
                placeholder="카뎃과의 연락에 사용됩니다."
                color="blue"
              ></InfoInput>
            </div>
            <>
              {alreadyRegistered && (
                <ResultMessage>이미 이메일이 등록되었습니다</ResultMessage>
              )}
            </>
            <>
              {!alreadyRegistered && (
                <div>
                  <div style={{ paddingBottom: '5px' }}>
                    <NameTitle>e-mail</NameTitle>
                    <InfoInput
                      maxLength={100}
                      onChange={onEmailChange}
                      placeholder="멘토링 안내 메일이 전송됩니다."
                    />
                  </div>
                  <div style={{ paddingBottom: '0px', marginBottom: '0px' }}>
                    <CertificationSendingButton
                      onClick={() => SendEmail(email)}
                    >
                      인증
                    </CertificationSendingButton>
                    <>
                      {isMailSucess && (
                        <ResultMessage>메일 전송 완료했습니다</ResultMessage>
                      )}
                    </>
                    <>
                      {isMailFail && (
                        <ResultMessage>메일 전송 실패했습니다</ResultMessage>
                      )}
                    </>
                    <>
                      {mailOverlaped && (
                        <ResultMessage>
                          사용 불가능한 이메일입니다
                        </ResultMessage>
                      )}
                    </>
                  </div>
                  <NameTitle style={{ paddingTop: '0px', marginTop: '0px' }}>
                    인증코드
                  </NameTitle>
                  <InfoInput
                    maxLength={10}
                    onChange={onCodeChange}
                    placeholder="인증코드를 입력해주세요."
                  />
                  <CertificationSendingButton
                    onClick={() => certificateEmail(code)}
                  >
                    확인
                  </CertificationSendingButton>
                  <>
                    {isCodeSucess && (
                      <ResultMessage>인증에 완료했습니다</ResultMessage>
                    )}
                  </>
                  <>
                    {isCodeFail && (
                      <ResultMessage>인증에 실패했습니다</ResultMessage>
                    )}
                  </>
                </div>
              )}
            </>
          </RequiredWrapper>
          <OptionWrapper>
            <HeadLetters style={{ paddingLeft: '16rem' }}>
              멘토링 가능 시간
            </HeadLetters>
            <ToggleContainer>
              <NameTitle>멘토링 가능/불가</NameTitle>
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{ mb: 1, mr: -6 }}
              />
              <BodySmallFont style={{ paddingBottom: '6px' }}>
                가능
              </BodySmallFont>
            </ToggleContainer>
            <NameTitle
              style={{
                paddingLeft: '1rem',
                height: '0rem',
              }}
            >
              시간
            </NameTitle>
            <TimeTableContainer style={{ marginTop: '0rem' }}>
              <ColumnDays>
                <BodyBigFont>요일</BodyBigFont>
              </ColumnDays>
              <ColumnName>
                <BodyBigFont>가능시간</BodyBigFont>
              </ColumnName>
              <ColumnLine></ColumnLine>
            </TimeTableContainer>
            <>
              {checked && (
                <AddColumns
                  rows={rows}
                  onRemove={onRowRemove}
                  onChange={onRowChange}
                />
              )}
            </>
            <AddButtonImage
              src={addButtonImage}
              alt="add-button-image"
              style={{ paddingLeft: '27.7rem' }}
              onClick={onRowCreate}
            />
            <Button
              style={{
                marginBottom: '5rem',
                marginLeft: '20rem',
                marginTop: '10rem',
              }}
              onClick={() => joinMentorServer(rows)}
            >
              제출
              {isRedirection && <Navigate to="/" />}
            </Button>
          </OptionWrapper>
        </ContainersPc>
      )}
      {isMobile && (
        <ContainersMobile>
          <RequiredWrapper>
            <HeadLetters>필수 정보 입력</HeadLetters>
            <SingupImage src={singupImage} alt="singup-image" />

            <div style={{ paddingBottom: '5px' }}>
              <NameTitle>본인 이름</NameTitle>
              <InfoInput
                type="text"
                onChange={onNameChange}
                placeholder="보고서 작성 등에 사용됩니다."
                maxLength={10}
              ></InfoInput>
            </div>

            <div style={{ paddingBottom: '5px' }}>
              <NameTitle>슬랙 ID</NameTitle>
              <InfoInput
                type="text"
                onChange={onSlackChange}
                maxLength={100}
                placeholder="카뎃과의 연락에 사용됩니다."
                color="blue"
              ></InfoInput>
            </div>
            <>
              {alreadyRegistered && (
                <ResultMessage>이미 이메일이 등록되었습니다</ResultMessage>
              )}
            </>
            <>
              {!alreadyRegistered && (
                <div>
                  <div style={{ paddingBottom: '5px' }}>
                    <NameTitle>e-mail</NameTitle>
                    <InfoInput
                      maxLength={100}
                      onChange={onEmailChange}
                      placeholder="멘토링 안내 메일이 전송됩니다."
                    />
                  </div>
                  <div style={{ paddingBottom: '0px', marginBottom: '0px' }}>
                    <CertificationSendingButton
                      onClick={() => SendEmail(email)}
                    >
                      인증
                    </CertificationSendingButton>
                    <>
                      {isMailSucess && (
                        <ResultMessage>메일 전송 완료했습니다</ResultMessage>
                      )}
                    </>
                    <>
                      {isMailFail && (
                        <ResultMessage>메일 전송 실패했습니다</ResultMessage>
                      )}
                    </>
                    <>
                      {mailOverlaped && (
                        <ResultMessage>
                          사용 불가능한 이메일입니다
                        </ResultMessage>
                      )}
                    </>
                  </div>
                  <NameTitle style={{ paddingTop: '0px', marginTop: '0px' }}>
                    인증코드
                  </NameTitle>
                  <InfoInput
                    maxLength={10}
                    onChange={onCodeChange}
                    placeholder="인증코드를 입력해주세요."
                  />
                  <CertificationSendingButton
                    onClick={() => certificateEmail(code)}
                  >
                    확인
                  </CertificationSendingButton>
                  <>
                    {isCodeSucess && (
                      <ResultMessage>인증에 완료했습니다</ResultMessage>
                    )}
                  </>
                  <>
                    {isCodeFail && (
                      <ResultMessage>인증에 실패했습니다</ResultMessage>
                    )}
                  </>
                </div>
              )}
            </>
          </RequiredWrapper>
          <OptionWrapper>
            <HeadLetters style={{ paddingLeft: '16rem' }}>
              멘토링 가능 시간
            </HeadLetters>
            <ToggleContainer>
              <NameTitle>멘토링 가능/불가</NameTitle>
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{ mb: 1, mr: -6 }}
              />
              <BodySmallFont style={{ paddingBottom: '6px' }}>
                가능
              </BodySmallFont>
            </ToggleContainer>
            <NameTitle
              style={{
                paddingLeft: '1rem',
                height: '0rem',
              }}
            >
              시간
            </NameTitle>
            <TimeTableContainer style={{ marginTop: '0rem' }}>
              <ColumnDays>
                <BodyBigFont>요일</BodyBigFont>
              </ColumnDays>
              <ColumnName>
                <BodyBigFont>가능시간</BodyBigFont>
              </ColumnName>
              <ColumnLine></ColumnLine>
            </TimeTableContainer>
            <>
              {checked && (
                <AddColumns
                  rows={rows}
                  onRemove={onRowRemove}
                  onChange={onRowChange}
                />
              )}
            </>
            <AddButtonImage
              src={addButtonImage}
              alt="add-button-image"
              style={{ paddingLeft: '27.7rem' }}
              onClick={onRowCreate}
            />
            <Button
              style={{
                marginBottom: '5rem',
                marginLeft: '20rem',
                marginTop: '10rem',
              }}
              onClick={() => joinMentorServer(rows)}
            >
              제출
              {isRedirection && <Navigate to="/" />}
            </Button>
          </OptionWrapper>
        </ContainersMobile>
      )}
    </>
  );
};

export default SignUpMentor;
