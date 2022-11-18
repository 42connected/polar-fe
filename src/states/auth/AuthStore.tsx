import { action, makeObservable } from 'mobx';
import {
  axiosWithNoData,
  AXIOS_METHOD_WITH_NO_DATA,
} from '@/context/axios-interface';
import {
  DEFAULT_COOKIE_OPTION,
  getCookie,
  removeCookie,
  TOKEN_LIST,
} from '@/context/cookies';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '@/states/error/ErrorStore';

export interface User {
  intraId: string;
  role: string;
  join: string;
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
    removeCookie(TOKEN_LIST.ACCESS_TOKEN, DEFAULT_COOKIE_OPTION);
    removeCookie(TOKEN_LIST.INTRA_ID, DEFAULT_COOKIE_OPTION);
    removeCookie(TOKEN_LIST.USER_ROLE, DEFAULT_COOKIE_OPTION);
    removeCookie(TOKEN_LIST.JOIN, DEFAULT_COOKIE_OPTION);
    window.location.reload();
  }

  /**
   * 로그인, 토큰 및 AuthStore 값 설정
   */
  Login() {
    //axiosInstance
    //  .get('login')
    axiosWithNoData(AXIOS_METHOD_WITH_NO_DATA.GET, 'login')
      .then(res => {
        document.location.href = res.data;
      })
      .catch(err => {
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
  }

  /**
   * 테스트용 Login Mock function
   */
  //Login() {
  //  setCookie(TOKEN_LIST.ACCESS_TOKEN, '', DEFAULT_COOKIE_OPTION);
  //  setCookie(TOKEN_LIST.INTRA_ID, '', DEFAULT_COOKIE_OPTION);
  //  setCookie(TOKEN_LIST.USER_ROLE, '', DEFAULT_COOKIE_OPTION);
  //  window.location.reload();
  //}

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

  /**
   * @returns (쿠키)로그인 된 유저의 JOIN을 가져옴, 없으면 undefined
   */
  getUserJoin() {
    return getCookie(TOKEN_LIST.JOIN);
  }
}

export default new AuthStore();
