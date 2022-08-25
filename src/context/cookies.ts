import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (_: any, value: string, option?: any) => {
  cookies.set('accessToken', value, { ...option });
};

export const getCookie = () => {
  return cookies.get('accessToken');
};

export const removeCookie = () => {
  cookies.remove('accessToken');
};

/* option example */
// { path: '/', secure: true, sameSite: "none" }
