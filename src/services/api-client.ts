import axios from "axios";

export interface InfiniteFetchResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
}

export const getAxiosInstance = (route?: string) =>
  axios.create({
    baseURL: `${process.env.API_URL}/${route}`,
    withCredentials: true,
  });
