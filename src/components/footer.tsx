import styled from 'styled-components';
import theme from '../styles/theme';
import github from '../assets/image/keywordIcon/develop.png';

const FooterStyle = styled.footer`
  position: relative;
  transform: translateY(0%);
  bottom: 0;
  width: 101%;
  height: 12rem;
  padding-top: 1rem;
  font-size: 1.3rem;
  ${theme.font.sebangGothic};
  color: ${theme.colors.backgoundWhite};
`;
const FooterBody = styled.footer`
  text-align: center;
`;
const FooterLastBody = styled.footer`
  text-align: center;
  padding-bottom: 3rem;
  margin-left: -2rem;
`;
const FooterLeftBody = styled.footer`
  padding-top: 3rem;
  margin-left: 4.5rem;
  text-align: left;
`;
const GithubButton = styled.button`
  cursor: pointer;
  float: center;
  margin-left: 7.5rem;
  margin-top: -2rem;
  background-color: transparent;
  color: ${theme.colors.backgoundWhite};
  border: none;
`;
const githubClick = () => {
  document.location.replace('https://github.com/42connected');
};
const imagestyle = {
  height: '2rem',
  width: '2rem',
};

const Footer = () => {
  return (
    <FooterStyle>
      <div
        className="footerplus"
        style={{
          background: theme.colors.polarMain,
        }}
      >
        <FooterLeftBody>
          42서울 Polar
          <GithubButton onClick={githubClick}>
            <img src={github} style={imagestyle} className="App-logo" />
          </GithubButton>
        </FooterLeftBody>
        <FooterBody>
          주소 서울시 강남구 개포로 416 이노베이션 아카데미
        </FooterBody>
        <FooterBody>문의 polarpolar@42seoul.co.kr</FooterBody>
        <FooterLastBody>
          copyright 2022 polar All rights reserved.
        </FooterLastBody>
      </div>
    </FooterStyle>
  );
};
export default Footer;
