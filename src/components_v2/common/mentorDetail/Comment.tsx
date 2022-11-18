import React from 'react';
import styled from 'styled-components';
import defaultTheme from '../../../styles/themeV2';

interface CommentProps {
  intraName: string;
  commentData: string;
  createdAt: string;
  propfileImg: string | null;
  children: React.ReactNode;
}

const Container = styled.div`
  width: 100%;
  margin-top: 5%;
  display: flex;
  flex-direction: row;
  flex-basis: 5rem;
`;

const ImgStyles = styled.div<{ img: string | null }>`
  min-width: 5rem;
  min-height: 5rem;
  border-radius: 100%;
  margin-right: 0.5rem;
  background-color: ${defaultTheme.colors.middleGray};
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  background-position: center center fixed;
  background-size: cover;
`;

const TextContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
  font-size: ${defaultTheme.mobileFontSize.sizeMedium};
  font-weight: ${defaultTheme.fontWeight.weightRegular};
  font-family: ${defaultTheme.font.nanumGothic};
  color: black;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 1;
  flex-shrink: 2;
`;

const InfoContainer = styled.div`
  display: flex;
`;

const NameStyles = styled.div`
  font-family: ${defaultTheme.font.sebangGothic};
  margin-right: 0.5rem;
`;

const DateStyles = styled.div`
  font-size: ${defaultTheme.mobileFontSize.sizeSmall};
`;

const ContentStyles = styled.div`
  margin-top: 0.5rem;
  text-align: left;
`;

export default function Comment({
  intraName,
  commentData,
  createdAt,
  propfileImg,
  children,
}: CommentProps) {
  return (
    <div>
      <Container>
        <ImgStyles img={propfileImg} />
        <TextContainer>
          <InfoContainer>
            <NameStyles>{intraName}</NameStyles>
            {children}
            <DateStyles>{createdAt}</DateStyles>
          </InfoContainer>
          <ContentStyles>{commentData}</ContentStyles>
        </TextContainer>
      </Container>
    </div>
  );
}
