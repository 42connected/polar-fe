import { makeObservable, observable } from 'mobx';
import { axiosInstance } from '../../context/axios-interface';

export interface MentoringLogs {
  id: string;
  createdAt: Date;
  meetingAt: Date[];
  cadet: {
    name: string;
    intraId: string;
    resumeUrl: string;
  };
  topic: string;
  status: string;
  report: {
    id: string;
    status: string;
  };
  meta: {
    requestTime: Date[][2];
    isCommon: boolean;
    rejectMessage: string;
    content: string;
  };
}

export const LOGS_PER_PAGE = 15;

class MentorLogStore {
  logs: MentoringLogs[];
  total: number;
  curPage: number;

  constructor() {
    makeObservable(this, {
      logs: observable,
    });
    this.logs = [];
    this.total = 0;
    this.curPage = 0;
  }

  async Initializer(mentorIntraId: string, token: string) {
    await axiosInstance
      .get(`/mentors/mentorings?take=15&page=1`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(res => {
        this.logs = res.data.logs;
        this.total = res.data.total;
      })
      .catch(err => {
        alert(`${err?.response?.data?.message}`);
      });
  }
}

export default new MentorLogStore();
