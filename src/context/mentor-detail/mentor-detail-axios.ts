import { axiosInstance } from "../axios-interface";

export const getMentorDetail = async (accessToken: string) => {
    console.log('getMentorDetail');
    axiosInstance.defaults.headers.common['Authorization'] = accessToken;
    const response = await axiosInstance.get(`/mentor/detail`);
    return response.data;
}