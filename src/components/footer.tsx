import styled from 'styled-components';
import theme from '../styles/theme';

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 9rem;
  color: white;
  background-color: ${theme.colors.polarSimpleMain};
  font-size: 0.9rem;
  ${theme.fontWeight.weightLarge};
  justify-content: center;
  text-align: center;
  position: relative;
  bottom: 0;
  line-height: 120%;
`;

const A = styled.a`
  text-decoration: none;
  color: white;
`;
const FooterDiv = styled.div`
${theme.font.sebangGothic};
  display: flex;
  justify-content: space-between;
  padding: 0 3% 1.8rem 3%;
  ${theme.fontWeight.weightLarge};
`;
const Adiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Footer = () => {
  const serviceLink =
    'https://docs.google.com/forms/d/e/1FAIpQLSeNhqMlp2cFqMKQo664P0j_GiELhy_VNDSIClFenQJ3uoPa2Q/viewform?usp=send_form';
  const mentorLink =
    'https://docs.google.com/forms/d/e/1FAIpQLSe7CJGFRImjU0NAtPwjWdjTz9-Chttx1gDf1rpvBZIhaUQ34A/viewform';
  return (
      <Container>
        <FooterDiv>
          42Polar by Cadets
          <Adiv>
            <A href={serviceLink} target="_blank">
              사이트 건의사항
            </A>
            <A href={mentorLink} target="_blank">
              멘토제도 문의(SongPD)
            </A>
          </Adiv>
        </FooterDiv>
        <div>
          <div>주소 서울시 강남구 개포로 416 이노베이션 아카데미 문의</div>
          <div>copyright 2022 polar All rights reserved.</div>
          <div>폴라팀에게 문의하기 : 42polar@gmail.com</div>
        </div>
      </Container>
  );
};
export default Footer;
