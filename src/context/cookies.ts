import { Cookies } from 'react-cookie';

const cookies = new Cookies();

/**
 * 쿠키 이름 리스트
 */
export const TOKEN_LIST = {
  ACCESS_TOKEN: 'access_token',
  USER_ROLE: 'user_role',
  INTRA_ID: 'intra_id',
};

/**
 * 쿠키 옵션
 */
export interface COOKIE_OPTION {
  Expires?: Date;
  'max-age'?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  samesite?: string;
  httpOnly?: boolean;
}

/**
 * 쿠키 기본 설정
 */
export const DEFAULT_COOKIE_OPTION = {
  path: '/',
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
 */
export const removeCookie = (tokenName: string, option?: COOKIE_OPTION) => {
  cookies.remove(tokenName, { ...option });
};

/* option example */
// { path: '/', secure: true, sameSite: "none" }
