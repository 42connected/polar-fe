import styled from '@emotion/styled';
import { MentorKeyword } from './mentor-keyword';
import { useEffect, useState } from 'react';
import defaultTheme from '../../styles/theme';
import KeywordStore from '../../states/mentor-list/KeywordStore';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import MentorsStore from '../../states/mentor-list/MentorsStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const KeywordsLine = styled.div`
  display: grid;
  width: 80%;
  grid-template-columns: repeat(5, 1fr);
`;

const Button = styled.button`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 30px;
  width: 120px;
  height: 50px;
  margin: 10px 0px;
  border-radius: 30px;
  border: none;
  text-align: center;
  text-decoration: none;
  background-color: ${defaultTheme.colors.polarSimpleMain};
  color: #ffffff;
  &:hover {
    opacity: 0.8;
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const MentorKeywordList = observer(() => {
  const { category } = useParams();
  const [isExpand, setIsExpand] = useState(false);

  useEffect(() => {
    if (category) {
      KeywordStore.keywordsInitializer(category);
    }
  }, []);

  return (
    <Container>
      <KeywordsLine>
        <Button
          onClick={() => {
            KeywordStore.seletedClear();
            MentorsStore.MentorsInitializer(
              category,
              KeywordStore.selected,
              undefined,
            );
          }}
        >
          전체
        </Button>
        {KeywordStore?.keywords?.slice(0, 3)?.map((e, i) => (
          <MentorKeyword
            name={e.keyword}
            key={i}
            isClicked={KeywordStore.selected.indexOf(e.keyword) !== -1}
          />
        ))}
        {KeywordStore.keywords.length > 3 ? (
          <Button
            onClick={() => {
              setIsExpand(!isExpand);
            }}
          >
            더보기
          </Button>
        ) : (
          <></>
        )}
      </KeywordsLine>
      {isExpand ? (
        <KeywordsLine>
          {KeywordStore?.keywords
            ?.slice(3, KeywordStore.keywords.length)
            ?.map((e, i) => (
              <MentorKeyword
                name={e.keyword}
                key={i + 3}
                isClicked={KeywordStore.selected.indexOf(e.keyword) !== -1}
              />
            ))}
        </KeywordsLine>
      ) : (
        <></>
      )}
    </Container>
  );
});

export default MentorKeywordList;
