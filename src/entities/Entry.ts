export default interface Entry {
  _id: string;
  title: string;
  text: string;
  userId: string;
  likes: string[];
  commentDisabled: boolean;
  timestamp: Date;
}

export interface EntryDataToSubmit {
  title: string;
  text: string;
  userId: string;
  commentDisabled: boolean;
  timestamp: Date;
}
