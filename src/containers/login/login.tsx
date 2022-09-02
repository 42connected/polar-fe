import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import {
  DEFAULT_COOKIE_OPTION,
  setCookie,
  TOKEN_LIST,
} from '../../context/cookies';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '../../states/error/ErrorStore';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 220px);
`;

export function Login() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const code = params.get('code');

  useEffect(() => {
    if (ErrorStore.isError === true) {
      return;
    }
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
        setCookie(
          TOKEN_LIST.JOIN,
          res?.data?.user?.join,
          DEFAULT_COOKIE_OPTION,
        );
        navigate(-1);
      })
      .catch(err => {
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
  });

  return (
    <Background>
      <Loading />
    </Background>
  );
}
