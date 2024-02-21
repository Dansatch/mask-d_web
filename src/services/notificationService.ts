import { getAxiosInstance } from "./api-client";
import Notification, {
  NotificationDataToSubmit,
  NotificationType,
} from "../entities/Notification";

class NotificationService {
  private axiosInstance = getAxiosInstance();

  constructor(route: string = "notifications") {
    this.axiosInstance = getAxiosInstance(route);
  }

  getAll = async (type?: NotificationType[]) => {
    return this.axiosInstance
      .get<Notification[]>(`/`, {
        params: {
          type,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  send = async (credentials: NotificationDataToSubmit) => {
    return this.axiosInstance
      .post<Notification>("/", credentials)
      .then((res) => res.data)
      .catch((err) => {
        const errorMessage =
          err.response?.data || "An error occurred, pls try again later.";
        throw new Error(errorMessage);
      });
  };

  delete = async (type?: NotificationType[]) => {
    return this.axiosInstance
      .delete(`/`, {
        params: {
          type,
        },
      })
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

export default NotificationService;
