import { EntryDataToEdit } from "./../entities/Entry";
import { AxiosRequestConfig } from "axios";
import { InfiniteFetchResponse, getAxiosInstance } from "./api-client";
import Entry, { EntryDataToSubmit } from "../entities/Entry";

class EntryService {
  private axiosInstance = getAxiosInstance();

  constructor(route: string = "entries") {
    this.axiosInstance = getAxiosInstance(route);
  }

  getAll = async (config?: AxiosRequestConfig) => {
    return this.axiosInstance
      .get<InfiniteFetchResponse<Entry>>("/", config)
      .then((res) => res.data)
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  getUserMostLiked = async () => {
    return this.axiosInstance
      .get<InfiniteFetchResponse<Entry>>("/user-most-liked")
      .then((res) => res.data)
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  get = async (id: string) => {
    return this.axiosInstance
      .get<Entry>(`/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  create = async (credentials: EntryDataToSubmit) => {
    return this.axiosInstance
      .post<Entry>("/", credentials)
      .then((res) => res.data)
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  edit = async ({ _id: entryId, timestamp, ...entryData }: EntryDataToEdit) => {
    return this.axiosInstance
      .put(`/${entryId}`, entryData)
      .then((res) => res.data)
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  like = async (id: string) => {
    return this.axiosInstance
      .put(`/${id}/like`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  unlike = async (id: string) => {
    return this.axiosInstance
      .put(`/${id}/unlike`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  delete = async (id: string) => {
    return this.axiosInstance
      .delete(`/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };
}

export default EntryService;
