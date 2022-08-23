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

  async saveDone(reportId: string, token: string) {
    this.save.append('place', this.report.place);
    this.save.append('topic', this.report.topic);
    this.save.append('content', this.report.content);
    this.save.append('feedbackMessage', this.report.feedbackMessage);
    this.save.append('feedback1', this.report.feedback1.toString());
    this.save.append('feedback2', this.report.feedback2.toString());
    this.save.append('feedback3', this.report.feedback3.toString());
    this.save.append('isDone', 'true');
    const data: FormData = this.save;
    this.save = new FormData();
    await axiosInstance
      .patch(`/reports/${reportId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `bearer ${token}`,
        },
      })
      .then(() => {
        location.reload();
      })
      .catch(err => {
        alert('제출 실패');
        console.log(err);
      });
  }

  async saveTemporary(reportId: string, token: string) {
    this.save.append('place', this.report.place);
    this.save.append('topic', this.report.topic);
    this.save.append('content', this.report.content);
    this.save.append('feedbackMessage', this.report.feedbackMessage);
    this.save.append('feedback1', this.report.feedback1.toString());
    this.save.append('feedback2', this.report.feedback2.toString());
    this.save.append('feedback3', this.report.feedback3.toString());
    const data: FormData = this.save;
    this.save = new FormData();
    await axiosInstance
      .patch(`/reports/${reportId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `bearer ${token}`,
        },
      })
      .then(() => {
        location.reload();
      })
      .catch(err => {
        alert('임시 저장 실패');
        console.log(err);
      });
  }

  async ReportInitializer(reportId: string, token: string) {
    await axiosInstance
      .get(`/reports/${reportId}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(res => {
        this.report = res.data;
      })
      .catch(() => {
        alert('레포트 정보를 받아올 수 없습니다.');
        window.location.href = '/';
      });
  }
}
export default new ReportStore();
