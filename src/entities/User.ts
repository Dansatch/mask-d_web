export default interface User {
  _id: string;
  username: string;
  isPrivate: boolean;
  followers: string[];
  following: string[];
  timestamp: Date;
}

export interface UserRegisterData {
  username: string;
  password: string;
  isPrivate: boolean;
}
