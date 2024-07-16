import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useEffect, useRef, useState } from "react";
import { incrementPage, resetPosts } from "../redux/slices/postSlice";
import { fetchPosts } from "../redux/slices/postSlice";
import { Button, Container, ScrollArea, Stack } from "@mantine/core";

import {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from "../utils/api";
import { PostType } from "../utils/interfaces";
import { PostCard } from "../components/Post/PostCard";
import { SCROLL_THRESHOLD } from "../utils/constants";
import { GalleryProps } from "../utils/interfaces";

export const Gallery = ({ scrollableRef }: GalleryProps) => {
  const dispatch = useDispatch();
  const { posts, page, loading, error } = useSelector(
    (state: RootState) => state.posts
  );
  const [flag, setFlag] = useState(false);

  // fetch posts when component mounts
  useEffect(() => {
    dispatch(fetchPosts(1));
  }, []);
  const pageRef = useRef<number>(page); // Create a ref for page

  useEffect(() => {
    pageRef.current = page; // Update pageRef whenever page changes
  }, [page]);

  // load more posts when user reaches viewport height + threshold
  useEffect(() => {
    const loadMorePosts = () => {
      if (!loading) {
        dispatch(fetchPosts(pageRef.current + 1));
        dispatch(incrementPage());
        setFlag(false);
      }
    };
    const handleScroll = () => {
      if (!scrollableRef.current) return;
      const { scrollHeight, scrollTop, clientHeight } = scrollableRef.current;
      const isNearBottom =
        scrollHeight - scrollTop <= clientHeight + SCROLL_THRESHOLD;
      if (isNearBottom && !flag) {
        setFlag(true);
        loadMorePosts();
      }
    };

    scrollableRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      scrollableRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [scrollableRef]);

  return (
    <Container size="lg" p="xs">
      <Stack>
        {posts.length > 0 &&
          posts.map((post, index) => <PostCard key={index} post={post} />)}
      </Stack>
    </Container>
  );
};
