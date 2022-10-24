import { useState } from 'react';
import { ApplyModal } from './modal/modal';

export enum ModalType {
  AVAILABLE_TIME,
  MENTOR_INFO,
}

interface MentorInfoModalProps {
  intraId: string;
  modalType: ModalType;
  setter: (b: boolean) => void;
  value: boolean;
}

export function MentorInfoModal(props: MentorInfoModalProps) {
  const [applyModal, setApplyModal] = useState<boolean>(true);
  return (
    <div>
      <ApplyModal
        intraId={props.intraId}
        applyModal={props.value}
        setApplyModal={props.setter}
        modalType={props.modalType}
      />
    </div>
  );
}

export default MentorInfoModal;
