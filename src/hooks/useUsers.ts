import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import users from "../data/users";
import User, { UserDataToSubmit } from "../entities/User";
import AuthService from "../services/authService";
import useAppStore from "../store";
import UserService from "../services/userService";
import { InfiniteFetchResponse } from "../services/api-client";

const authService = new AuthService();
const userService = new UserService();
const PAGE_SIZE = 10;

const useUsers = () => {
  const userQuery = useAppStore().userQueryStore().userQuery;

  const fetchUsers = (pageParam: number) => {
    return userService.getAll({
      params: {
        searchText: userQuery.searchText,
        sortOption: userQuery.sortOption,
        page: pageParam,
        pageSize: PAGE_SIZE,
      },
    });
  };

  return useInfiniteQuery<InfiniteFetchResponse<User>, Error>({
    queryKey: ["users", userQuery],
    queryFn: ({ pageParam }) => fetchUsers(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.page < lastPage.totalPages
        ? allPages.length + 1
        : undefined;
    },
  });
};

export const useUser = (username: string) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => userService.get(username),
  });
};

export const getUserByUserId = async (userId: string) => {
  return Promise.resolve(users.find((c) => c._id === userId));
};

export const useRegisterUser = () => {
  const setLoggedIn = useAppStore().setLoggedIn;
  const setCurrentUser = useAppStore().setCurrentUser;

  return async (data: UserDataToSubmit) => {
    try {
      const user = await userService.register(data);

      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      setLoggedIn(true);
    } catch (error: any) {
      throw new Error(error);
    }
  };
};

export const useLoginUser = () => {
  const setLoggedIn = useAppStore().setLoggedIn;
  const setCurrentUser = useAppStore().setCurrentUser;

  const login = async (data: UserDataToSubmit) => {
    try {
      const user = await authService.login(data);
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      setLoggedIn(true);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setLoggedIn(false);
      setCurrentUser(undefined);
      localStorage.removeItem("currentUser");
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    login,
    logout,
  };
};

export const isLoggedIn = async () => await authService.checkLogin();

export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  const setCurrentUser = useAppStore().setCurrentUser;
  const currentUser = useAppStore().currentUser;

  const updateUserPassword = async ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      return await userService.updatePassword({ oldPassword, newPassword });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const updateUserPrivacy = async ({ isPrivate }: { isPrivate: boolean }) => {
    try {
      await userService.updatePrivacy(isPrivate);

      queryClient.invalidateQueries(); // Clear cache

      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...currentUser, isPrivate })
      ); // Update user in storage

      setCurrentUser({ ...currentUser, isPrivate }); // Update user in state
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    updateUserPassword,
    updateUserPrivacy,
  };
};

export const useFollowUser = (selectedUserId: string) => {
  const queryClient = useQueryClient();
  const setCurrentUser = useAppStore().setCurrentUser;

  const handleFollow = async () => {
    let updatedUser: User;

    if (isFollowing(selectedUserId))
      updatedUser = await userService.unfollowUser(selectedUserId);
    else updatedUser = await userService.followUser(selectedUserId);

    // Clean up
    queryClient.invalidateQueries();
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  return handleFollow;
};

export const isFollowing = (selectedUserId: string) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "");
  return currentUser?.following.includes(selectedUserId);
};

export default useUsers;
