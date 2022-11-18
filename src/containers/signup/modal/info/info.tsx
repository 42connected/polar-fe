import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  OneButtonModal,
  OneButtonModalProps,
} from '@/components/modal/one-button-modal/one-button-modal';
import AuthStore from '@/states/auth/AuthStore';
import LoadingStore from '@/states/loading/LoadingStore';
import theme from '@/styles/theme';
import { MentorsData } from '@/containers/signup/modal/mentor-details-modal-inteface';
import {
  CertificationSendingButton,
  Container,
  InfoInput,
  NameTitle,
  ResultMessage,
} from '@/containers/signup/modal/info/info-style';

interface InfoProps {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSlackId: React.Dispatch<React.SetStateAction<string>>;
  setAlreadyRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCodeSucesss: React.Dispatch<React.SetStateAction<boolean>>;
  setMentorsData: React.Dispatch<React.SetStateAction<MentorsData>>;
  alreadyRegistered: boolean;
  isCodeSucess: boolean;
  MentorsData: MentorsData;
}

export function Info(props: InfoProps) {
  const defaultSlackId = props.MentorsData.slackId;
  const defaultEmail = props.MentorsData.email;
  const defaultName = props.MentorsData.name;
  const [code, setCode] = useState<string>('');
  const [email, setEmail] = useState<string>(defaultEmail);
  const [isMailSucess, setIsMailSucesss] = useState(false);
  const [isMailFail, setIsMailFail] = useState(false);
  const [mailOverlaped, setMailOverlaped] = useState<boolean>(false);
  const [isCodeFail, setIsCodeFail] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [oneButtonModalProps, setOneButtonModalProps] =
    useState<OneButtonModalProps>({
      TitleText: '',
      Text: 'ss',
      XButtonFunc: () => {
        setIsError(false);
      },
      ButtonText: '',
      ButtonBg: '',
      ButtonFunc: () => {
        setIsError(false);
      },
    });

  useEffect(() => {
    setEmail(defaultEmail);
    props.setName(defaultName);
    props.setSlackId(defaultSlackId);
  }, [defaultEmail, defaultName, defaultSlackId]);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setName(event.target.value);
  };

  const onSlackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSlackId(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  async function SendEmail() {
    if (!email) {
      setOneButtonModalProps({
        TitleText: '이메일을 입력하세요',
        Text: '이메일을 입력하세요',
        XButtonFunc: () => {
          setIsError(false);
        },
        ButtonText: '확인',
        ButtonFunc: () => {
          setIsError(false);
        },
      });
      setIsError(true);
      return;
    }

    setIsMailSucesss(false);
    setIsMailFail(false);
    props.setAlreadyRegistered(false);
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
      if (props.MentorsData.email === email) {
        props.setAlreadyRegistered(true);
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
      setOneButtonModalProps({
        TitleText: '인증코드를 입력하세요',
        Text: '인증코드를 입력하세요',
        XButtonFunc: () => {
          setIsError(false);
        },
        ButtonText: '확인',
        ButtonFunc: () => {
          setIsError(false);
        },
      });

      setIsError(true);
      return;
    }

    props.setIsCodeSucesss(false);
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
        props.setIsCodeSucesss(true);
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
    <Container>
      <div style={{ paddingBottom: '5px' }}>
        <NameTitle>본인 이름</NameTitle>
        <InfoInput
          type="text"
          onChange={onNameChange}
          placeholder="보고서 작성 등에 사용됩니다."
          maxLength={10}
          defaultValue={defaultName}
        ></InfoInput>
      </div>

      <div style={{ paddingBottom: '5px', paddingTop: '15px' }}>
        <NameTitle>슬랙 닉네임</NameTitle>
        <InfoInput
          type="text"
          onChange={onSlackChange}
          maxLength={100}
          placeholder="42Slack 닉네임과 같게 입력해주세요."
          color="blue"
          defaultValue={defaultSlackId}
        ></InfoInput>
        <div
          style={{
            color: `${theme.colors.fontGray}`,
            marginBottom: '0rem',
            paddingLeft: '12rem',
            paddingBottom: '0rem',
            fontSize: '1.5rem',
          }}
        >
          * 카뎃과의 연락에 사용됩니다
        </div>
      </div>
      <>
        {props.alreadyRegistered && (
          <ResultMessage>이미 이메일이 등록되었습니다</ResultMessage>
        )}
      </>
      <>
        {!props.alreadyRegistered && (
          <div>
            <div style={{ paddingBottom: '5px' }}>
              <NameTitle>e-mail</NameTitle>
              <InfoInput
                maxLength={100}
                onChange={onEmailChange}
                placeholder="멘토링 안내 메일이 전송됩니다."
                defaultValue={defaultEmail}
                required
              />
            </div>
            <div style={{ paddingBottom: '0px', marginBottom: '0px' }}>
              <CertificationSendingButton onClick={() => SendEmail()}>
                인증
              </CertificationSendingButton>
              {isError && <OneButtonModal {...oneButtonModalProps} />}
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
                  <ResultMessage>사용 불가능한 이메일입니다</ResultMessage>
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
            <CertificationSendingButton onClick={() => certificateEmail(code)}>
              확인
            </CertificationSendingButton>
            <>
              {props.isCodeSucess && (
                <ResultMessage>인증에 완료했습니다</ResultMessage>
              )}
            </>
            <>
              {isCodeFail && <ResultMessage>인증에 실패했습니다</ResultMessage>}
            </>
          </div>
        )}
      </>
    </Container>
  );
}
