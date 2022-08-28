import { action, makeObservable, observable } from 'mobx';
import { axiosInstance } from '../../context/axios-interface';
import LoadingStore from '../loading/LoadingStore';

export interface MentoringLogs {
  id: string;
  createdAt: Date;
  meetingAt: Date[];
  cadet: {
    name: string;
    intraId: string;
    resumeUrl: string;
    isCommon: boolean;
  };
  topic: string;
  status: string;
  report: {
    id: string;
    status: string;
  };
  meta: {
    requestTime: Date[][];
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
      Initializer: action,
      clearLogs: action,
    });
    this.logs = [];
    this.total = 0;
    this.curPage = 0;
  }

  clearLogs() {
    this.logs = [];
    this.total = 0;
    this.curPage = 0;
  }

  async Initializer(token: string, page: number) {
    LoadingStore.on();
    await axiosInstance
      .get(`/mentors/mentorings?take=15&page=${page}`, {
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
    LoadingStore.off();
  }
}

export default new MentorLogStore();
