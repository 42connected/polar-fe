import { useState } from 'react';
import { ApplyModal } from './modal/modal';

export enum ModalType {
  AVAILABLE_TIME,
  MENTOR_INFO,
}

interface MentorInfoModalProps {
  intraId: string;
  modalType: ModalType;
}

export function MentorInfoModal(props: MentorInfoModalProps) {
  const [applyModal, setApplyModal] = useState<boolean>(true);

  return (
    <div>
      <ApplyModal
        intraId={props.intraId}
        applyModal={applyModal}
        setApplyModal={setApplyModal}
        modalType={props.modalType}
      />
    </div>
  );
}

export default MentorInfoModal;
