import { makeObservable, observable, action, runInAction } from 'mobx';
import {
  axiosWithNoData,
  AXIOS_METHOD_WITH_NO_DATA,
} from '../../context/axios-interface';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '../error/ErrorStore';
import LoadingStore from '../loading/LoadingStore';

class KeywordStore {
  keywords: string[];
  selected: string[];

  constructor() {
    makeObservable(this, {
      keywords: observable,
      selected: observable,
      pushSelected: action,
      removeSelectedByKeyword: action,
      seletedClear: action,
      clear: action,
      Initializer: action,
    });
    this.keywords = [];
    this.selected = [];
  }

  pushSelected(keyword: string) {
    this.selected.push(keyword);
  }

  removeSelectedByKeyword(keyword: string) {
    const idx = this.selected.indexOf(keyword);
    if (idx !== -1) {
      this.selected.splice(idx, 1);
    }
  }

  seletedClear() {
    this.selected = [];
  }

  clear() {
    this.keywords = [];
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
