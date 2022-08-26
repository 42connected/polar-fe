import { makeObservable, observable } from 'mobx';
import { axiosInstance } from '../../context/axios-interface';

export interface User {
  intraId: string;
  role: string;
}

export const USER_ROLES = {
  MENTOR: 'mentor',
  CADET: 'cadet',
  BOCAL: 'bocal',
};

class AuthStore {
  isLogin: boolean;
  jwt: string;
  user: User;

  constructor() {
    makeObservable(this, {
      isLogin: observable,
      jwt: observable,
      user: observable,
    });
    this.isLogin = false;
    this.jwt = '';
    this.user = { intraId: '', role: '' };
  }

  async Logout() {
    this.isLogin = false;
    this.jwt = '';
    this.user = { intraId: '', role: '' };
  }

  async Login() {
    this.isLogin = true;
    this.jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im0tZW5nZW5nIiwicm9sZSI6ImJvY2FsIiwiaWF0IjoxNjYxNDc5MDUwLCJleHAiOjE2NjE1NjU0NTB9.Wt5HCn7vQoKOChVFxiNKgoAlfiBcCQPCYfIxFmjg1cA';
    this.user = { intraId: 'm-engeng', role: USER_ROLES.MENTOR };
    //await axiosInstance
    //  .get(`/login`, { headers: { 'Access-Control-Allow-Origin': '*' } })
    //  .then(res => {
    //    this.jwt = res.data.jwt;
    //    this.user = res.data.user;
    //    this.isLogin = true;
    //  })
    //  .catch(() => {
    //    alert('Login Error');
    //  });
    //console.log(this.jwt);
    //console.log(this.user);
    //console.log(this.isLogin);
  }
}

export default new AuthStore();
