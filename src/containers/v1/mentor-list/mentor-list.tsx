import { Container } from '@mui/material';
import styled from '@emotion/styled';
import defaultTheme from '@/styles/theme';
import { MentorCard } from '@/containers/v1/mentor-list/mentor-card';
import { useParams } from 'react-router-dom';
import MentorKeywordList from '@/containers/v1/mentor-list/mentor-keyword-list';
import MentorsStore from '@/states/mentor-list/MentorsStore';
import KeywordStore from '@/states/mentor-list/KeywordStore';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

const NoneDrag = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-bottom: 4rem;
`;

const Title = styled.div`
  ${defaultTheme.fontSize.sizeExtraMedium};
  ${defaultTheme.font.sebangGothic};
  display: flex;
  justify-content: center;
  padding: 20px 0px;
  margin: 50px 0px;
  font-weight: bold;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const KeywordsBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 3% 0px;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const Text = styled.div`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  font-weight: bold;
  @media screen and (max-width: 500px) {
    ${defaultTheme.fontSize.sizeSmall};
  }
`;

const TextContainer = styled.div`
  display: flex;
`;

const SearchBox = styled.input`
  display: flex;
  justify-content: right;
  align-items: center;
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeSmall};
  border-radius: 30px;
  width: 15rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
  text-decoration: none;
  background-color: #ffffff;
  color: black;
  padding: 10px 15px 10px 15px;
  &:hover {
    background-color: #f6f6f6;
  }
  @media screen and (max-width: 500px) {
    font-size: 1rem;
    width: 10rem;
  }
`;

const CardContainer = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(350px, 350px));
  gap: 4rem;
`;

const MentorList = observer(() => {
  const { category } = useParams<string>();
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    MentorsStore.Initializer(
      category,
      KeywordStore.getSelected(category),
      search,
    );
  }, []);

  return (
    <NoneDrag>
      <Container component="main" maxWidth="lg">
        <Title>{category}</Title>
        <KeywordsBox>
          <MentorKeywordList />
        </KeywordsBox>
        <Divider />
        <SearchContainer>
          <TextContainer>
            <Text style={{ color: defaultTheme.colors.polarSimpleMain }}>
              {MentorsStore.mentorsList.mentors.length}{' '}
            </Text>
            <Text>명의 멘토님이 기다립니다.</Text>
          </TextContainer>
          <SearchBox
            placeholder={'이름, 인트라 아이디'}
            onChange={e => {
              setSearch(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                MentorsStore.clear();
                MentorsStore.Initializer(
                  category,
                  KeywordStore.getSelected(category),
                  search,
                );
              }
            }}
          />
        </SearchContainer>
        <CardContainer>
          {MentorsStore?.mentorsList?.mentors?.map((e, i) => {
            return (
              <MentorCard
                key={i}
                name={e.mentor.name}
                tags={e.mentor.tags}
                profileImage={e.mentor.profileImage}
                introduction={e.mentor.introduction}
                intraId={e.mentor.intraId}
                isActive={e.mentor.isActive}
              />
            );
          })}
        </CardContainer>
      </Container>
    </NoneDrag>
  );
});

export default MentorList;
