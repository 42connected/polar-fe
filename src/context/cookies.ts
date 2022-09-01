import { Cookies } from 'react-cookie';

const cookies = new Cookies();

/**
 * 하루를 초로 환산
 * 60 * 60 * 24
 */
const DAY_TO_SECOND = 86400;

/**
 * 쿠키 이름 리스트
 */
export const TOKEN_LIST = {
  ACCESS_TOKEN: 'access_token',
  USER_ROLE: 'user_role',
  INTRA_ID: 'intra_id',
  JOIN: 'info_join',
};

/**
 * 쿠키 옵션
 */
export interface COOKIE_OPTION {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | 'none' | 'lax' | 'strict';
  encode?: (value: string) => string;
}

/**
 * 쿠키 기본 설정
 */
export const DEFAULT_COOKIE_OPTION: COOKIE_OPTION = {
  path: '/',
  maxAge: DAY_TO_SECOND,
};

/**
 * 토큰 설정 함수
 * @param tokenName 토큰 이름
 * @param value 토큰 값
 * @param option 옵션
 * example) { path: '/', secure: true, sameSite: "none" }
 */
export const setCookie = (
  tokenName: string,
  value: string,
  option?: COOKIE_OPTION,
) => {
  cookies.set(tokenName, value, { ...option });
};

/**
 * 토큰 가져오는 함수
 * @param tokenName 토큰 이름
 * @returns 토큰 이름에 해당하는 쿠키 값
 */
export const getCookie = (tokenName: string) => {
  return cookies.get(tokenName);
};

/**
 * 토큰 삭제하는 함수
 * @param tokenName 토큰 이름
 * @param option 옵션
 */
export const removeCookie = (tokenName: string, option?: COOKIE_OPTION) => {
  cookies.remove(tokenName, { ...option });
};

/* option example */
// { path: '/', secure: true, sameSite: "none" }
