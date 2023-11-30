import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import entries from "../data/entries";
import Entry, { EntryDataToSubmit } from "../entities/Entry";

const PAGE_SIZE = 10;

const useEntries = (authorId?: string, mostLiked?: boolean) => {
  let entriesToReturn = entries;
  if (authorId)
    entriesToReturn = entriesToReturn.filter(
      (entry) => entry.userId === authorId
    );
  mostLiked;

  const fetchEntries = (pageParam: number) => {
    const startIndex = (pageParam - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedData = entriesToReturn.slice(startIndex, endIndex);

    return Promise.resolve(paginatedData);
  };

  return useInfiniteQuery<Entry[], Error>({
    queryKey: ["entries"],
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

// userId to be gotten from zustand state
export const useEntryLikes = (entryId: string, userId: string) => {
  const queryClient = useQueryClient();
  queryClient;

  const likeMutation = useMutation({
    mutationFn: () => likeEntry(entryId, userId),
    // onSuccess: () =>
    // queryClient.invalidateQueries({ queryKey: ["entries", entryId] }),
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unlikeEntry(entryId, userId),
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

const likeEntry = async (entryId: string, userId: string) => {
  const entry = await useEntry(entryId);
  return entry?.likes.push(userId);
};

const unlikeEntry = async (entryId: string, userId: string) => {
  userId;
  const entry = await useEntry(entryId);
  return entry?.likes.pop();
};

export const isLiked = async (userId: string, entryId: string) => {
  const entry = await useEntry(entryId);
  return entry?.likes.includes(userId);
};

export default useEntries;
