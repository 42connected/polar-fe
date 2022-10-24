import { action, makeObservable, observable, runInAction } from 'mobx';
import {
  AXIOS_METHOD_WITH_DATA,
  AXIOS_METHOD_WITH_NO_DATA,
  axiosWithData,
  axiosWithNoData,
} from '../../context/axios-interface';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '../error/ErrorStore';
import LoadingStore from '../loading/LoadingStore';

export interface Mentor {
  id: string;
  intraId: string;
  //  slackId: string;
  //  name: string;
  email: string;
  //  company: string;
  //  duty: string;
  //  profileImage: string;
  //  availableTime: string;
  //  introduction: string;
  //  tags: string[];
  //  isActive: boolean;
  //  markdownContent: string;
  //  createdAt: Date;
  //  updatedAt: Date;
  //  mentorKeyowrds: MentorKeywords[];
  //  comments: Comments[];
  //  reports: Reports[];
  //  mentoringLogs: MentoringLogs[];
}

class MentorStore {
  mentor: Mentor;

  constructor() {
    makeObservable(this, {
      mentor: observable,
      setEmail: action,
      verifyEmail: action,
      changeEmail: action,
      clearMentor: action,
      getMentor: action,
    });
    this.mentor = { id: '', intraId: '', email: '' };
  }

  setEmail(email: string) {
    this.mentor.email = email;
  }

  async verifyEmail(code: string, token: string) {
    LoadingStore.on();
    await axiosWithData(
      AXIOS_METHOD_WITH_DATA.POST,
      `/email-verifications/${code}`,
      {},
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    )
      .then(() => {
        alert('이메일 변경 완료');
        window.location.reload();
      })
      .catch(err => {
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
    LoadingStore.off();
  }

  async changeEmail(email: string, token: string) {
    LoadingStore.on();
    await axiosWithData(
      AXIOS_METHOD_WITH_DATA.POST,
      `/email-verifications`,
      { email: email },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    )
      .then(() => {
        return true;
      })
      .catch(err => {
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
    LoadingStore.off();
  }

  clearMentor() {
    this.mentor = { id: '', intraId: '', email: '' };
  }

  async getMentor(intraId: string) {
    LoadingStore.on();
    await axiosWithNoData(AXIOS_METHOD_WITH_NO_DATA.GET, `/mentors/${intraId}`)
      .then(res => {
        runInAction(() => {
          this.mentor = res.data;
        });
        return true;
      })
      .catch(err => {
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
    LoadingStore.off();
  }
}

export default new MentorStore();
