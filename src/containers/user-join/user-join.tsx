import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { getCookie, TOKEN_LIST } from '../../context/cookies';
import UserJoinStore from '../../states/user-join/UserJoinStore';
import defaultTheme from '../../styles/theme';

const Fade = keyframes`
  0% {
   opacity: 0;
  }
  10% {
    opacity: 0.1;
  }
  20% {
    opacity: 0.2;
  }
  30% {
    opacity: 0.3;
  }
  40% {
    opacity: 0.4;
  }
  50% {
   opacity: 0.5;
  }
  60% {
    opacity: 0.6;
  }
  70% {
    opacity: 0.7;
  }
  80% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.9;
  }
  100% {
   opacity: 1;
  }
 `;

const XButton = styled.div`
  display: flex;
  width: 90%;
  justify-content: right;
  align-items: center;
  cursor: pointer;
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(246, 246, 246, 0.7);

  z-index: 1002;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  animation: ${Fade} 0.3s;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  width: 400px;
  padding: 30px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${defaultTheme.colors.polarGray};
  border-radius: 10px;
  ${defaultTheme.fontSize.sizeSmall};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const ButtonWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  width: 70%;
  text-decoration: none;
`;

const Button = styled.button`
  display: flex;
  ${defaultTheme.fontSize.sizeSmall};
  ${defaultTheme.font.sebangGothic};
  border-radius: 5px;
  border: none;
  text-align: center;
  align-items: center;
  text-decoration: none;
  height: 35px;
  background-color: ${defaultTheme.colors.polarSimpleMain};
  color: #ffffff;
  width: 40%;
  justify-content: center;
  &:hover {
    opacity: 0.8;
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  font-weight: bold;
  cursor: pointer;
`;

export function UserJoin() {
  const userName = getCookie(TOKEN_LIST.INTRA_ID);
  const role = getCookie(TOKEN_LIST.USER_ROLE);
  const url = `/${role}s/join`;

  return (
    <Background>
      <Box>
        안녕하세요 {userName}님 👋
        <br />
        <br />
        필수 정보를 입력해야 원활한 서비스 이용이 가능합니다! 🙇‍♂️
        <br />
        <br />
        <ButtonWrapper to={url}>
          <Button>입력 하러 가기 ✈️</Button>
        </ButtonWrapper>
      </Box>
    </Background>
  );
}
