import {
  AXIOS_METHOD_WITH_NO_DATA,
  axiosInstance,
  axiosWithNoData,
} from '../axios-interface';

export const getMentorDetailWithParams = async (
  accessToken: string,
  param: any,
) => {
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${accessToken}`;

  const response = await axiosWithNoData(
    AXIOS_METHOD_WITH_NO_DATA.GET,
    `/mentors/${param}`,
  );
  return response;
};
