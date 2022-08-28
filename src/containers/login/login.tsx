import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import {
  DEFAULT_COOKIE_OPTION,
  setCookie,
  TOKEN_LIST,
} from '../../context/cookies';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 220px);
`;

export function Login() {
  const [params, setParams] = useSearchParams();
  const code = params.get('code');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_LOGIN_CALLBACK_URL}?code=${code}`)
      .then(res => {
        setCookie(
          TOKEN_LIST.ACCESS_TOKEN,
          res?.data?.jwt,
          DEFAULT_COOKIE_OPTION,
        );
        setCookie(
          TOKEN_LIST.INTRA_ID,
          res?.data?.user?.intraId,
          DEFAULT_COOKIE_OPTION,
        );
        setCookie(
          TOKEN_LIST.USER_ROLE,
          res?.data?.user?.role,
          DEFAULT_COOKIE_OPTION,
        );
        document.location.href = '/';
      })
      .catch(err => {
        alert(err);
      });
  });

  return (
    <Background>
      <Loading />
    </Background>
  );
}
