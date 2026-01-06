import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../services/getPosts";

export const usePosts = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  // Flatten the pages into a single array
  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    posts,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};