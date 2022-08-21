import { Container } from '@mui/material';
import styled from '@emotion/styled';
import { useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultTheme from '../../styles/theme';
import { MentorCard } from './mentor-card';
import { useParams } from 'react-router-dom';
import { MentorKeywordList } from './mentor-keyword-list';

const Title = styled.div`
  ${defaultTheme.fontSize.sizeExtraMedium};
  ${defaultTheme.font.sebangGothic};
  display: flex;
  justify-content: center;
  /*padding: 20px 0px 20px 30px;
  margin: 50px 0px;*/
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const KeywordsBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 3%;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.text`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
`;

const TextContainer = styled.div`
  width: 50%;
`;

const SearchBox = styled.input`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeSmall};
  background-color: red;
  border-radius: 30px;
  width: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
  text-decoration: none;
  background-color: #ffffff;
  color: black;
  padding: 10px 65px 10px 15px;
  margin-top: 10px;
  &:hover {
    background-color: #f6f6f6;
  }
`;

const Search = styled.div`
  display: flex;
  width: 50%;
  justify-content: right;
  margin: auto;
`;

const FixableIcon = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 5px 0px -30px;
  &:hover {
    color: gray;
  }
`;

const CardContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;

export function MentorList() {
  const { category } = useParams();
  const [mentors, setMentors] = useState([]);

  return (
    <Container component="main" maxWidth="md">
      <Title>{category}</Title>
      <KeywordsBox>
        <MentorKeywordList />
      </KeywordsBox>
      <Divider />
      <SearchContainer>
        <TextContainer>
          <Text style={{ color: defaultTheme.colors.polarSimpleMain }}>
            {mentors.length}{' '}
          </Text>
          <Text>명의 멘토님이 기다립니다.</Text>
        </TextContainer>
        <Search>
          <SearchBox placeholder={'멘토 이름, 멘토 인트라 아이디'} />
          <FixableIcon>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </FixableIcon>
        </Search>
      </SearchContainer>
      <CardContainer>
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
      </CardContainer>
    </Container>
  );
}
