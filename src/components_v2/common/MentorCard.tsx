import { Link } from 'react-router-dom';
import styled from 'styled-components';
import defaultTheme from '../../../styles/themeV2';
import Button from './Button';

interface mentorCardProps {
  name: string;
  intraId: string;
  tags: string[] | null;
  profileImage: string | null;
  introduction: string | null;
  isActive: boolean;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 27rem;
  height: 33rem;
  padding: 1rem;
  box-shadow: ${defaultTheme.shadow.defaultShadow};
  border-radius: 1rem;
  color: black;
`;
const ActiveDot = styled.div<{ isActive: boolean }>`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeSmall};
  justify-content: right;
  color: ${props =>
    props.isActive
      ? `${defaultTheme.colors.green}`
      : `${defaultTheme.colors.red}`};
`;
const Dot = styled.div<{ isActive: boolean }>`
  border-radius: 100%;
  width: 1rem;
  height: 1rem;
  background-color: ${props =>
    props.isActive
      ? `${defaultTheme.colors.green}`
      : `${defaultTheme.colors.red}`};
  margin: 0 0.5rem;
`;
const NameWrapper = styled.div`
  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeLarge};
  margin-bottom: 0.5rem;
`;
const IntraIdWrapper = styled.div`
  font-family: ${defaultTheme.font.nanumGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeMedium};
  margin-bottom: 0.5rem;
`;
const TagsContainer = styled.div`
  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeSmall};
  color: ${defaultTheme.colors.darkGray};
`;
const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  text-align: left;
  margin-left: 2rem;
`;
const ImgWrapper = styled.div`
  width: 9rem;
  height: 9rem;
  background-color: ${defaultTheme.colors.middleGray};
  border-radius: 100%;
  overflow: hidden;
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const IntroWrapper = styled.div`
  display: flex;
  height: 10rem;
  align-items: center;
  text-align: center;
  margin: 2rem;
`;

const ButtonWrapper = styled.div`
  width: 14rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const MentorDetailLink = styled(Link)`
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: white;
  text-align: center;
`;

function MentorCard({
  name,
  intraId,
  tags,
  profileImage,
  introduction,
  isActive,
}: mentorCardProps) {
  const sliceStr = (str: string, maxLength: number) => {
    if (str.length > maxLength) return `${str.slice(0, maxLength)}...`;
    return str;
  };
  return (
    <Container>
      <ActiveDot isActive={isActive}>
        {isActive ? '가능' : '불가능'}
        <Dot isActive={isActive} />
      </ActiveDot>
      <InfoContainer>
        <ImgWrapper>{profileImage && <Img src={profileImage} />}</ImgWrapper>
        <InfoText>
          <NameWrapper>{name} 멘토</NameWrapper>
          <IntraIdWrapper>{intraId}</IntraIdWrapper>
          <TagsContainer>
            {tags &&
              tags
                .filter((_, i) => i <= 3)
                .map((e, i) => {
                  if (i >= 3) return <div>....</div>;
                  return <div key={tags[i]}>#{sliceStr(e, 6)}</div>;
                })}
          </TagsContainer>
        </InfoText>
      </InfoContainer>
      <IntroWrapper>
        {introduction != null
          ? sliceStr(introduction, 100)
          : '프로필을 작성중입니다.'}
      </IntroWrapper>
      <ButtonWrapper>
        <MentorDetailLink to={`/mentor-detail/${intraId}`}>
          <Button
            type="button"
            size="large"
            bgColor={defaultTheme.colors.brightBlue}
            fullWidth
          >
            자세히 보기
          </Button>
        </MentorDetailLink>
      </ButtonWrapper>
    </Container>
  );
}

export default MentorCard;
