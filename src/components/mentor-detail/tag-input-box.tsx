import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface TagInputBoxProps {
  setter: Dispatch<SetStateAction<string[]>>;
}

function TagInputBoxComponent(props: TagInputBoxProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTag = event.target;
    props.setter(oldTags => [...oldTags, newTag]);
  };

  return (
    <TagInputBox>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">추가</button>
      </form>
    </TagInputBox>
  );
}

const TagInputBox = styled.div`
  display: flex;
`;
export default TagInputBoxComponent;
