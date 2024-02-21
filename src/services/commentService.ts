import { InfiniteFetchResponse, getAxiosInstance } from "./api-client";
import Comment, {
  CommentDataToEdit,
  CommentDataToSubmit,
} from "../entities/Comment";
import { AxiosRequestConfig } from "axios";

interface CommentCountResponse {
  count: number;
}

class CommentService {
  private axiosInstance = getAxiosInstance();

  constructor(route: string = "comments") {
    this.axiosInstance = getAxiosInstance(route);
  }

  getAll = async (entryId: string, config?: AxiosRequestConfig) => {
    return this.axiosInstance
      .get<InfiniteFetchResponse<Comment>>(`/${entryId}`, config)
      .then((res) => res.data)
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  getCommentCount = async (entryId: string) => {
    return this.axiosInstance
      .get<CommentCountResponse>(`/${entryId}/count`)
      .then((res) => res.data)
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  create = async (credentials: CommentDataToSubmit) => {
    return this.axiosInstance
      .post<Comment>("/", credentials)
      .then((res) => res.data)
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  edit = async ({ commentId: id, text }: CommentDataToEdit) => {
    return this.axiosInstance
      .put(`/${id}`, text)
      .then((res) => {
        return res.data;
      })
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

export default CommentService;
