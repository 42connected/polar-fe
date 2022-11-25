import styled from '@emotion/styled';
import {
  ReportElementRoot,
  Topic,
} from '@/containers/reports/elements/element-styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import defaultTheme from '@/styles/theme';

const FixableElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 95%;
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

export interface ReportFixableElementWithoutTopicProps {
  content: string | undefined;
  contentSetter: (s: string) => void;
  isEditPossible: boolean;
  maxLength: number;
}

export function ReportFixableElementWithoutTopic(
  props: ReportFixableElementWithoutTopicProps,
) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <ReportElementRoot>
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
            {props.isEditPossible ? (
              <>
                <Content
                  style={{
                    color: props.content || defaultTheme.colors.polarSimpleMain,
                    fontWeight: props.content || 'bold',
                  }}
                >
                  {props.content
                    ? props.content
                    : '(카뎃이 한 명 이상인 경우, 왼쪽과 같이 추가할 카뎃을 적어주세요.)'}
                </Content>
                <FixableIcon
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} size="2x" />
                </FixableIcon>
              </>
            ) : (
              props.content && (
                <Content
                  style={{
                    color: props.content || defaultTheme.colors.polarSimpleMain,
                    fontWeight: props.content || 'bold',
                  }}
                >
                  {props.content}
                </Content>
              )
            )}
          </>
        )}
      </FixableElement>
    </ReportElementRoot>
  );
}
