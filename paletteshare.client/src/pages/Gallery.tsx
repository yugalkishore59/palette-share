import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useEffect } from "react";
import { incrementPage, resetPosts } from "../redux/slices/postSlice";
import { fetchPosts } from "../redux/slices/postSlice";

export const Gallery = () => {
  const dispatch = useDispatch();
  const { posts, page, loading } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts(page));
  }, [dispatch, page]);

  const loadMorePosts = () => {
    if (!loading) {
      dispatch(incrementPage());
      dispatch(fetchPosts(page + 1));
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (bottom) {
      loadMorePosts();
    }
  };

  return (
    <div className="gallery-grid" onScroll={handleScroll}>
      {posts.map((post) => (
        <div className="gallery-grid-item" key={post._id + Math.random()}>
          {post.description}
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};
