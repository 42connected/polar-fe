import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (_: any, value: string, option?: any) => {
  cookies.set('accessToken', value, { ...option });
};

export const getCookie = (_: any) => {
  return cookies.get('accessToken');
};

export const removeCookie = (_: any) => {
  cookies.remove('accessToken');
};

/* option example */
// { path: '/', secure: true, sameSite: "none" }
