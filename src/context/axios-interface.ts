import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import UserJoinStore from '../states/user-join/UserJoinStore';
import { getCookie, TOKEN_LIST } from './cookies';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export enum AXIOS_METHOD_WITH_NO_DATA {
  GET = 0,
  DELETE,
}

export enum AXIOS_METHOD_WITH_DATA {
  POST = 0,
  PUT,
  PACTH,
}

const isNeedJoin = (config?: AxiosRequestConfig<any>): boolean => {
  if (
    config?.headers?.Authorization &&
    getCookie(TOKEN_LIST.JOIN) === 'false'
  ) {
    return true;
  }
  return false;
};

const userWithNoRequiredInfo = () => {
  UserJoinStore.on();
};

/**
 * for GET, DELETE method
 * @param method Method, enum type
 * @param url Path
 * @param config Config (Not required)
 * @returns Axios 요청과 동일
 */
export const axiosWithNoData = async (
  method: AXIOS_METHOD_WITH_NO_DATA,
  url: string,
  config?: AxiosRequestConfig<any>,
): Promise<AxiosResponse<any, any>> => {
  if (isNeedJoin(config)) {
    userWithNoRequiredInfo();
    throw new Error(`Need Join`);
  }

  switch (method) {
    case AXIOS_METHOD_WITH_NO_DATA.GET:
      return axiosInstance.get(url, config);
    case AXIOS_METHOD_WITH_NO_DATA.DELETE:
      return axiosInstance.delete(url, config);
  }
};

/**
 * for POST, PATCH, PUT method
 * @param method Method, enum type
 * @param url Path
 * @param data Data (Not required)
 * @param config Config (Not required)
 * @returns Axios 요청과 동일
 */
export const axiosWithData = async (
  method: AXIOS_METHOD_WITH_DATA,
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>,
): Promise<AxiosResponse<any, any>> => {
  if (isNeedJoin(config)) {
    userWithNoRequiredInfo();
    throw new Error(`Need Join`);
  }

  switch (method) {
    case AXIOS_METHOD_WITH_DATA.POST:
      return axiosInstance.post(url, data, config);
    case AXIOS_METHOD_WITH_DATA.PACTH:
      return axiosInstance.patch(url, data, config);
    case AXIOS_METHOD_WITH_DATA.PUT:
      return axiosInstance.put(url, data, config);
  }
};
