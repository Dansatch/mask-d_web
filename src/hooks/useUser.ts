import users from "../data/users";
import User, { UserDataToSubmit } from "../entities/User";

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

export const followUser = async (
  selectedUsername: string,
  currentUsername: string
) => {
  return Promise.resolve(
    console.log(`${currentUsername} is following ${selectedUsername}`)
  );
};
