import { isLoggedIn } from "./useUsers";

// Auth check and return appropriately
const useAuth = async () => await isLoggedIn();

export default useAuth;
