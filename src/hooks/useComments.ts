import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InfiniteFetchResponse } from "../services/api-client";
import CommentService from "../services/commentService";
import Comment, {
  CommentDataToEdit,
  CommentDataToSubmit,
} from "../entities/Comment";

const PAGE_SIZE = 10;
const commentService = new CommentService();

const useComments = (entryId: string) => {
  return useInfiniteQuery<InfiniteFetchResponse<Comment>, Error>({
    queryKey: ["comments", entryId],
    queryFn: ({ pageParam }) =>
      commentService.getAll(entryId, {
        params: {
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

export const getCommentCount = async (entryId: string) => {
  return await commentService.getCommentCount(entryId);
};

export const useCommentMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CommentDataToSubmit) => commentService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
    onError: (error: any) => {
      throw new Error(error);
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: CommentDataToEdit) => commentService.edit(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
    onError: (error: any) => {
      throw new Error(error);
    },
  });

  const likeMutation = useMutation({
    mutationFn: (id: string) => commentService.like(id),
    onSuccess: () => queryClient.invalidateQueries(),
    onError: (error: any) => {
      throw new Error(error);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: (id: string) => commentService.unlike(id),
    onSuccess: () => queryClient.invalidateQueries(),
    onError: (error: any) => {
      throw new Error(error);
    },
  });

  const handleCreate = async (data: CommentDataToSubmit) => {
    await createMutation.mutateAsync(data);
  };

  const handleEdit = async (data: CommentDataToEdit) => {
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

export const deleteComment = async (commentId: string) => {
  return await commentService.delete(commentId);
};

export default useComments;
