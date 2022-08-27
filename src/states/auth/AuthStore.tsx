import { action, makeObservable, observable } from 'mobx';
import {
  DEFAULT_COOKIE_OPTION,
  getCookie,
  removeCookie,
  setCookie,
  TOKEN_LIST,
} from '../../context/cookies';

export interface User {
  intraId: string;
  role: string;
}

export const USER_ROLES = {
  MENTOR: 'mentor',
  CADET: 'cadet',
  BOCAL: 'bocal',
};

/**
 * TODO: NEED REFACTOR
 */
class AuthStore {
  constructor() {
    makeObservable(this, {
      Login: action,
      Logout: action,
      getAccessToken: action,
      getUserIntraId: action,
      getUserRole: action,
    });
  }

  /**
   * 로그아웃, 토큰 및 AuthStore 값 초기화
   */
  async Logout() {
    console.log('asdasd');
    removeCookie(TOKEN_LIST.ACCESS_TOKEN, DEFAULT_COOKIE_OPTION);
    removeCookie(TOKEN_LIST.INTRA_ID, DEFAULT_COOKIE_OPTION);
    removeCookie(TOKEN_LIST.USER_ROLE), DEFAULT_COOKIE_OPTION;
    console.log(getCookie(TOKEN_LIST.ACCESS_TOKEN));
  }

  /**
   * 로그인, 토큰 및 AuthStore 값 설정
   */
  async Login() {
    setCookie(TOKEN_LIST.ACCESS_TOKEN, 'token', DEFAULT_COOKIE_OPTION);
    setCookie(TOKEN_LIST.INTRA_ID, 'intraid', DEFAULT_COOKIE_OPTION);
    setCookie(TOKEN_LIST.USER_ROLE, 'role', DEFAULT_COOKIE_OPTION);
  }

  /**
   * @returns 쿠키에 저장된 Access Token을 가져옴, 없으면 undefined
   */
  getAccessToken() {
    return getCookie(TOKEN_LIST.ACCESS_TOKEN);
  }

  /**
   * @returns (쿠키)로그인 된 유저의 인트라 아이디를 가져옴, 없으면 undefined
   */
  getUserIntraId() {
    return getCookie(TOKEN_LIST.INTRA_ID);
  }

  /**
   * @returns (쿠키)로그인 된 유저의 ROLE을 가져옴, 없으면 undefined
   */
  getUserRole() {
    return getCookie(TOKEN_LIST.USER_ROLE);
  }
}

export default new AuthStore();
