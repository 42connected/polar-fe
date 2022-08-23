import { makeObservable, observable, action } from 'mobx';
import { axiosInstance } from '../../context/axios-interface';

export class Keyword {
  keyword: string;

  constructor(keyword: string) {
    makeObservable(this, {
      keyword: observable,
    });
    this.keyword = keyword;
  }
}

class KeywordStore {
  keywords: Keyword[];
  selected: string[];

  constructor() {
    makeObservable(this, {
      keywords: observable,
      selected: observable,
      pushSelected: action,
      seletedClear: action,
      clear: action,
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

  async keywordsInitializer(category: string): Promise<void> {
    try {
      const ret = await axiosInstance.get(`/categories/${category}/keywords`);
      ret?.data?.map((e: string) => {
        this.keywords.push(new Keyword(e));
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new KeywordStore();
