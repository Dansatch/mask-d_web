export default interface User {
  _id: string;
  username: string;
  isPrivate: boolean;
  followers: string[];
  following: string[];
  timestamp: Date;
}

export interface UserDataToSubmit {
  username: string;
  password: string;
  isPrivate?: boolean; // isn't used in login
}
