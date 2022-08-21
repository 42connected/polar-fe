import styled from '@emotion/styled';
import defaultTheme from '../../styles/theme';

const Container = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 25px;
  padding: 30px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const ProfileImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 100%;
`;

const ProfileRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.div`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  margin-bottom: 5px;
`;

const ProfileTag = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeSmall};
  color: rgba(0, 0, 0, 0.5);
`;

const Introduce = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeSmall};
  width: 70%;
  margin: 20px 0px;
`;

const Button = styled.button`
  ${defaultTheme.fontSize.sizeSmall};
  ${defaultTheme.font.sebangGothic};
  border-radius: 5px;
  border: none;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  padding: 7% 20%;
  &:hover {
    opacity: 0.8;
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

export function MentorCard() {
  const tag = [
    'Backend',
    'SW Architecture',
    '점심 뭐먹지',
    '아무거나 먹자',
    '하나 더',
  ];

  return (
    <Container>
      <InfoContainer>
        <ProfileImg src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fca.slack-edge.com%2FT039P7U66-U03DU1UN0P3-gc9a7b67d9c4-512"></ProfileImg>
        <ProfileRight>
          <ProfileName>정경호 멘토</ProfileName>
          {tag.map((e, i) => {
            if (i < 3) {
              return <ProfileTag key={i}>#{e}</ProfileTag>;
            }
            if (i === 3) {
              return <ProfileTag key={i}>....</ProfileTag>;
            }
          })}
        </ProfileRight>
      </InfoContainer>
      <Introduce>
        현재 삼성전자에서 S/W Architect와 Expert Programmer로 활동중이며, 코딩
        하는 걸 즐기는 개발자 입니다.
      </Introduce>
      <Button style={{ backgroundColor: defaultTheme.colors.polarBrightMain }}>
        자세히 보기
      </Button>
    </Container>
  );
}
