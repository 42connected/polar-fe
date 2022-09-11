import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import styled from 'styled-components';
import {
  ModalBackground,
  ModalBox,
  ModalButtonContainer,
  ModalTitle,
} from '../modal/modal-styled';
import ApplyCalendar from './apply-calendar';

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export interface ApplyCalendarModalProps {
  XButtonFunc: () => void;
  mentorIntraId: string;
  setStartDateTime: (date: Date) => void;
  setEndDateTime: (date: Date) => void;
}

export function ApplyCalendarModal(props: ApplyCalendarModalProps) {
  useEffect(() => {
    document.body.style.overflow = `hidden`;
    return () => {
      document.body.style.overflow = `auto`;
    };
  }, []);

  return (
    <ModalBackground>
      <ModalBox>
        <TitleContainer>
          <ModalTitle style={{ fontSize: '2rem' }}>
            ⏰ 멘토링 일정 선택
          </ModalTitle>
          <FontAwesomeIcon
            icon={faX}
            size="1x"
            style={{ opacity: 0.3, cursor: 'pointer' }}
            onClick={props.XButtonFunc}
          />
        </TitleContainer>
        <ApplyCalendar {...props} />
        <ModalButtonContainer></ModalButtonContainer>
      </ModalBox>
    </ModalBackground>
  );
}
