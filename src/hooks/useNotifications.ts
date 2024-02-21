import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Notification from "../entities/Notification";
import NotificationService from "../services/notificationService";

const useNotifications = () => {
  const queryClient = useQueryClient();
  const notificationService = new NotificationService();

  const fetchNotifications = useQuery<Notification[], Error>({
    queryKey: ["notifications"],
    queryFn: () => notificationService.getAll(["followAlert", "other"]),
  });

  const fetchEntryAlerts = useQuery<Notification[], Error>({
    queryKey: ["notifications", "entryAlerts"],
    queryFn: () => notificationService.getAll(["newEntry"]),
  });

  const clearNotificationsMutation = useMutation({
    mutationFn: () => notificationService.delete(["followAlert", "other"]),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const clearEntryAlertsMutation = useMutation({
    mutationFn: () => notificationService.delete(["newEntry"]),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["notifications", "entryAlerts"],
      }),
  });

  const handleNotificationsClear = async () => {
    await clearNotificationsMutation.mutateAsync();
  };

  const handleEntryAlertsClear = async () => {
    await clearEntryAlertsMutation.mutateAsync();
  };

  return {
    fetchNotifications,
    fetchEntryAlerts,
    handleNotificationsClear,
    handleEntryAlertsClear,
  };
};

export default useNotifications;
