import Notification from "../entities/Notification";

const notifications: Notification[] = [
  {
    _id: "notifi1",
    recipientId: "user1",
    message: "redPanther29 liked your entry",
    timestamp: new Date("2023-11-15T08:00:00Z"),
  },
  {
    _id: "notifi2",
    recipientId: "user1",
    message: "shyTiger098 commented on your entry",
    timestamp: new Date("2023-11-14T15:30:00Z"),
  },
  {
    _id: "notifi3",
    recipientId: "user1",
    message: "You haven't posted an entry today",
    timestamp: new Date("2023-11-14T09:45:00Z"),
  },
  {
    _id: "notifi4",
    recipientId: "user4",
    message: "Your post has been liked",
    timestamp: new Date("2023-11-13T17:20:00Z"),
  },
  {
    _id: "notifi5",
    recipientId: "user5",
    message: "Important update: Please review",
    timestamp: new Date("2023-11-13T11:10:00Z"),
  },
  {
    _id: "notifi6",
    recipientId: "user6",
    message: "New feature available: Try it now!",
    timestamp: new Date("2023-11-12T13:55:00Z"),
  },
  {
    _id: "notifi7",
    recipientId: "user7",
    message: "Congratulations! You have a new follower",
    timestamp: new Date("2023-11-12T08:30:00Z"),
  },
];

export default notifications;
