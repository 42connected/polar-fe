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
