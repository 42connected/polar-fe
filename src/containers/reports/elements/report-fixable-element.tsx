import styled from '@emotion/styled';
import { ReportElementRoot, Topic } from './element-styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import defaultTheme from '../../../styles/theme';

const FixableElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 60%;
`;

const Content = styled.div`
  text-align: left;
  width: 100%;
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
`;

const FixableIcon = styled.div`
  display: flex;
  margin: 0px 5px;
  &:hover {
    color: gray;
  }
  cursor: pointer;
`;

const EditContentInput = styled.input`
  width: 100%;
  background-color: #f6f6f6;
  border-radius: 5px;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  vertical-align: top;
  resize: none;
  &:focus {
    outline: none;
  }
`;

export interface ReportFixableElementProps {
  topic: string;
  content: string | undefined;
  contentSetter: (s: string) => void;
  isEditPossible: boolean;
  maxLength: number;
}

export function ReportFixableElement(props: ReportFixableElementProps) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <ReportElementRoot>
      <Topic>{props.topic}</Topic>
      <FixableElement>
        {isEdit ? (
          <>
            <EditContentInput
              onChange={e => {
                props.contentSetter(e.target.value);
              }}
              value={props.content || ''}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setIsEdit(false);
                }
              }}
              maxLength={props.maxLength}
            />
            <FixableIcon
              onClick={() => {
                setIsEdit(false);
              }}
            >
              <FontAwesomeIcon icon={faCheck} size="2x" />
            </FixableIcon>
          </>
        ) : (
          <>
            <Content>{props.content ? props.content : '(입력 필요)'}</Content>
            {props.isEditPossible && (
              <FixableIcon
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                <FontAwesomeIcon icon={faPencil} size="2x" />
              </FixableIcon>
            )}
          </>
        )}
      </FixableElement>
    </ReportElementRoot>
  );
}
