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
} from '@/components/v1/modal/modal-styled';
import theme from '@/styles/theme';
import { useEffect } from 'react';

interface TwoButtonModalProps {
  TitleText: string;
  Text: string;
  XButtonFunc?: () => void;
  Button1Text: string;
  Button1Func: () => void;
  Button1bg?: string;
  Button2Text: string;
  Button2Func: () => void;
  Button2bg?: string;
}

export function TwoButtonModal(props: TwoButtonModalProps) {
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
            onClick={props.Button1Func}
            style={{
              background: props.Button1bg && theme.colors.polarSimpleMain,
            }}
          >
            {sliceMoreInfoStr(props.Button1Text, 6)}
          </ModalButton>
          <ModalButton
            onClick={props.Button2Func}
            style={{ background: props.Button2bg && theme.colors.grayThree }}
          >
            {sliceMoreInfoStr(props.Button2Text, 6)}
          </ModalButton>
        </ModalButtonContainer>
      </ModalBox>
    </ModalBackground>
  );
}
