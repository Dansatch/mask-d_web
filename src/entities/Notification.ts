export default interface Notification {
  _id: string;
  recipientId: string;
  message: string;
  timestamp: Date;
}
