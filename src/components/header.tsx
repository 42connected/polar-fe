import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/image/logo/logo.png';
import AuthStore, { USER_ROLES } from '../states/auth/AuthStore';
import theme from '../styles/theme';

const HeaderStyle = styled.header`
  position: relative;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 5rem;
  padding-top: 2rem;
  background-color: ${theme.colors.backgoundWhite};
  box-shadow: ${theme.shadow.defaultShadow};
`;

const LogoButton = styled.button`
  margin-top: -0.5rem;
  cursor: pointer;
  font-size: 3rem;
  letter-spacing: 0.1rem;
  border: none;
  color: ${theme.fontColor.blueColor};
  font-weight: 600;
  background-color: transparent;
  float: left;
  margin-left: 3rem;
`;

const MypageButton = styled.button`
  cursor: pointer;
  padding-right: 2rem;
  font-size: 1.8rem;
  float: right;
  border: none;
  margin: 10;
  margin-top: 0.4rem;
  background-color: transparent;
`;

const SuggestionButton = styled.button`
  cursor: pointer;
  padding-right: 2rem;
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
  border-style: solid;
  color: ${theme.colors.blackOne};
`;

const MyMentoringButton = styled.button`
  cursor: pointer;
  padding-right: 2rem;
  font-size: 1.8rem;
  float: right;
  border: none;
  margin: 10;
  margin-top: 0.4rem;
  background-color: transparent;
`;

const DataRoomButton = styled.button`
  cursor: pointer;
  padding-right: 2rem;
  font-size: 1.8rem;
  float: right;
  border: none;
  margin: 10;
  margin-top: 0.4rem;
  background-color: transparent;
`;

const imagestyle = {
  height: '4rem',
  width: '4rem',
};

const Header = () => {
  let mdlinks = '/mentor-detail/';
  let mlinks = '/mentors/mentorings/';

  const AlertDetail = () => {
    return alert('카뎃배포는 다음주입니다! 조금만 기다려주세요:)'), null;
  };
  AuthStore.getUserRole()
    ? ((mdlinks = '/mentor-detail/' + AuthStore.getUserIntraId()),
      (mlinks = '/mentors/mentorings/' + AuthStore.getUserIntraId()))
    : '';
  return (
    <HeaderStyle>
      <div className="header">
        <Link to="/">
          <LogoButton>
            <img src={logo} style={imagestyle} className="App-logo" />
            polar
          </LogoButton>
        </Link>
        {AuthStore.getAccessToken() ? (
          AuthStore.getUserRole() === USER_ROLES.CADET ? (
            <div>{AlertDetail()}</div>
          ) : (
            <LoginButton
              onClick={() => {
                AuthStore.Logout();
              }}
            >
              로그아웃
            </LoginButton>
          )
        ) : (
          <LoginButton
            onClick={() => {
              AuthStore.Login();
            }}
          >
            로그인
          </LoginButton>
        )}
        {AuthStore.getUserRole() === USER_ROLES.CADET ? (
          <div>
            <a href={`${process.env.REACT_APP_BASE_FORM_URL}`} target="_blank">
              <SuggestionButton>건의사항</SuggestionButton>
            </a>
            <Link to="/cadets/mentorings">
              <MypageButton>마이페이지</MypageButton>
            </Link>
          </div>
        ) : AuthStore.getUserRole() === USER_ROLES.MENTOR ? (
          <div>
            <a href={`${process.env.REACT_APP_BASE_FORM_URL}`} target="_blank">
              <SuggestionButton>건의사항</SuggestionButton>
            </a>
            <Link to={mlinks}>
              <MyMentoringButton>나의 멘토링</MyMentoringButton>
            </Link>
            <Link to={mdlinks}>
              <MypageButton>마이페이지</MypageButton>
            </Link>
          </div>
        ) : AuthStore.getUserRole() === USER_ROLES.BOCAL ? (
          <div>
            <a href={`${process.env.REACT_APP_BASE_FORM_URL}`} target="_blank">
              <SuggestionButton>건의사항</SuggestionButton>
            </a>
            <Link to="/data-room">
              <DataRoomButton>데이터룸</DataRoomButton>
            </Link>
          </div>
        ) : (
          <div>
            <a href={`${process.env.REACT_APP_BASE_FORM_URL}`} target="_blank">
              <SuggestionButton>건의사항</SuggestionButton>
            </a>
          </div>
        )}
      </div>
    </HeaderStyle>
  );
};

export default Header;
