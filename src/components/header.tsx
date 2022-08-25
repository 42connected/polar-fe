import React, { useState } from 'react';
import styled, { StyledComponent } from 'styled-components';
import logo from '../assets/image/logo/logo.png';
import theme from '../styles/theme';

const HeaderStyle = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1.5rem;
  background-color: ${theme.colors.backgoundWhite};
  box-shadow: ${theme.shadow.defaultShadow};
`;
const LogoButton = styled.button`
  cursor: pointer;
  font-size: 2.5rem;
  border: none;
  background-color: transparent;
  float: left;
`;
const MypageButton = styled.button`
  cursor: pointer;
  padding-right: 1.5rem;
  font-size: 1.8rem;
  float: right;
  border: none;
  margin: 10;
  margin-top: 0.4rem;
  background-color: transparent;
`;
const SuggestionButton = styled.button`
  cursor: pointer;
  padding-right: 1rem;
  font-size: 1.8rem;
  float: right;
  border: none;
  margin-top: 0.4rem;
  background-color: transparent;
`;
const LoginButton = styled.button`
  cursor: pointer;
  margin-right: 3rem;
  font-size: 1.8rem;
  float: right;
  background-color: transparent;
  margin-top: 0.2rem;
  border-radius: 10px;
`;

const topbarClick = () => {
  document.location.replace('http://localhost:3001/');
};
const suggestionClick = () => {
  document.location.replace('http://localhost:3002/');
};
const mypageClick = () => {
  document.location.replace('http://localhost:3003/');
};
const imagestyle = {
  height: '3rem',
  width: '3rem',
};

const Header = () => {
  const [login, setlogin] = useState(false);
  const loginClick = () => {
    if (login === false) document.location.replace('http://localhost:3004/');
    else {
    }
  };
  return (
    <HeaderStyle>
      <div className="header">
        <LogoButton onClick={topbarClick}>
          <img src={logo} style={imagestyle} className="App-logo" />
          polar
        </LogoButton>
        <LoginButton onClick={loginClick}>로그인</LoginButton>
        <MypageButton onClick={mypageClick}>마이페이지</MypageButton>
        <SuggestionButton onClick={suggestionClick}>건의사항</SuggestionButton>
      </div>
    </HeaderStyle>
  );
};

export default Header;
