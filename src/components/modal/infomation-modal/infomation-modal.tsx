import styled from '@emotion/styled';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sliceMoreInfoStr } from '../../../containers/my-mentoring-mentor/email';
import defaultTheme from '../../../styles/theme';
import {
  ModalBackground,
  ModalBox,
  ModalButton,
  ModalButtonContainer,
  ModalTitle,
  XButton,
} from '../modal-styled';

interface InfomationModalProps {
  TitleText: string;
  Text: string;
  XButtonFunc: () => void;
  ButtonText: string;
  ButtonBg: string;
  ButtonFunc: () => void;
}

export const ModalInfoBody = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 20px 5px;
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeSmall};
  word-break: break-all;
  white-space: pre-wrap;
`;

export function InfomationModal(props: InfomationModalProps) {
  return (
    <ModalBackground>
      <ModalBox>
        <XButton>
          <ModalTitle>{props.TitleText}</ModalTitle>
          <FontAwesomeIcon
            icon={faX}
            size="2x"
            style={{ opacity: 0.3, cursor: 'pointer' }}
            onClick={() => props.XButtonFunc()}
          />
        </XButton>
        <ModalInfoBody>{sliceMoreInfoStr(props.Text, 500)}</ModalInfoBody>
        <ModalButtonContainer>
          <ModalButton
            onClick={props.ButtonFunc}
            style={{ backgroundColor: props.ButtonBg }}
          >
            {sliceMoreInfoStr(props.ButtonText, 6)}
          </ModalButton>
        </ModalButtonContainer>
      </ModalBox>
    </ModalBackground>
  );
}
