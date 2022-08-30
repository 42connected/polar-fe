import { makeObservable, observable } from 'mobx';
import { axiosInstance } from '../../context/axios-interface';
import LoadingStore from '../loading/LoadingStore';

export interface ReportSaveFormdata {
  place?: string;
  topic?: string;
  content?: string;
  feedbackMessage?: string;
  feedback1?: number;
  feedback2?: number;
  feedback3?: number;
}

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

class ReportStore {
  report: Report;
  save;

  constructor() {
    makeObservable(this, {
      report: observable,
      save: observable,
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

  appendFormdataExceptImage(data: ReportSaveFormdata) {
    if (data.place) {
      this.save.append('place', data.place);
    }
    if (data.topic) {
      this.save.append('topic', data.topic);
    }
    if (data.content) {
      this.save.append('content', data.content);
    }
    if (data.feedbackMessage) {
      this.save.append('feedbackMessage', data.feedbackMessage);
    }
    if (data.feedback1) {
      this.save.append('feedback1', data.feedback1.toString());
    }
    if (data.feedback2) {
      this.save.append('feedback2', data.feedback2.toString());
    }
    if (data.feedback3) {
      this.save.append('feedback3', data.feedback3.toString());
    }
  }

  async saveDone(reportId: string, token: string, data: ReportSaveFormdata) {
    this.appendFormdataExceptImage(data);
    this.save.append('isDone', 'true');
    LoadingStore.on();
    await axiosInstance
      .patch(`/reports/${reportId}`, this.save, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `bearer ${token}`,
        },
      })
      .then(() => {
        this.save = new FormData();
        this.deleteFormdataExceptImage();
        window.location.reload();
      })
      .catch(err => {
        alert(`${err?.response?.data?.message}`);
        this.deleteFormdataExceptImage();
      });
    LoadingStore.off();
  }

  async saveTemporary(
    reportId: string,
    token: string,
    data: ReportSaveFormdata,
  ) {
    this.appendFormdataExceptImage(data);
    LoadingStore.on();
    await axiosInstance
      .patch(`/reports/${reportId}`, this.save, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `bearer ${token}`,
        },
      })
      .then(() => {
        this.save = new FormData();
        this.deleteFormdataExceptImage();
        window.location.reload();
      })
      .catch(err => {
        alert(`${err?.response?.data?.message}`);
        this.deleteFormdataExceptImage();
      });
    LoadingStore.off();
  }

  async createReport(mentoringLogId: string, token: string) {
    LoadingStore.on();
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
      .then(res => {
        document.location.href = `/mentorings/reports/${res.data}`;
      })
      .catch(err => {
        alert(`${err?.response?.data?.message}`);
      });
    LoadingStore.off();
  }

  async Initializer(reportId: string, token: string) {
    LoadingStore.on();
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
    LoadingStore.off();
  }
}
export default new ReportStore();
