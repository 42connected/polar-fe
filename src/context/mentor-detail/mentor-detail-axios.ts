import MentorDetailProps from '../../interface/mentor-detail/mentor-detail.interface';
import { axiosInstance } from '../axios-interface';

export const getMentorDetailWithParams = async (
  accessToken: string,
  param: any,
) => {
  console.log('getMentorDetail');
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${accessToken}`;

  const response = await axiosInstance.get(`/mentors/${param}`);
  return response;
};
