import { makeObservable, observable, action, runInAction } from 'mobx';
import {
  axiosWithNoData,
  AXIOS_METHOD_WITH_NO_DATA,
} from '../../context/axios-interface';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '../error/ErrorStore';
import LoadingStore from '../loading/LoadingStore';

class KeywordStore {
  keywords: string[];

  constructor() {
    makeObservable(this, {
      keywords: observable,
      clear: action,
      Initializer: action,
    });
    this.keywords = [];
  }

  /**
   */
  pushSelected(category: any, keyword: string) {
    let keywordsArray = [];
    const keywords = localStorage.getItem(category);
    if (keywords) {
      keywordsArray = JSON.parse(keywords);
    }
    keywordsArray.push(keyword);
    localStorage.setItem(category, JSON.stringify(keywordsArray));
  }

  /**
   */
  removeSelectedByKeyword(category: any, keyword: string) {
    const keywords = localStorage.getItem(category);
    if (!keywords) {
      return;
    }
    const keywordsArray = JSON.parse(keywords);
    const idx = keywordsArray.indexOf(keyword);
    if (idx !== -1) {
      keywordsArray.splice(idx, 1);
    }
    localStorage.setItem(category, JSON.stringify(keywordsArray));
  }

  /**
   */
  seletedClear(category: any) {
    localStorage.removeItem(category);
  }

  clear() {
    this.keywords = [];
  }

  getSelected(category: any): string[] {
    const keywords = localStorage.getItem(category);
    if (!keywords) {
      return [];
    }
    return JSON.parse(keywords);
  }

  async Initializer(category: string) {
    LoadingStore.on();
    await axiosWithNoData(
      AXIOS_METHOD_WITH_NO_DATA.GET,
      `/categories/${category}/keywords`,
    )
      .then(res =>
        res?.data?.map((e: string) => {
          runInAction(() => {
            this.keywords.push(e);
          });
        }),
      )
      .catch(err => {
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
    LoadingStore.off();
  }
}

export default new KeywordStore();
