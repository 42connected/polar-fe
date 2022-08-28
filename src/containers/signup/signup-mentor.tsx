import styled from '@emotion/styled';
import { Switch } from '@mui/material';
import axios from 'axios';
import defaultTheme from '../../styles/theme';
import singupImage from '../../assets/signup/signup.png';
import addButtonImage from '../../assets/signup/addButton.png';
import { useEffect, useRef, useState } from 'react';
import Columns from '../../components/signup/getColumns';
import React from 'react';
import LoadingStore from '../../states/loading/LoadingStore';
import { Navigate } from 'react-router-dom';
import MentorStore from '../../states/my-mentoring-mentor/MentorStore';
import AuthStore from '../../states/auth/AuthStore';
import theme from '../../styles/theme';

// 코드 쪼개기
// Css처리
// + 버튼 여러개 눌렀을 때 로직 재확인
//  -> 지금 가능 시간이 많아질수록 여러 번 클릭해야 함
// 상태관리와 리다이렉션 경로 수정
// 홈에서 뒤로가기했을 때 sign에 들어갈 수 있는지 체크 -> 지금은 가능
// cadets/join
// mentors/join

export const Containers = styled.div`
  display: grid;
  background: white;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-column-gap: 10rem;
  justify-items: center;
`;

export const RequiredWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
  padding-top: 4rem;
  width: 400px;
`;

export const OptionWrapper = styled.div`
  padding-top: 4rem;
  align-items: center;
  justify-content: left;
  padding-bottom: 100px;
  margin-top: 3rem;
  margin-right: 0rem;
  width: 500px;
`;

export const HeadLetters = styled.h1`
  ${defaultTheme.font.sebangGothic};
  font-size: 2.5rem;
  font-weight: 400;
  padding-left: 10rem;
  padding-bottom: 20px;
  border-bottom: 1px solid;
`;

const SingupImage = styled.img`
  width: 35rem;
  height: 18.5rem;
`;

const NameTitle = styled.h2`
  font-weight: 400;
  font-size: 2rem;
  ${defaultTheme.font.sebangGothic};
  padding-left: 20px;
  padding-bottom: 5px;
`;

export const InfoInput = styled.input`
  width: 27rem;
  height: 3rem;
  border-radius: 20px;
  align: center;
  margin-left: 20px;
  margin-bottom: 10px;
  padding-left: 3rem;
  background: ${theme.colors.polarBackground}; 
  border:none;
  border-right:0px;
  border-top:0px;
  boder-left:0px;
  boder-bottom:0px;"
  fontSize: 19;
  ${theme.font.sebangGothic}; 
  ${theme.fontWeight.weightSmall}; 
  ${theme.fontSize.sizeExtraSmall}; 
}
`;

export const EmailInput = styled.input`
  width: 27rem;
  height: 3rem;
  border-radius: 20px;
  align: center;
  margin-left: 20px;
  margin-bottom: 10px;
  border:none;
  border-right:0px;
  border-top:0px;
  boder-left:0px;
  boder-bottom:0px;"
`;

export const CertificationSendingButton = styled.button`
  margin-left: 240px;
  width: 70.19px;
  height: 35.11px;
  justify-content: center;
  background: ${defaultTheme.colors.polarSimpleMain};
  color: WHITE;
  padding-top: 1rem;
  padding-right: 0.8rem;
  border: none;
  cursor: pointer;
  font-size: 27px;
  border-radius: 20px;
  position: absolute
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Button = styled.button`
  justify-content: center;
  margin-left: 70px;
  width: 138.19px;
  height: 39.11px;
  background: ${defaultTheme.fontColor.blueColor};
  color: WHITE;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-size: 27px;
  border-radius: 20px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const TimeTableContainer = styled.ul`
  display: grid;
  justify-content: right;
  grid-template-columns: 18% 8rem 8rem 5% 8rem 8rem 3%;
  grid-template-rows: 4rem;
  grid-gap: 4px;
  list-style-type: none;
  margin-right: 2rem;
`;

const ColumnDays = styled.li`
  grid-column-start: 1;
  grid-column-end: 2;
  padding-left: 20px;
`;

const ColumnName = styled.li`
  grid-column-start: 2;
  grid-column-end: 7;
  padding-left: 150px;
`;

const ColumnLine = styled.li`
  grid-column-start: 1;
  grid-column-end: 8;
  padding: 0px, 0px, 0px, 0px;
  margin: 0px, 0ox, 0px, 0px;
  border-top: 0.5px solid;
`;

const AddButtonImage = styled.img`
  width: 1.7rem;
  height: 1.5rem;
  cursor: pointer;
  margin-top: 1.5rem;
`;

export const DeleteButtonImage = styled.img`
  width: 1.3rem;
  height: 1.1rem;
  cursor: pointer;
  margin-top: 1.2rem;
  background-color: black;
`;

export const BodyBigFont = styled.p`
  ${defaultTheme.fontFrame.bodyMiddle};
  ${defaultTheme.font.sebangGothic};
`;

export const ToggleContainer = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1px;
  gap: 5rem;
  margin-top: 10rem;
  padding-top; 10rem;
  margin-bottom: 8rem;
  padding-bottom; 8rem;
`;

const BodySmallFont = styled.p`
  font-size: 1.8rem;
  font-family: NanumGothic;
  font-weight: 400;
`;

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
  const [rows, setRows] = useState<IRows[]>([
    {
      id: 0,
      date: [0, 0, 0, 0, 0],
    },
  ]);

  useEffect(() => {
    AuthStore.Login();
    MentorStore.getMentor(AuthStore.user.intraId, AuthStore.jwt);
  }, []);

  const nextId = useRef(1);

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
          if (i == j) {
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
      ] = `bearer ${AuthStore.jwt}`;

      const response = await axios.patch(
        'https://polar42-be-dev.herokuapp.com/api/v1/mentors/join',
        {
          name: name,
          slackId: slackId,
          availableTime: availableTime,
          isActive: checked,
        },
      );

      if (response.status === 200) {
        alert('제출에 성공하셨습니다');

        setIsRedirection(true);
      } else {
        alert('제출에 실패하셨습니다');
      }
    } catch (err) {
      console.error(err);
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
      ] = `bearer ${AuthStore.jwt}`;

      const response = await axios.post(
        'https://polar42-be-dev.herokuapp.com/api/v1/email-verifications',
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
      } else if (error.response.status === 409) {
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
      ] = `bearer ${AuthStore.jwt}`;

      const response = await axios.post(
        `https://polar42-be-dev.herokuapp.com/api/v1/email-verifications/${code}`,
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
    <Containers>
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
        <>{alreadyRegistered && <p>이미 이메일이 등록되었습니다</p>}</>
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
                <CertificationSendingButton onClick={() => SendEmail(email)}>
                  인증
                </CertificationSendingButton>
                <>{isMailSucess && <p>메일 전송 완료했습니다</p>}</>
                <>{isMailFail && <p>메일 전송 실패했습니다</p>}</>
                <>{mailOverlaped && <p>사용 불가능한 이메일입니다</p>}</>
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
              <>{isCodeSucess && <p>인증에 완료했습니다</p>}</>
              <>{isCodeFail && <p>인증에 실패했습니다</p>}</>
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
          <BodySmallFont style={{ paddingBottom: '6px' }}>가능</BodySmallFont>
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
    </Containers>
  );
};

export default SignUpMentor;
