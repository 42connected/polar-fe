import { action, makeObservable, observable } from 'mobx';
import { axiosInstance } from '../../context/axios-interface';
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
      setEmail: action.bound,
      verifyEmail: action.bound,
      changeEmail: action.bound,
      clearMentor: action.bound,
      getMentor: action.bound,
    });
    this.mentor = { id: '', intraId: '', email: '' };
  }

  setEmail(email: string) {
    this.mentor.email = email;
  }

  async verifyEmail(code: string, token: string) {
    LoadingStore.on();
    await axiosInstance
      .post(
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
        location.reload();
      })
      .catch(err => {
        alert(`${err?.response?.data?.message}`);
      });
    LoadingStore.off();
  }

  async changeEmail(email: string, token: string) {
    LoadingStore.on();
    await axiosInstance
      .post(
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
        alert(`${err?.response?.data?.message}`);
        location.reload();
      });
    LoadingStore.off();
  }

  clearMentor() {
    this.mentor = { id: '', intraId: '', email: '' };
  }

  async getMentor(intraId: string, token: string) {
    LoadingStore.on();
    await axiosInstance
      .get(`/mentors/${intraId}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(res => {
        this.mentor = res.data;
        return true;
      })
      .catch(err => {
        alert(`${err?.response?.data?.message}`);
        return false;
      });
    LoadingStore.off();
  }
}

export default new MentorStore();
