export default interface Notification {
  _id: string;
  recipientId: string;
  message: string;
  isNewEntry?: { value: boolean; username: string };
  timestamp: Date;
}
