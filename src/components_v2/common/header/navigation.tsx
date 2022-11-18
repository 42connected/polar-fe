import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import defaultTheme from '@/styles/themeV2';

interface navProps {
  isLogin: boolean;
  toggleNav: () => void;
}

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: ${defaultTheme.zIndex.headerNav};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
const Nav = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  background-color: white;
  box-shadow: ${defaultTheme.shadow.defaultShadow};
`;
const Button = styled.button`
  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeMedium};
  border: none;
  background-color: transparent;
  color: black;
  cursor: pointer;
  height: 4.5rem;
  text-align: left;
  padding-left: 10%;
  border-bottom: 1px solid;
  border-color: ${defaultTheme.colors.brightGray};
`;
const A = styled(Button.withComponent('a'))`
  text-decoration: none;
  color: black;
  line-height: 4.5rem;
`;
const Div = styled.div`
  display: block;
  width: 40%;
  text-align: center;
  padding-bottom: 1rem;
  position: fixed;
  bottom: 0;
  font-family: ${defaultTheme.font.sebangGothic};
  color: ${defaultTheme.colors.middleGray};
  font-size: ${defaultTheme.mobileFontSize.sizeLarge};
`;
function Navigation({ isLogin, toggleNav }: navProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <Container>
      <Nav>
        <Button onClick={toggleNav}>
          <FontAwesomeIcon icon={faX} />
        </Button>
        <A href="/somewhere">건의사항</A>
        <Button>마이페이지</Button>
        <Button>{isLogin ? '로그아웃' : '로그인'}</Button>
        <Div>42polar</Div>
      </Nav>
    </Container>
  );
}

export default Navigation;
