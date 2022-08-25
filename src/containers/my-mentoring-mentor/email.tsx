import styled from '@emotion/styled';
import { faCheck, faPencil, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import AuthStore from '../../states/auth/AuthStore';
import MentorStore from '../../states/my-mentoring-mentor/MentorStore';
import defaultTheme from '../../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: left;
  height: 100px;
`;

const Title = styled.div`
  ${defaultTheme.fontSize.sizeExtraSmall};
  ${defaultTheme.font.nanumGothic};
  display: flex;
  justify-content: left;
  width: 70px;
  align-items: center;
`;

const Field = styled.div`
  display: flex;
  width: 40%;
  justify-content: left;
  align-items: center;
  ${defaultTheme.fontSize.sizeExtraSmall};
  font-weight: bold;
  margin: 10px 0px;
`;

const TextInput = styled.input`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 250px;
  height: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  font-weight: normal;
  border: none;
  margin: 0px 20px;
  ${defaultTheme.fontSize.sizeExtraSmall};
  ${defaultTheme.font.nanumGothic};
`;

const DoubleButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50px;
`;

export interface EmailProps {
  email: string;
  setEmail: (email: string) => void;
}

export function Email(props: EmailProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [time, setTime] = useState<boolean>(false);
  const [emailVerify, setEmailVerify] = useState<string>('');

  const authenticate = async () => {
    await AuthStore.Login();
    await MentorStore.changeEmail(props.email, AuthStore.jwt);
    setTime(true);
    console.log(() => {
      setTime(false);
    }, 1000 * 180);
  };

  const verify = async () => {
    setTime(true);
    await AuthStore.Login();
    await MentorStore.verifyEmail(emailVerify, AuthStore.jwt);
  };

  return (
    <Container>
      <Field>
        <Title>Email</Title>
        <TextInput
          value={props.email}
          disabled={!isEdit}
          onChange={e => {
            props.setEmail(e.target.value);
          }}
        />
        {isEdit ? (
          <>
            <DoubleButton>
              <FontAwesomeIcon
                icon={faX}
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
              />
              <FontAwesomeIcon
                icon={faCheck}
                onClick={() => {
                  authenticate();
                  setIsEdit(false);
                }}
              />
            </DoubleButton>
          </>
        ) : (
          <FontAwesomeIcon icon={faPencil} onClick={() => setIsEdit(!isEdit)} />
        )}
      </Field>
      {time && (
        <Field>
          <Title>인증코드</Title>
          <TextInput
            onChange={e => {
              setEmailVerify(e.target.value);
            }}
          />
          <FontAwesomeIcon icon={faCheck} onClick={verify} />
        </Field>
      )}
    </Container>
  );
}
