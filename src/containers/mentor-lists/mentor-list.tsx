import { Container } from '@mui/material';
import styled from '@emotion/styled';
import defaultTheme from '../../styles/theme';
import { MentorCard } from './mentor-card';
import { useParams } from 'react-router-dom';
import MentorKeywordList from './mentor-keyword-list';
import MentorStore from '../../states/mentor-list/MentorStore';
import KeywordStore from '../../states/mentor-list/KeywordStore';
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
`;

const Title = styled.div`
  ${defaultTheme.fontSize.sizeExtraMedium};
  ${defaultTheme.font.sebangGothic};
  display: flex;
  justify-content: center;
  padding: 20px 0px 20px 30px;
  margin: 50px 0px;
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

const Text = styled.div`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
`;

const TextContainer = styled.div`
  display: flex;
  width: 50%;
`;

const SearchBox = styled.input`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeSmall};
  background-color: red;
  border-radius: 30px;
  width: 30%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
  text-decoration: none;
  background-color: #ffffff;
  color: black;
  padding: 10px 15px 10px 15px;
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

const CardContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;

const MentorList = observer(() => {
  const { category } = useParams<string>();
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    MentorStore.MentorsInitializer(category, [], search);
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
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
                  {MentorStore.mentorsList.mentors.length}{' '}
                </Text>
                <Text>명의 멘토님이 기다립니다.</Text>
              </TextContainer>
              <Search>
                <SearchBox
                  placeholder={'멘토 이름, 멘토 인트라 아이디'}
                  onChange={e => {
                    setSearch(e.target.value);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      MentorStore.clear();
                      MentorStore.MentorsInitializer(
                        category,
                        KeywordStore.selected,
                        search,
                      );
                    }
                  }}
                />
              </Search>
            </SearchContainer>
            <CardContainer>
              {MentorStore?.mentorsList?.mentors?.map((e, i) => {
                return (
                  <MentorCard
                    key={i}
                    name={e.mentor.name}
                    tags={e.mentor.tags}
                    profileImage={e.mentor.profileImage}
                    introduction={e.mentor.introduction}
                    intraId={e.mentor.intraId}
                  />
                );
              })}
            </CardContainer>
          </Container>
        </NoneDrag>
      )}
    </>
  );
});

export default MentorList;
