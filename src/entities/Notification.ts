type NotificationType = "newEntry" | "followAlert" | "other";

export default interface Notification {
  _id: string;
  recipientId: string;
  message: string;
  type: NotificationType;
  relatedUsername: string;
  timestamp: Date;
}
