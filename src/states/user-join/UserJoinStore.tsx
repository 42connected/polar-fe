import { action, makeObservable, observable } from 'mobx';

class UserJoinStore {
  needJoin: boolean;

  constructor() {
    makeObservable(this, {
      needJoin: observable,
      on: action,
      off: action,
    });
    this.needJoin = false;
  }

  on() {
    this.needJoin = true;
  }

  off() {
    this.needJoin = false;
  }
}

export default new UserJoinStore();
