import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import comments from "../data/comments";
import Comment, { CommentDataToSubmit } from "../entities/Comment";

const PAGE_SIZE = 10;

const useComments = (entryId: string) => {
  const fetchComments = (pageParam: number) => {
    const startIndex = (pageParam - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedData = comments.slice(startIndex, endIndex);

    return Promise.resolve(paginatedData);
  };

  return useInfiniteQuery<Comment[], Error>({
    queryKey: ["comments", entryId],
    queryFn: ({ pageParam }) => fetchComments(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage[lastPage.length - 1]._id &&
        lastPage[lastPage.length - 1]._id !== comments[comments.length - 1]._id
        ? allPages.length + 1
        : undefined;
    },
  });
};

const useComment = async (commentId: string) => {
  return Promise.resolve(comments.find((c) => c._id === commentId));
};

export const getCommentsCount = (entryId: string) => {
  // Get by contentId
  entryId;
  return comments.length;
};

export const createComment = async (commentData: CommentDataToSubmit) => {
  const comment: Comment = {
    _id: "",
    text: commentData.text,
    userId: "userIdFromZustand",
    entryId: commentData.entryId,
    likes: [],
    timestamp: new Date(),
  };

  return Promise.resolve(comments.push(comment));
};

export const useCommentLikes = (commentId: string, entryId: string) => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: (commentId: string) => likeComment(commentId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["comments", entryId] }),
  });

  const unlikeMutation = useMutation({
    mutationFn: (commentId: string) => unlikeComment(commentId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["comments", entryId] }),
  });

  const handleLike = async () => {
    await likeMutation.mutateAsync(commentId);
  };

  const handleUnlike = async () => {
    await unlikeMutation.mutateAsync(commentId);
  };

  return {
    handleLike,
    handleUnlike,
  };
};

const likeComment = async (commentId: string) => {
  const comment = await useComment(commentId);
  return comment?.likes.push("userIdFromZustand");
};

const unlikeComment = async (commentId: string) => {
  const comment = await useComment(commentId);
  return comment?.likes.pop();
};

export default useComments;
