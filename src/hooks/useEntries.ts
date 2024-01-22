import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import entries from "../data/entries";
import Entry, { EntryDataToEdit, EntryDataToSubmit } from "../entities/Entry";
import useAppStore from "../store";

const PAGE_SIZE = 10;

// Get parameters from useAppStore().entryQueryStore().entryQuery
const useEntries = (authorId?: string, mostLiked?: boolean) => {
  let entriesToReturn = entries;

  if (authorId) {
    entriesToReturn = entriesToReturn.filter(
      (entry) => entry.userId === authorId
    );
  }

  if (mostLiked) {
    entriesToReturn = entriesToReturn
      .sort((a, b) => b.likes.length - a.likes.length) // Sort by number of likes
      .slice(0, 3); // Get top 3 most liked entries
  }

  const fetchEntries = (pageParam: number) => {
    const startIndex = (pageParam - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedData = entriesToReturn.slice(startIndex, endIndex);

    return Promise.resolve(paginatedData);
  };

  const queryKey =
    authorId && !mostLiked
      ? ["entries", authorId]
      : authorId && mostLiked
      ? ["entries", authorId, "mostLiked"]
      : ["entries"];

  return useInfiniteQuery<Entry[], Error>({
    queryKey,
    queryFn: ({ pageParam }) => fetchEntries(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage[lastPage.length - 1] &&
        lastPage[lastPage.length - 1]._id !==
          entriesToReturn[entriesToReturn.length - 1]?._id
        ? allPages.length + 1
        : undefined;
    },
  });
};

export const useEntry = (id: string) => {
  return Promise.resolve(entries.find((entry) => entry._id === id));
};

export const getTotalEntriesByUserName = (username: string) => {
  username;
  return Promise.resolve(2391);
};

export const createEntry = async (data: EntryDataToSubmit) => {
  // Convert to Entry
  return Promise.resolve(console.log(`Created ${data.title}`));
};

export const editEntry = async (data: EntryDataToEdit) => {
  // Convert to Entry
  return Promise.resolve(console.log(`Edited ${data.title}`));
};

export const useEntryLikes = (entryId: string) => {
  const queryClient = useQueryClient();
  queryClient;
  const currentUserId = useAppStore().currentUser._id;

  const likeMutation = useMutation({
    mutationFn: () => likeEntry(entryId, currentUserId),
    // onSuccess: () =>
    // queryClient.invalidateQueries({ queryKey: ["entries", entryId] }),
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unlikeEntry(entryId, currentUserId),
    // onSuccess: () =>
    // queryClient.invalidateQueries({ queryKey: ["entries", entryId] }),
  });

  const handleLike = async () => {
    await likeMutation.mutateAsync();
  };

  const handleUnlike = async () => {
    await unlikeMutation.mutateAsync();
  };

  return {
    handleLike,
    handleUnlike,
  };
};

const likeEntry = async (entryId: string, currentUserId: string) => {
  const entry = await useEntry(entryId);
  return entry?.likes.push(currentUserId);
};

const unlikeEntry = async (entryId: string, currentUserId: string) => {
  currentUserId; // to unlike
  const entry = await useEntry(entryId);
  return entry?.likes.pop();
};

export default useEntries;
