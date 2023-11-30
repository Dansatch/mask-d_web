import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import users from "../data/users";
import User, { UserDataToSubmit } from "../entities/User";

const PAGE_SIZE = 10;

const useUsers = () => {
  const fetchUsers = (pageParam: number) => {
    const startIndex = (pageParam - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedData = users.slice(startIndex, endIndex);

    return Promise.resolve(paginatedData);
  };

  return useInfiniteQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: ({ pageParam }) => fetchUsers(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage[lastPage.length - 1] &&
        lastPage[lastPage.length - 1]._id !== users[users.length - 1]._id
        ? allPages.length + 1
        : undefined;
    },
  });
};

export const getUser = () => {
  return users[1];
};

export const registerUser = async (data: UserDataToSubmit) => {
  const newUser: User = {
    ...data,
    _id: data.username + "id",
    timestamp: new Date(),
    followers: [],
    following: [],
  };

  console.log("Created " + newUser.username);
  return Promise.resolve(users.push(newUser));
};

export const loginUser = async (data: UserDataToSubmit) => {
  // Confirm username exists and password matches
  return Promise.resolve(console.log(data.username + " logged in"));
};

export const getUserByUsername = async (username: string) => {
  return Promise.resolve(users.find((c) => c.username === username));
};

export const getUserByUserId = async (userId: string) => {
  return Promise.resolve(users.find((c) => c._id === userId));
};

// Edit invalidating queryKey
export const useFollowUser = (
  currentUserId: string,
  selectedUserId: string
) => {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    // Should be an object **suggestion
    mutationFn: () => followUser(currentUserId, selectedUserId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(currentUserId, selectedUserId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const handleFollow = async () => {
    if (await isFollowing(currentUserId, selectedUserId))
      await unfollowMutation.mutateAsync();
    else await followMutation.mutateAsync();
  };

  return handleFollow;
};

const followUser = async (currentUserId: string, userIdToFollow: string) => {
  let currentUser = await getUserByUserId(currentUserId);
  const userToFollow = await getUserByUserId(userIdToFollow);

  currentUser?.following.push(userIdToFollow);
  userToFollow?.followers.push(currentUserId);

  return Promise.resolve();
};

const unfollowUser = async (
  currentUserId: string,
  userIdToUnfollow: string
) => {
  const currentUser = await getUserByUserId(currentUserId);
  const userToUnfollow = await getUserByUserId(userIdToUnfollow);

  if (currentUser)
    currentUser.following = currentUser.following.filter(
      (userId) => userId !== userIdToUnfollow
    );

  if (userToUnfollow)
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (userId) => userId !== currentUserId
    );

  return Promise.resolve();
};

export const isFollowing = async (
  currentUserId: string,
  selectedUserId: string
) => {
  const currentUser = await getUserByUserId(currentUserId);
  return currentUser?.following.includes(selectedUserId);
};

export default useUsers;
