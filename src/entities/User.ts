export default interface User {
  _id: string;
  username: string;
  password: string;
  timestamp: Date;
}

export interface UserDataToSubmit {
  username: string;
  password: string;
}
