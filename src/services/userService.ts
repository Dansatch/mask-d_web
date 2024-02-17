import { AxiosRequestConfig } from "axios";
import User, { UserDataToSubmit } from "../entities/User";
import { InfiniteFetchResponse, getAxiosInstance } from "./api-client";

class UserService {
  private axiosInstance = getAxiosInstance();

  constructor(route: string = "users") {
    this.axiosInstance = getAxiosInstance(route);
  }

  getAll = async (config?: AxiosRequestConfig) => {
    return this.axiosInstance
      .get<InfiniteFetchResponse<User>>("/", config)
      .then((res) => res.data)
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  get = async (id: number | string) => {
    // ID is _id or username
    return this.axiosInstance
      .get<User>(`/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  register = async (credentials: UserDataToSubmit) => {
    return this.axiosInstance
      .post("/", credentials)
      .then((res) => {
        const user = res.data;

        if (user) return user;
        else throw new Error();
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data ||
          "An error occurred during authentication, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  updatePassword = async ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) => {
    return this.axiosInstance
      .put("/update-password", { oldPassword, newPassword })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data ||
          "An error occurred during authentication, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  updatePrivacy = async (isPrivate: boolean) => {
    return this.axiosInstance
      .put("/update-privacy", { isPrivate })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data ||
          "An error occurred during authentication, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  followUser = async (selectedUserId: string) => {
    return this.axiosInstance
      .put(`/${selectedUserId}/follow`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data ||
          "An error occurred during authentication, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  unfollowUser = async (selectedUserId: string) => {
    return this.axiosInstance
      .put(`/${selectedUserId}/unfollow`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data ||
          "An error occurred during authentication, pls try again later.";
        throw new Error(errorMessage);
      });
  };
}

export default UserService;
