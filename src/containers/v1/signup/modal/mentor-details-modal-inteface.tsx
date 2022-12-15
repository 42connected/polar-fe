import { ModalType } from '@/containers/v1/signup/mentor-info-modal';

export interface IRows {
  id: number;
  date: number[];
}

export interface AddColumnsProps {
  rows: IRows[];
  onRemove: (id: number) => void;
  onChange: (id: number, index: number, value: number) => void;
}

export interface ApplyDetailModalProps {
  intraId: string;
  modalType: ModalType;
  setApplyModal: (b: boolean) => void;
}

export interface MentorsData {
  availableTime: IAvailableDate[][];
  introduction: string;
  isActive: boolean;
  tags: string[];
  markdownContent: string;
  slackId: string;
  email: string;
  name: string;
}

export interface IAvailableDate {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}
