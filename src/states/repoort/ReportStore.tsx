import { makeObservable, observable, runInAction } from 'mobx';
import {
  axiosWithData,
  axiosWithNoData,
  AXIOS_METHOD_WITH_DATA,
  AXIOS_METHOD_WITH_NO_DATA,
} from '../../context/axios-interface';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '../error/ErrorStore';
import LoadingStore from '../loading/LoadingStore';

export interface Mentors {
  name: string;
}

export interface Cadets {
  name: string;
  intraId: string;
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
  extraCadets: string;
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

export interface ReportSaveRequestDto {
  extraCadets: string;
  place: string;
  topic: string;
  content: string;
  feedbackMessage: string;
  feedback1: number;
  feedback2: number;
  feedback3: number;
  meetingAt: Date[];
}

class ReportStore {
  report: Report;
  dto: ReportSaveRequestDto;

  constructor() {
    makeObservable(this, {
      report: observable,
    });
    this.report = {
      id: '',
      mentors: { name: '' },
      cadets: {
        name: '',
        intraId: '',
        isCommon: true,
      },
      extraCadets: '',
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

    this.dto = {
      extraCadets: '',
      place: '',
      topic: '',
      content: '',
      feedbackMessage: '',
      feedback1: 5,
      feedback2: 5,
      feedback3: 5,
      meetingAt: [],
    };
  }

  setExtraCadet(extraCadets: string) {
    this.dto.extraCadets = extraCadets;
  }

  setPlace(place: string) {
    this.dto.place = place;
  }

  setTopic(topic: string) {
    this.dto.topic = topic;
  }

  setContent(content: string) {
    this.dto.content = content;
  }

  setFeedbackMessage(fm: string) {
    this.dto.feedbackMessage = fm;
  }

  setFeedback1(n: number) {
    this.dto.feedback1 = n;
  }

  setFeedback2(n: number) {
    this.dto.feedback2 = n;
  }

  setFeedback3(n: number) {
    this.dto.feedback3 = n;
  }

  setTime(time: Date[]) {
    this.dto.meetingAt = time;
  }

  async saveDone(reportId: string, token: string) {
    LoadingStore.on();
    await axiosWithData(
      AXIOS_METHOD_WITH_DATA.PACTH,
      `/reports/${reportId}`,
      { ...this.dto, isDone: true },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    )
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
    LoadingStore.off();
  }

  async saveTemporary(reportId: string, token: string) {
    LoadingStore.on();
    await axiosWithData(
      AXIOS_METHOD_WITH_DATA.PACTH,
      `/reports/${reportId}`,
      this.dto,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    )
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
    LoadingStore.off();
  }

  async deleteImage(reportId: string, token: string, imageIndex: number) {
    LoadingStore.on();
    await axiosWithNoData(
      AXIOS_METHOD_WITH_NO_DATA.DELETE,
      `/reports/${reportId}/picture?image=${imageIndex}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    )
      .then(res => {
        this.Initializer(reportId, token);
      })
      .catch(err => {
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
    LoadingStore.off();
  }

  async deleteSign(reportId: string, token: string) {
    LoadingStore.on();
    await axiosWithNoData(
      AXIOS_METHOD_WITH_NO_DATA.DELETE,
      `/reports/${reportId}/picture?signature=0`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    )
      .then(res => {
        this.Initializer(reportId, token);
      })
      .catch(err => {
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
    LoadingStore.off();
  }

  async uploadImage(reportId: string, token: string, img: FormData) {
    LoadingStore.on();
    await axiosWithData(
      AXIOS_METHOD_WITH_DATA.PACTH,
      `/reports/${reportId}/picture`,
      img,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `bearer ${token}`,
        },
      },
    )
      .then(() => {
        this.Initializer(reportId, token);
      })
      .catch(err => {
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
    LoadingStore.off();
  }

  async createReport(mentoringLogId: string, token: string) {
    LoadingStore.on();
    await axiosWithData(
      AXIOS_METHOD_WITH_DATA.POST,
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
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
    LoadingStore.off();
  }

  async Initializer(reportId: string, token: string) {
    LoadingStore.on();
    await axiosWithNoData(
      AXIOS_METHOD_WITH_NO_DATA.GET,
      `/reports/${reportId}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    )
      .then(res => {
        runInAction(() => {
          this.report = res.data;
        });
      })
      .catch(err => {
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
    LoadingStore.off();
  }
}
export default new ReportStore();
