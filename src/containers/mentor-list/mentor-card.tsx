import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import defaultTheme from '../../styles/theme';
import defaultProfile from '../../assets/image/defaultProfileImage.png';
import { sliceMoreInfoStr } from '../my-mentoring-mentor/email';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const ActiveDot = styled.div`
  position: absolute;
  display: flex;
  top: 1rem;
  right: 1rem;
  border-radius: 100%;
  width: 1.2rem;
  height: 1.2rem;
  opacity: 0.3;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 70%;
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
  font-weight: bold;
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
  word-break: break-all;
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
  height: 55px;
  color: #ffffff;
  width: 70%;
  justify-content: center;
  &:hover {
    opacity: 0.8;
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  font-weight: bold;
  cursor: pointer;
`;

export interface CardProps {
  name: string;
  intraId: string;
  tags: string[] | null;
  profileImage: string;
  introduction: string;
  isActive: boolean;
}

export function MentorCard(props: CardProps) {
  return (
    <Container>
      <ActiveDot
        style={{ backgroundColor: props.isActive ? 'green' : 'red' }}
      />
      <InfoContainer>
        <ProfileImg
          src={props.profileImage ? props.profileImage : defaultProfile}
        />
        <ProfileRight>
          <ProfileName>{props.name} 멘토</ProfileName>
          {props.tags ? (
            props?.tags?.map((e, i) => {
              if (i < 3) {
                return <ProfileTag key={i}>#{e.slice(0, 5)}</ProfileTag>;
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
        {props.introduction
          ? `${sliceMoreInfoStr(props.introduction, 100)}`
          : '프로필을 작성중입니다. ✍🏼'}
      </Introduce>
      <ButtonWrapper to={'/mentor-detail/' + props.intraId}>
        <Button
          style={{ backgroundColor: defaultTheme.colors.polarBrightMain }}
        >
          자세히 보기
        </Button>
      </ButtonWrapper>
    </Container>
  );
}
