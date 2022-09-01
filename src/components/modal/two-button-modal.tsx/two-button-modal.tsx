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

interface TwoButtonModalProps {
  TitleText: string;
  Text: string;
  XButtonFunc: () => void;
  Button1Text: string;
  Button1Func: () => void;
  Button1bg: string;
  Button2Text: string;
  Button2Func: () => void;
  Button2bg: string;
}

export function TwoButtonModal(props: TwoButtonModalProps) {
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
            onClick={props.Button1Func}
            style={{ background: props.Button1bg }}
          >
            {sliceMoreInfoStr(props.Button1Text, 4)}
          </ModalButton>
          <ModalButton
            onClick={props.Button2Func}
            style={{ background: props.Button2bg }}
          >
            {sliceMoreInfoStr(props.Button2Text, 4)}
          </ModalButton>
        </ModalButtonContainer>
      </ModalBox>
    </ModalBackground>
  );
}
