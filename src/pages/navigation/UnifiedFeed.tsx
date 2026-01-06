import MarketPost from "../../features/marketplace/components/MarketPost";
import MaterialPost from "../../features/materials/components/MaterialPost";
import RequestPost from "../../features/requests/components/RequestPost";
import { useEffect, useRef } from "react";
import { usePosts } from "../../common/hooks/usePosts";

const UnifiedFeed = () => {
  const {
    posts,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts();

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <div>Loading posts...</div>;
  }
  if (error) {
    return <div>Error loading posts: {error.message}</div>;
  }

  console.log(posts);

  return (
    <div className="space-y-4 pt-12 pb-30 h-dvh overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {posts.map((post) => {
        switch (post.post_type) {
          case "marketplace":
            return <MarketPost key={post.id} post={post} />;

          case "material":
            return <MaterialPost key={post.id} post={post} />;

          case "post":
            return <RequestPost key={post.id} post={post} />;

          default:
            return null;
        }
      })}
    </div>
  );
};

export default UnifiedFeed;
