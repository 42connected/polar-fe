import styled from '@emotion/styled';
import { ReportElementRoot, Topic } from './element-styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
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

export interface ReportFixableWithModalProps {
  topic: string;
  content: string | undefined;
  modalSetter: (b: boolean) => void;
  isEditPossible: boolean;
}

export function ReportFixableWithModal(props: ReportFixableWithModalProps) {
  return (
    <ReportElementRoot>
      <Topic>{props.topic}</Topic>
      <FixableElement>
        <Content
          style={{
            color: props.content || defaultTheme.colors.polarSimpleMain,
            fontWeight: props.content || 'bold',
          }}
        >
          {props.content ? props.content : '(입력 필요)'}
        </Content>
        {props.isEditPossible && (
          <FixableIcon
            onClick={() => {
              props.modalSetter(true);
            }}
          >
            <FontAwesomeIcon icon={faPencil} size="2x" />
          </FixableIcon>
        )}
      </FixableElement>
    </ReportElementRoot>
  );
}
