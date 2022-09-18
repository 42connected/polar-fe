import { action, makeObservable, observable, runInAction } from 'mobx';
import {
  axiosWithNoData,
  AXIOS_METHOD_WITH_NO_DATA,
} from '../../context/axios-interface';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '../error/ErrorStore';
import LoadingStore from '../loading/LoadingStore';
import UserJoinStore from '../user-join/UserJoinStore';

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

  constructor() {
    makeObservable(this, {
      logs: observable,
      Initializer: action,
      clearLogs: action,
    });
    this.logs = [];
    this.total = 0;
  }

  clearLogs() {
    this.logs = [];
    this.total = 0;
  }

  async Initializer(token: string, page: number) {
    LoadingStore.on();
    await axiosWithNoData(
      AXIOS_METHOD_WITH_NO_DATA.GET,
      `/mentors/mentorings?take=15&page=${page}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    )
      .then(res => {
        runInAction(() => {
          this.logs = res.data.logs;
          this.total = res.data.total;
        });
      })
      .catch(err => {
        if (UserJoinStore && !UserJoinStore.needJoin)
          ErrorStore.on(
            err?.response?.data?.message,
            ERROR_DEFAULT_VALUE.TITLE,
          );
      });
    LoadingStore.off();
  }
}

export default new MentorLogStore();
