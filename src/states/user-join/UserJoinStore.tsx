import { action, makeObservable, observable } from 'mobx';
import ErrorStore from '@/states/error/ErrorStore';

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
    if (ErrorStore.isError) {
      ErrorStore.off();
    }
    this.needJoin = false;
  }
}

export default new UserJoinStore();
