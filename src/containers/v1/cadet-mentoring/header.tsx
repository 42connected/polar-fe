import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultTheme from '@/styles/theme';
import {
  faCheck,
  faLink,
  faPencil,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import {
  axiosWithData,
  AXIOS_METHOD_WITH_DATA,
} from '@/context/axios-interface';
import { ResumeProps } from '@/interfaces/v1/cadet-mentoring/resume-props.interface';
import AuthStore from '@/states/auth/AuthStore';

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

const DoubleButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40px;
`;

const MentorName = styled.div`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeExtraMedium};
  margin-bottom: 5px;
`;

export function Header(props: ResumeProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const save = () => {
    const { url: resumeUrl } = props;
    try {
      axiosWithData(
        AXIOS_METHOD_WITH_DATA.POST,
        '/cadets',
        { resumeUrl },
        {
          headers: {
            Authorization: `Bearer ${AuthStore.getAccessToken()}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
      return err;
    }
    setIsEdit(!isEdit);
  };

  return (
    <Container>
      <MentorName>{AuthStore.getUserIntraId()}의 멘토링</MentorName>
      <Resume>
        <span>이력서</span>
        <TextInput
          className="resumeUrl"
          value={props.url}
          placeholder="📝 이력서 URL을 넣어주세요"
          disabled={!isEdit}
          onChange={e => {
            props.setUrl(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              save();
              setIsEdit(!isEdit);
            }
          }}
        />
        {isEdit ? (
          <DoubleButton>
            <FontAwesomeIcon
              icon={faX}
              onClick={() => {
                setIsEdit(!isEdit);
              }}
              style={{ cursor: 'pointer' }}
            />
            <FontAwesomeIcon
              icon={faCheck}
              style={{ cursor: 'pointer' }}
              onClick={() => save()}
            />
          </DoubleButton>
        ) : (
          <DoubleButton>
            <FontAwesomeIcon
              icon={faPencil}
              style={{ cursor: 'pointer' }}
              onClick={() => setIsEdit(!isEdit)}
            />
            {props.url && (
              <FontAwesomeIcon
                icon={faLink}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  window.open(props.url);
                }}
              />
            )}
          </DoubleButton>
        )}
      </Resume>
    </Container>
  );
}
