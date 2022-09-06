import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sliceMoreInfoStr } from '../../../containers/my-mentoring-mentor/email';
import {
  ModalBackground,
  ModalBody,
  ModalBox,
  ModalButton,
  ModalButtonContainer,
  ModalTitle,
  XButton,
} from '../modal-styled';
import theme from '../../../styles/theme';

export interface OneButtonModalProps {
  TitleText: string;
  Text: string;
  XButtonFunc: () => any;
  ButtonText: string;
  ButtonBg?: string;
  ButtonFunc: () => any;
}

export function OneButtonModal(props: OneButtonModalProps) {
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
        <ModalBody>{sliceMoreInfoStr(props.Text, 120)}</ModalBody>
        <ModalButtonContainer>
          <ModalButton
            onClick={props.ButtonFunc}
            style={{
              backgroundColor: props.ButtonBg || theme.colors.polarSimpleMain,
            }}
          >
            {sliceMoreInfoStr(props.ButtonText, 6)}
          </ModalButton>
        </ModalButtonContainer>
      </ModalBox>
    </ModalBackground>
  );
}
