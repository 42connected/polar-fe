import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface TagInputBoxProps {
  setter: Dispatch<SetStateAction<string[]>>;
  value: string[];
}

function TagInputBoxComponent(props: TagInputBoxProps) {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const newTag = event.target[0].value;

    if (newTag.length > 0 && !props.value.includes(newTag)) {
      if (JSON.stringify(props.value).length + newTag.length > 140) {
        alert('더이상 tag를 추가할 수 없습니다.');
      } else {
        props.setter(oldTags => [...oldTags, newTag]);
      }
    }
    event.target[0].value = '';
  };

  return (
    <TagInputBox>
      <FormBox onSubmit={handleSubmit}>
        <FormBoxInput type="text" />
        <FomrBoxSubmit type="submit">추가</FomrBoxSubmit>
      </FormBox>
    </TagInputBox>
  );
}

const TagInputBox = styled.div``;

const FormBox = styled.form`
  position: relative;
  display: flex;
`;

const FormBoxInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  :focus {
    outline: none;
  }
  width: 100%;
  height: 2rem;
  padding: 0.5rem 7%;
  border: 1px solid ${theme.colors.fontGray};
  border-radius: 20px;
  margin: 0.5rem;
`;

const FomrBoxSubmit = styled.button`
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: 20px;
  position: absolute;
  word-break: keep-all;
  right: 1rem;
  top: 30%;
  cursor: pointer;
  color: ${theme.colors.blackThree};
`;
export default TagInputBoxComponent;
