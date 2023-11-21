import { useMutation, useQueryClient } from "@tanstack/react-query";
import entries from "../data/entries";
import { EntryDataToSubmit } from "../entities/Entry";

export const useEntry = (id: string) => {
  id;
  return Promise.resolve(entries[0]);
};

export const getTotalEntriesByUserName = (username: string) => {
  username;
  return Promise.resolve(2391);
};

export const createEntry = async (data: EntryDataToSubmit) => {
  // Convert to Entry
  return Promise.resolve(console.log(`Created ${data.title}`));
};

export const useEntryLikes = (entryId: string) => {
  const queryClient = useQueryClient();
  queryClient;

  const likeMutation = useMutation({
    mutationFn: (entryId: string) => likeEntry(entryId),
    // onSuccess: () =>
    // queryClient.invalidateQueries({ queryKey: ["entries", entryId] }),
  });

  const unlikeMutation = useMutation({
    mutationFn: (entryId: string) => unlikeEntry(entryId),
    // onSuccess: () =>
    // queryClient.invalidateQueries({ queryKey: ["entries", entryId] }),
  });

  const handleLike = async () => {
    await likeMutation.mutateAsync(entryId);
  };

  const handleUnlike = async () => {
    await unlikeMutation.mutateAsync(entryId);
  };

  return {
    handleLike,
    handleUnlike,
  };
};

const likeEntry = async (entryId: string) => {
  const entry = await useEntry(entryId);
  return entry?.likes.push("userIdFromZustand");
};

const unlikeEntry = async (entryId: string) => {
  const entry = await useEntry(entryId);
  return entry?.likes.pop();
};
