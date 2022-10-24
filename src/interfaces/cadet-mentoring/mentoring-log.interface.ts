export interface MentoringLog {
  id: string;
  createdAt: Date;
  mentor: {
    intraId: string;
    name: string;
  };
  topic: string;
  status: string;
  meta: {
    isCommon: boolean;
    content: string;
    requestTime: Date[][];
    meetingAt: Date[];
    rejectMessage: string;
    feedbackMessage: string | null;
  };
}
