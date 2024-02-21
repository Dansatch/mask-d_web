export default interface Comment {
  _id: string;
  text: string;
  entryId: string;
  userId: string;
  likes: string[];
  timestamp: Date;
}

export interface CommentDataToSubmit {
  text: string;
  entryId: string;
}

export interface CommentDataToEdit {
  commentId: string;
  text: string;
}
