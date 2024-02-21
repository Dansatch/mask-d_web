import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Entry, { EntryDataToEdit, EntryDataToSubmit } from "../entities/Entry";
import EntryService from "../services/entryService";
import { InfiniteFetchResponse } from "../services/api-client";
import useAppStore from "../store";

const PAGE_SIZE = 10;
const entryService = new EntryService();

const useEntries = (mostLiked?: boolean) => {
  const entryQuery = useAppStore().entryQueryStore().entryQuery;

  const getAllEntries = () => {
    return useInfiniteQuery<InfiniteFetchResponse<Entry>, Error>({
      queryKey: ["entries", entryQuery],
      queryFn: ({ pageParam }) =>
        entryService.getAll({
          params: {
            searchText: entryQuery.searchText,
            sortOption: entryQuery.sortOption,
            authorId: entryQuery.authorId,
            timeFilter: entryQuery.timeFilterValue,
            page: pageParam,
            pageSize: PAGE_SIZE,
          },
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.page < lastPage.totalPages
          ? allPages.length + 1
          : undefined;
      },
    });
  };

  const getMostLikedEntries = () => {
    return useInfiniteQuery<InfiniteFetchResponse<Entry>, Error>({
      queryKey: ["entries", "user-most-liked"],
      queryFn: () => entryService.getUserMostLiked(),
      initialPageParam: 1,
      getNextPageParam: () => undefined,
    });
  };

  if (mostLiked) return getMostLikedEntries();
  else return getAllEntries();
};

export const useEntry = (id: string) => {
  return useQuery({
    queryKey: ["entry", id],
    queryFn: () => entryService.get(id),
  });
};

export const getTotalEntriesByUserName = (username: string) => {
  username;
  return Promise.resolve(2391);
};

export const useEntryMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: EntryDataToSubmit) => entryService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["entries"] }),
    onError: (error: any) => {
      throw new Error(error);
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: EntryDataToEdit) => entryService.edit(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["entries"] }),
    onError: (error: any) => {
      throw new Error(error);
    },
  });

  const likeMutation = useMutation({
    mutationFn: (id: string) => entryService.like(id),
    onSuccess: () => queryClient.invalidateQueries(),
    onError: (error: any) => {
      throw new Error(error);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: (id: string) => entryService.unlike(id),
    onSuccess: () => queryClient.invalidateQueries(),
    onError: (error: any) => {
      throw new Error(error);
    },
  });

  const handleCreate = async (data: EntryDataToSubmit) => {
    await createMutation.mutateAsync(data);
  };

  const handleEdit = async (data: EntryDataToEdit) => {
    await editMutation.mutateAsync(data);
  };

  const handleLike = async (id: string) => {
    await likeMutation.mutateAsync(id);
  };

  const handleUnlike = async (id: string) => {
    await unlikeMutation.mutateAsync(id);
  };

  return { handleCreate, handleEdit, handleLike, handleUnlike };
};

export default useEntries;
