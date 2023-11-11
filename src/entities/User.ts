export default interface User {
  _id: string;
  username: string;
  password: string;
  followers: string[];
  following: string[];
  timestamp: Date;
}

export interface UserDataToSubmit {
  username: string;
  password: string;
}
