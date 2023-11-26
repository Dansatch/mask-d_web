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
            notification.recipientId === userId && !notification.isNewEntry
        )
      ),
  });

  const fetchFollowedNotifications = useQuery<Notification[], Error>({
    queryKey: ["notifications", "following"],
    queryFn: () =>
      Promise.resolve(
        notifications.filter(
          (notification) =>
            notification.recipientId === userId &&
            notification.isNewEntry?.value === true
        )
      ),
  });

  const clearFollowedNotificationsMutation = useMutation({
    mutationFn: (userId: string) => deleteFollowedNotifications(userId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["notifications", "following"],
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

  const handleFollowedNotificationsClear = async () => {
    await clearFollowedNotificationsMutation.mutateAsync(userId);
  };

  return {
    fetchNotifications,
    fetchFollowingNotifications: fetchFollowedNotifications,
    handleNotificationsClear,
    handleFollowedNotificationsClear,
  };
};

const deleteNotifications = async (userId: string) => {
  const updatedNotifications: Notification[] = notifications.filter(
    (notification) =>
      notification.recipientId !== userId ||
      (notification.isNewEntry && notification.isNewEntry.value !== false)
  );
  notifications.splice(0, notifications.length, ...updatedNotifications);
  return Promise.resolve(updatedNotifications);
};

const deleteFollowedNotifications = async (userId: string) => {
  // Believe the dummy method is wrong but it works regardless
  const updatedNotifications: Notification[] = notifications.filter(
    (notification) =>
      notification.recipientId !== userId ||
      notification.isNewEntry?.value !== true
  );
  return Promise.resolve(
    notifications.splice(0, notifications.length, ...updatedNotifications)
  );
};

export default useNotifications;
