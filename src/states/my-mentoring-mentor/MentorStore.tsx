import { makeObservable, observable } from 'mobx';
import { axiosInstance } from '../../context/axios-interface';
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
    });
    this.mentor = { id: '', intraId: '', email: '' };
  }

  async verifyEmail(code: string, token: string) {
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
        location.reload();
      })
      .catch(err => {
        alert(`${err?.response?.data?.message}`);
      });
  }

  async changeEmail(email: string, token: string) {
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
  }

  async getMentor(intraId: string, token: string) {
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
  }
}

export default new MentorStore();
