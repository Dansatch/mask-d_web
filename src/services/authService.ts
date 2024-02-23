import { getAxiosInstance } from "./api-client";

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}

class AuthService {
  private axiosInstance = getAxiosInstance();

  constructor(route: string = "auth") {
    this.axiosInstance = getAxiosInstance(route);
  }

  login = async (credentials: LoginCredentials) => {
    return this.axiosInstance
      .post("/", credentials)
      .then((res) => {
        const { user } = res.data;

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

  checkLogin = async () => {
    const res = await this.axiosInstance.get("/check-login");

    return res.data;
  };

  logout = async () => {
    return this.axiosInstance
      .post("/logout")
      .then((res) => res.data)
      .catch((err) => {
        const errorMessage =
          err.response?.data ||
          "An error occurred during authentication, pls try again later.";
        throw new Error(errorMessage);
      });
  };
}

export default AuthService;
