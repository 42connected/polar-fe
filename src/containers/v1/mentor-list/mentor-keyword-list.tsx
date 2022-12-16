import styled from '@emotion/styled';
import {
  KeywordButton,
  MentorKeyword,
} from '@/containers/v1/mentor-list/mentor-keyword';
import { useEffect, useState } from 'react';
import defaultTheme from '@/styles/theme';
import KeywordStore from '@/states/mentor-list/KeywordStore';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import MentorsStore from '@/states/mentor-list/MentorsStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const KeywordsLine = styled.div`
  display: grid;
  width: 80%;
  grid-template-columns: repeat(auto-fill, minmax(130px, 130px));
  justify-content: center;
`;

const MentorKeywordList = observer(() => {
  const { category } = useParams();
  const [isExpand, setIsExpand] = useState(true);

  useEffect(() => {
    if (category) {
      KeywordStore.Initializer(category);
    }
    return () => {
      KeywordStore.clear();
    };
  }, []);

  return (
    <Container>
      <KeywordsLine>
        <KeywordButton
          onClick={() => {
            KeywordStore.seletedClear(category);
            MentorsStore.Initializer(
              category,
              KeywordStore.getSelected(category),
              undefined,
            );
          }}
          color={defaultTheme.colors.polarBrightMain}
        >
          전체
        </KeywordButton>
        <KeywordButton
          onClick={() => {
            setIsExpand(!isExpand);
          }}
          color={defaultTheme.colors.polarBrightMain}
        >
          {isExpand ? '숨기기' : '펼치기'}
        </KeywordButton>
        {isExpand && (
          <>
            {KeywordStore?.keywords?.map((e, i) => (
              <MentorKeyword
                name={e}
                key={i}
                isClicked={KeywordStore.getSelected(category).indexOf(e) !== -1}
              />
            ))}
          </>
        )}
      </KeywordsLine>
    </Container>
  );
});

export default MentorKeywordList;
