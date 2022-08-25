import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import qs from 'qs';
import { axiosInstance } from '../../context/axios-interface';
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
}

class MentorsStore {
  mentorsList: MentorsList;

  constructor() {
    makeObservable(this, {
      mentorsList: observable,
      clear: action,
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
    console.log(category);
    console.log(keywords);
    console.log(name);
    if (!category) {
      console.log('Category is undefined');
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
    await axiosInstance
      .get(`/categories/${category}`, {
        params,
      })
      .then(res => {
        this.mentorsList = res.data;
      })
      .catch(err => {
        alert(`${err?.response?.data?.message}`);
        document.location.href = '/mentor-lists/개발';
      });
    LoadingStore.off();
  }
}

export default new MentorsStore();
