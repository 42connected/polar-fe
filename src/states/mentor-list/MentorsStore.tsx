import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import qs from 'qs';
import {
  axiosWithNoData,
  AXIOS_METHOD_WITH_NO_DATA,
} from '../../context/axios-interface';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '../error/ErrorStore';
import LoadingStore from '../loading/LoadingStore';

export interface Categories {
  id: string;
  name: string;
}

export interface MentorsList {
  category?: Categories;
  mentorCount: number;
  mentors: MentorsListElement[];
}

export interface MentorsListElement {
  mentor: MentorSimpleInfo;
  keywords: string[];
}

export interface MentorSimpleInfo {
  id: string;
  name: string;
  intraId: string;
  tags: string[];
  profileImage: string;
  introduction: string;
  isActive: boolean;
}

class MentorsStore {
  mentorsList: MentorsList;

  constructor() {
    makeObservable(this, {
      mentorsList: observable,
      clear: action,
      Initializer: action,
    });
    this.mentorsList = { mentorCount: 0, mentors: [] };
  }

  clear() {
    this.mentorsList = { mentorCount: 0, mentors: [] };
  }

  async Initializer(
    category: string | undefined,
    keywords: string[],
    name: string | undefined,
  ) {
    if (!category) {
      return;
    }
    if (name === '') {
      name = undefined;
    }
    axios.defaults.paramsSerializer = params => {
      return qs.stringify(params);
    };
    const params = { mentorName: name, keywords: keywords };
    LoadingStore.on();
    await axiosWithNoData(
      AXIOS_METHOD_WITH_NO_DATA.GET,
      `/categories/${category}`,
      {
        params,
      },
    )
      .then(res => {
        this.mentorsList = res.data;
      })
      .catch(err => {
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
    LoadingStore.off();
  }
}

export default new MentorsStore();
