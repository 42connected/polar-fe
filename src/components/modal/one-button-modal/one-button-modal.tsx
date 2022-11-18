import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sliceMoreInfoStr } from '@/containers/my-mentoring-mentor/email';
import {
  ModalBackground,
  ModalBody,
  ModalBox,
  ModalButton,
  ModalButtonContainer,
  ModalTitle,
  XButton,
} from '../modal-styled';
import theme from '@/styles/theme';
import { useEffect } from 'react';

export interface OneButtonModalProps {
  TitleText: string;
  Text: string;
  XButtonFunc?: () => any;
  ButtonText: string;
  ButtonBg?: string;
  ButtonFunc: () => any;
}

export function OneButtonModal(props: OneButtonModalProps) {
  useEffect(() => {
    document.body.style.overflow = `hidden`;
    return () => {
      document.body.style.overflow = `auto`;
    };
  }, []);

  return (
    <ModalBackground>
      <ModalBox>
        <XButton>
          {props.XButtonFunc && (
            <FontAwesomeIcon
              icon={faX}
              size="2x"
              style={{ opacity: 0.3, cursor: 'pointer' }}
              onClick={() => props.XButtonFunc && props.XButtonFunc()}
            />
          )}
        </XButton>
        <ModalTitle>{props.TitleText}</ModalTitle>
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
