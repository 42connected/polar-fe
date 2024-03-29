export type dataRoomProps = {
  id: string;
  place: string;
  createdAt: Date;
  updatedAt: Date;
  signatureUrl: string;
  imageUrl: string[];
  money: number;
  status: string;
  mentoringLogs: {
    id: string;
    createdAt: Date;
    meetingAt: Date[];
  };
  mentors: {
    intraId: string;
    name: string;
    duty: string;
  };
  cadets: {
    intraId: string;
    isCommon: boolean;
  };
};
