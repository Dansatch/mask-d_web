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
          (notification) => notification.recipientId === userId
        )
      ),
  });

  const clearNotificationsMutation = useMutation({
    mutationFn: (userId: string) => deleteNotifications(userId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const handleNotificationsClear = async () => {
    await clearNotificationsMutation.mutateAsync(userId);
  };

  return {
    fetchNotifications,
    handleNotificationsClear,
  };
};

const deleteNotifications = async (userId: string) => {
  const updatedNotifications: Notification[] = notifications.filter(
    (notification) => notification.recipientId !== userId
  );
  return Promise.resolve(
    notifications.splice(0, notifications.length, ...updatedNotifications)
  );
};

export default useNotifications;
