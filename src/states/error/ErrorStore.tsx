import { action, makeObservable, observable } from 'mobx';

class ErrorStore {
  isError: boolean;
  Title: string;
  errorMsg: string;

  constructor() {
    makeObservable(this, {
      isError: observable,
      errorMsg: observable,
      on: action,
      off: action,
    });
    this.isError = true;
    this.errorMsg = '( 에러 발생 )';
    this.Title = '🚨 42폴라 에러';
  }

  on(errorMsg: string, Title: string) {
    this.isError = true;
    this.errorMsg = errorMsg;
    this.Title = Title;
  }

  off() {
    this.isError = false;
    this.errorMsg = '';
    this.Title = '';
  }
}

export default new ErrorStore();
