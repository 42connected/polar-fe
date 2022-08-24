import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import defaultTheme from '../../styles/theme';
import defaultProfile from '../../assets/image/defaultProfileImage.png';

const Container = styled.div`
  display: flex;
  width: 80%;
  height: 300px;
  flex-direction: column;
  align-items: center;
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
  justify-content: center;
`;

const ProfileImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 100%;
  margin-right: 20px;
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
  display: flex;
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeSmall};
  width: 70%;
  height: 100px;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 30px 0px;
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
  height: 55px;
  color: #ffffff;
  padding: 7% 20%;
  &:hover {
    opacity: 0.8;
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const ProfileLink = styled(Link)`
  display: flex;
  justify-content: center;
  width: 100%;
  text-decoration: none;
`;

export interface CardProps {
  name: string;
  intraId: string;
  tags: string[] | null;
  profileImage: string;
  introduction: string;
}

export function MentorCard(props: CardProps) {
  return (
    <Container>
      <InfoContainer>
        <ProfileImg
          src={props.profileImage ? props.profileImage : defaultProfile}
        />
        <ProfileRight>
          <ProfileName>{props.name} 멘토</ProfileName>
          {props.tags ? (
            props?.tags?.map((e, i) => {
              if (i < 3) {
                return <ProfileTag key={i}>#{e}</ProfileTag>;
              }
              if (i === 3) {
                return <ProfileTag key={i}>....</ProfileTag>;
              }
            })
          ) : (
            <></>
          )}
        </ProfileRight>
      </InfoContainer>
      <Introduce>
        {props.introduction ? props.introduction : '프로필을 작성중입니다. ✍🏼'}
      </Introduce>
      <ProfileLink to={'/mentor-detail/' + props.intraId}>
        <Button
          style={{ backgroundColor: defaultTheme.colors.polarBrightMain }}
        >
          자세히 보기
        </Button>
      </ProfileLink>
    </Container>
  );
}
