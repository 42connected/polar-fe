export interface reportsPro {
  cadets: {
    name: string;
    isCommon: boolean;
  };
  content: string;
  createdAt: Date;
  feedback1: number;
  feedback2: number;
  feedback3: number;
  feedbackMessage: string;
  id: string;
  imageUrl: string[];
  mentoringLogs: {
    content: string;
    createAt: string;
    id: string;
    meetingAt: Date[];
    rejectMessage: string;
    requestTime1: Date[];
    requestTime2: Date[];
    requestTime3: Date[];
    status: string;
    topic: string;
  };
  mentors: {
    name: string;
  };
  money: number;
  place: string;
  signatureUrl: string;
  status: string;
  topic: string;
  updatedAt: Date;
}
