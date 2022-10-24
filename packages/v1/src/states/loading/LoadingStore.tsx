import { action, makeObservable, observable, runInAction } from 'mobx';

class LoadingStore {
  isLoding: boolean;

  constructor() {
    makeObservable(this, {
      isLoding: observable,
      on: action,
      off: action,
    });
    this.isLoding = false;
  }

  on() {
    this.isLoding = true;
    setTimeout(() => {
      runInAction(() => {
        this.isLoding = false;
      });
    }, 5000);
  }

  off() {
    this.isLoding = false;
  }
}

export default new LoadingStore();
