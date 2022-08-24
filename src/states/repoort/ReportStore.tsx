import { action, makeObservable, observable } from 'mobx';
import { axiosInstance } from '../../context/axios-interface';

export interface Mentors {
  name: string;
}

export interface Cadets {
  name: string;
  isCommon: boolean;
}

export interface MentoringLogs {
  id: string;
  meetingAt: Date[];
  topic: string;
  content: string;
}

export interface Report {
  id: string;
  mentors: Mentors;
  cadets: Cadets;
  place: string;
  topic: string;
  content: string;
  imageUrl: string[];
  signatureUrl: string;
  feedbackMessage: string;
  feedback1: number;
  feedback2: number;
  feedback3: number;
  status: string;
  mentoringLogs: MentoringLogs;
}

export interface SaveParams {
  place?: string;
  topic?: string;
  content?: string;
  feedbackMessage?: string;
  feedback1?: number;
  feedback2?: number;
  feedback3?: number;
  isDone?: boolean;
}

class ReportStore {
  report: Report;
  save;

  constructor() {
    makeObservable(this, {
      report: observable,
      save: observable,
      setPlace: action,
      setTopic: action,
      setContent: action,
      setFeedbackMessage: action,
      setFeedback1: action,
      setFeedback2: action,
      setFeedback3: action,
    });
    this.report = {
      id: '',
      mentors: { name: '' },
      cadets: {
        name: '',
        isCommon: true,
      },
      place: '',
      topic: '',
      content: '',
      imageUrl: [],
      signatureUrl: '',
      status: '',
      feedbackMessage: '',
      feedback1: 5,
      feedback2: 5,
      feedback3: 5,
      mentoringLogs: { id: '', topic: '', content: '', meetingAt: [] },
    };
    this.save = new FormData();
  }

  setPlace(place: string) {
    this.report.place = place;
  }

  setTopic(topic: string) {
    this.report.topic = topic;
  }

  setContent(content: string) {
    this.report.content = content;
  }

  setFeedbackMessage(feedbackMessage: string) {
    this.report.feedbackMessage = feedbackMessage;
  }

  setFeedback1(feedback1: number) {
    this.report.feedback1 = feedback1;
  }

  setFeedback2(feedback2: number) {
    this.report.feedback2 = feedback2;
  }

  setFeedback3(feedback3: number) {
    this.report.feedback3 = feedback3;
  }

  deleteFormdataExceptImage() {
    this.save.delete('place');
    this.save.delete('topic');
    this.save.delete('content');
    this.save.delete('feedbackMessage');
    this.save.delete('feedback1');
    this.save.delete('feedback2');
    this.save.delete('feedback3');
    this.save.delete('isDone');
  }

  appendFormdataExceptImage() {
    if (this.report.place) {
      this.save.append('place', this.report.place);
    }
    if (this.report.topic) {
      this.save.append('topic', this.report.topic);
    }
    if (this.report.content) {
      this.save.append('content', this.report.content);
    }
    if (this.report.feedbackMessage) {
      this.save.append('feedbackMessage', this.report.feedbackMessage);
    }
    if (this.report.feedback1) {
      this.save.append('feedback1', this.report.feedback1.toString());
    }
    if (this.report.feedback2) {
      this.save.append('feedback2', this.report.feedback2.toString());
    }
    if (this.report.feedback3) {
      this.save.append('feedback3', this.report.feedback3.toString());
    }
  }

  async saveDone(reportId: string, token: string) {
    this.appendFormdataExceptImage();
    this.save.append('isDone', 'true');
    await axiosInstance
      .patch(`/reports/${reportId}`, this.save, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `bearer ${token}`,
        },
      })
      .then(() => {
        location.reload();
        this.save = new FormData();
        this.deleteFormdataExceptImage();
      })
      .catch(err => {
        alert(`${err?.response?.data?.message}`);
        this.deleteFormdataExceptImage();
      });
  }

  async saveTemporary(reportId: string, token: string) {
    this.appendFormdataExceptImage();
    await axiosInstance
      .patch(`/reports/${reportId}`, this.save, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `bearer ${token}`,
        },
      })
      .then(() => {
        location.reload();
        this.save = new FormData();
        this.deleteFormdataExceptImage();
      })
      .catch(err => {
        alert(`${err?.response?.data?.message}`);
        this.deleteFormdataExceptImage();
      });
  }

  async createReport(mentoringLogId: string, token: string) {
    await axiosInstance
      .post(
        `/reports/${mentoringLogId}`,
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

  async Initializer(reportId: string, token: string) {
    await axiosInstance
      .get(`/reports/${reportId}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(res => {
        this.report = res.data;
      })
      .catch(err => {
        alert(`${err?.response?.data?.message}`);
      });
  }
}
export default new ReportStore();
