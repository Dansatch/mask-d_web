import users from "../data/users";
import User, { UserDataToSubmit } from "../entities/User";

export const registerUser = async (data: UserDataToSubmit) => {
  const newUser: User = {
    ...data,
    _id: data.username + "id",
    timestamp: new Date(),
  };

  console.log("Created " + newUser.username);
  return Promise.resolve(users.push(newUser));
};

export const loginUser = async (data: UserDataToSubmit) => {
  // Confirm username exists and password matches
  return Promise.resolve(console.log(data.username + " logged in"));
};
