import { action, makeObservable, observable } from 'mobx';

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

  on(timeoutSec = 10) {
    this.isLoding = true;
    setTimeout(() => {
      this.isLoding = false;
    }, 1000 * timeoutSec);
  }
  off() {
    this.isLoding = false;
  }
}

export default new LoadingStore();
