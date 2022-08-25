import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultTheme from '../../styles/theme';
import { faCheck, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
  padding: 40px 0 20px 0;
  margin-bottom: 10px;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${defaultTheme.colors.polarGray};
`;

const Resume = styled.div`
  display: flex;
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeSmall};
  margin-top: 15px;
  align-items: center;
`;

const TextInput = styled.input`
  padding: 5px 10px;
  margin: 0px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  border: none;
  ${defaultTheme.fontSize.sizeSmall};
  ${defaultTheme.font.nanumGothic};
  overflow: hidden;
  width: 200px;
  text-overflow: ellipsis;
`;

const MentorName = styled.div`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeExtraMedium};
  margin-bottom: 5px;
`;

export interface ResumeProps {
  url: string;
}

export function Header(props: ResumeProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const save = () => {
    console.log('click');
    setIsEdit(!isEdit);
  };

  return (
    <Container>
      <MentorName>nakkim의 멘토링</MentorName>
      <Resume>
        <span>이력서</span>
        <TextInput
          value={props.url}
          disabled={!isEdit}
          onChange={e => {
            // setEmail(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              //   authenticate();
            }
          }}
        />
        {isEdit ? (
          <FontAwesomeIcon icon={faCheck} onClick={() => save()} />
        ) : (
          <FontAwesomeIcon icon={faPencil} onClick={() => setIsEdit(!isEdit)} />
        )}
      </Resume>
    </Container>
  );
}
