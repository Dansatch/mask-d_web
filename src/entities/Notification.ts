export type NotificationType = "newEntry" | "followAlert" | "other";

export default interface Notification {
  _id: string;
  recipientId: string;
  message: string;
  type: NotificationType;
  relatedUsername: string;
  timestamp: Date;
}

export interface NotificationDataToSubmit {
  recipientId: string;
  message: string;
  type: NotificationType;
  relatedUsername: string;
}
