import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import entries from "../data/entries";
import Entry, { EntryDataToSubmit } from "../entities/Entry";

const PAGE_SIZE = 10;

const useEntries = () => {
  const fetchEntries = (pageParam: number) => {
    const startIndex = (pageParam - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedData = entries.slice(startIndex, endIndex);

    return Promise.resolve(paginatedData);
  };

  return useInfiniteQuery<Entry[], Error>({
    queryKey: ["entries"],
    queryFn: ({ pageParam }) => fetchEntries(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage[lastPage.length - 1] &&
        lastPage[lastPage.length - 1]._id !== entries[entries.length - 1]._id
        ? allPages.length + 1
        : undefined;
    },
  });
};

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

export default useEntries;
