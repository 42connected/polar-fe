import styled from 'styled-components';
import theme from '../styles/theme';
import github from '../assets/image/keywordIcon/develop.png';

const FooterStyle = styled.footer`
  position: relative;
  bottom: 0;
  width: 100%;
  height: 12rem;
  font-size: 1.3rem;
  ${theme.font.sebangGothic};
  color: ${theme.colors.backgoundWhite};
`;
const FooterBody = styled.footer`
  text-align: center;
  ${theme.fontWeight.weightSmall};
`;
const FooterLastBody = styled.div`
  width: 100%;
  text-align: center;
  padding-bottom: 3rem;
`;
const FooterTextBody = styled.div`
  padding-top: 2.5rem;
`;
const FooterRightBody = styled.span`
  float: right;
  margin-right: 3%;
  cursor: pointer;
  display: inline-block;
`;
const FooterButtonOne = styled.span`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const FooterButtonTwo = styled.span`
  margin-left: 2rem;
  background-color: transparent;
  border: none;
  color: ${theme.colors.backgoundWhite};
  cursor: pointer;
`;
const FooterLeftBody = styled.span`
  float: left;
  margin-left: 3%;
`;

const GithubButton = styled.span`
  cursor: pointer;
  float: center;
  margin-left: 1rem;
  align-items: center;
  align-content: center;
  background-color: transparent;
  color: ${theme.colors.backgoundWhite};
  border: none;
`;

const Atag = styled.a`
  font-weight: bold;
  text-decoration: none;
  color: ${theme.colors.backgoundWhite};
`;

const AtagTwo = styled.a`
  text-decoration: none;
  color: ${theme.colors.backgoundWhite};
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
          background: theme.colors.polarSimpleMain,
        }}
      >
        <FooterTextBody>
          <FooterLeftBody>42서울 Polar</FooterLeftBody>
          <GithubButton></GithubButton>
          <FooterRightBody>
            <FooterButtonOne>
              <AtagTwo href="https://docs.google.com/forms/d/e/1FAIpQLSeNhqMlp2cFqMKQo664P0j_GiELhy_VNDSIClFenQJ3uoPa2Q/viewform?usp=send_form">
                서비스 건의사항
              </AtagTwo>
            </FooterButtonOne>
            <FooterButtonTwo>
              <AtagTwo href="https://docs.google.com/forms/d/e/1FAIpQLSe7CJGFRImjU0NAtPwjWdjTz9-Chttx1gDf1rpvBZIhaUQ34A/viewform">
                멘토제도 건의사항
              </AtagTwo>
            </FooterButtonTwo>
          </FooterRightBody>
        </FooterTextBody>
        <FooterBody>
          주소 서울시 강남구 개포로 416 이노베이션 아카데미
        </FooterBody>
        <FooterBody>문의 42polar@gmail.com</FooterBody>
        <FooterLastBody>
          copyright 2022 polar All rights reserved.
        </FooterLastBody>
      </div>
    </FooterStyle>
  );
};
export default Footer;
