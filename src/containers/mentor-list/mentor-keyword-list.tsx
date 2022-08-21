import styled from '@emotion/styled';
import { MentorKeyword } from './mentor-keyword';
import { useMemo, useState } from 'react';
import defaultTheme from '../../styles/theme';

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
  ${defaultTheme.fontSize.sizeSmall};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 30px;
  width: 100px;
  height: 40px;
  margin: 10px 0px;
  border-radius: 30px;
  border: none;
  text-align: center;
  text-decoration: none;
  background-color: #313c7a;
  color: #ffffff;
  &:hover {
    opacity: 0.8;
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

export function MentorKeywordList() {
  const test: string[] = [
    '커피',
    '취업',
    '취업',
    '취업',
    '취업',
    '취업',
    '취업',
    '취업',
    '취업',
    '취업',
  ];

  const defaultCategories = useMemo(() => {
    return test.slice(0, 3);
  }, [test]);

  const expandCategories = useMemo(() => {
    return test.slice(3, test.length - 1);
  }, [test]);

  const [isExpand, setIsExpand] = useState(false);
  return (
    <Container>
      <KeywordsLine>
        <Button>전체</Button>
        {defaultCategories.map((e, i) => (
          <MentorKeyword name={e} index={i + 1} />
        ))}
        <Button
          onClick={() => {
            setIsExpand(!isExpand);
          }}
        >
          더보기
        </Button>
      </KeywordsLine>
      {isExpand ? (
        <KeywordsLine>
          {expandCategories.map((e, i) => (
            <MentorKeyword name={e} index={i + 1} />
          ))}
        </KeywordsLine>
      ) : (
        <></>
      )}
    </Container>
  );
}
