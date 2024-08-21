import User from "../entities/User";
import AuthService from "../services/authService";

// Login check and return userdata
const useAuth = async (): Promise<User> => {
  const authService = new AuthService();
  return await authService.checkLogin();
};

export default useAuth;
