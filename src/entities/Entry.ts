export default interface Entry {
  _id: string;
  title: string;
  text: string;
  userId: string;
  timestamp: Date;
  likes: string[];
}

export interface EntryDataToSubmit {
  title: string;
  text: string;
  userId: string;
  timestamp: Date;
}
