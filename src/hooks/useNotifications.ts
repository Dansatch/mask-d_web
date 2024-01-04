import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import notifications from "../data/notifications";
import Notification from "../entities/Notification";

const useNotifications = (userId: string) => {
  const queryClient = useQueryClient();

  const fetchNotifications = useQuery<Notification[], Error>({
    queryKey: ["notifications"],
    queryFn: () =>
      Promise.resolve(
        notifications.filter(
          (notification) =>
            notification.recipientId === userId &&
            notification.type !== "newEntry"
        )
      ),
  });

  const fetchEntryAlerts = useQuery<Notification[], Error>({
    queryKey: ["notifications", "entryAlerts"],
    queryFn: () =>
      Promise.resolve(
        notifications.filter(
          (notification) =>
            notification.recipientId === userId &&
            notification.type === "newEntry"
        )
      ),
  });

  const clearEntryAlertsMutation = useMutation({
    mutationFn: (userId: string) => deleteEntryAlerts(userId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["notifications", "entryAlerts"],
      }),
  });

  const clearNotificationsMutation = useMutation({
    mutationFn: (userId: string) => deleteNotifications(userId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const handleNotificationsClear = async () => {
    await clearNotificationsMutation.mutateAsync(userId);
  };

  const handleEntryAlertsClear = async () => {
    await clearEntryAlertsMutation.mutateAsync(userId);
  };

  return {
    fetchNotifications,
    fetchEntryAlerts,
    handleNotificationsClear,
    handleEntryAlertsClear,
  };
};

const deleteNotifications = async (userId: string) => {
  const updatedNotifications: Notification[] = notifications.filter(
    (notification) =>
      notification.recipientId !== userId || notification.type === "newEntry"
  );
  notifications.splice(0, notifications.length, ...updatedNotifications);
  return Promise.resolve(updatedNotifications);
};

const deleteEntryAlerts = async (userId: string) => {
  // Believe the dummy method is wrong but it works regardless
  const updatedNotifications: Notification[] = notifications.filter(
    (notification) =>
      notification.recipientId !== userId || notification.type !== "newEntry"
  );
  return Promise.resolve(
    notifications.splice(0, notifications.length, ...updatedNotifications)
  );
};

export default useNotifications;
