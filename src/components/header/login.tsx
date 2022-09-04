import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AuthStore from '../../states/auth/AuthStore';
import theme from '../../styles/theme';

const LoginButton = styled.button`
  cursor: pointer;
  margin-right: 3rem;
  font-size: 1.8rem;
  float: right;
  background-color: transparent;
  margin-top: 0.2rem;
  border-radius: 10px;
  border-style: solid;
  color: ${theme.colors.blackOne};
`;

const MovLoginButton = styled.button`
  cursor: pointer;
  margin-right: 1.5rem;
  font-size: 1.4rem;
  float: right;
  background-color: transparent;
  margin-top: 0.2rem;
  border-radius: 10px;
  border-style: solid;
  color: ${theme.colors.blackOne};
`;

export const HeaderLogin = (props: { isMobile: boolean }) => {
  const [isLogin, setIsLogin] = useState<string>('로그아웃');

  const MovSetLogin = () => {
    AuthStore.getAccessToken() ? (
      <MovLoginButton
        onClick={() => {
          AuthStore.Logout();
          setIsLogin('로그인');
        }}
      >
        {isLogin}
      </MovLoginButton>
    ) : (
      <MovLoginButton
        onClick={() => {
          AuthStore.Login();
          setIsLogin('로그아웃');
        }}
      >
        {isLogin}
      </MovLoginButton>
    );
  };

  const PcSetLogin = () => {
    AuthStore.getAccessToken() ? (
      <LoginButton
        onClick={() => {
          AuthStore.Logout();
          setIsLogin('로그인');
        }}
      >
        {isLogin}
      </LoginButton>
    ) : (
      <LoginButton
        onClick={() => {
          AuthStore.Login();
          setIsLogin('로그아웃');
        }}
      >
        {isLogin}
      </LoginButton>
    );
  };

  return <>{props.isMobile ? MovSetLogin() : PcSetLogin()}</>;
};
