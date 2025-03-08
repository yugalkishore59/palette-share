import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useEffect, useRef, useState } from "react";
import { incrementPageSlice } from "../redux/slices/postSlice";
import { fetchPosts } from "../redux/slices/postSlice";
import { Container, Skeleton, Stack } from "@mantine/core";

import { PostCard } from "../components/Post/PostCard";
import { SCROLL_THRESHOLD } from "../utils/constants";
import { GalleryProps } from "../utils/interfaces";
import classes from "./Gallery.module.css";

export const Gallery = ({ scrollableRef }: GalleryProps) => {
  const dispatch = useDispatch();
  const { posts, page, loading, isLastPost } = useSelector(
    (state: RootState) => state.posts
  );
  const [flag, setFlag] = useState(false);

  const pageRef = useRef<number>(page); // Create a ref for page
  const isLastPostRef = useRef<boolean>(isLastPost); // Create a ref for page

  // fetch posts when component mounts
  useEffect(() => {
    if (posts.length === 0) dispatch(fetchPosts(1));
  }, []);

  useEffect(() => {
    pageRef.current = page; // Update pageRef whenever page changes
    isLastPostRef.current = isLastPost;
  }, [page, isLastPost]);

  // load more posts when user reaches viewport height + threshold
  useEffect(() => {
    const loadMorePosts = () => {
      if (!loading) {
        dispatch(fetchPosts(pageRef.current + 1));
        dispatch(incrementPageSlice());
        setFlag(false);
      }
    };
    const handleScroll = () => {
      if (!scrollableRef.current || isLastPostRef.current) return;
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
    <Container size="sm" pt="xs" pb="xs" pl={"0"} pr={"0"}>
      <Stack>
        {posts.length > 0 &&
          posts.map((post, index) => <PostCard key={index} post={post} />)}
        {posts.length === 0 && (
          <Container size="sm" pt="xs" pb="xs" pl={"0"} pr={"0"} w="100%">
            <Skeleton height={50} circle />
            <Skeleton height={200} mt={12} />
            <Skeleton height={12} mt={6} radius="xl" />
            <Skeleton height={12} mt={6} radius="xl" />
            <Skeleton height={12} mt={6} radius="xl" />
            <Skeleton height={12} mt={6} radius="xl" />
            <Skeleton height={12} mt={6} width="70%" radius="xl" />
            <div className={classes.rowFlex}>
              <Skeleton height={30} w={30} />
              <Skeleton height={30} w={30} />
            </div>
          </Container>
        )}
      </Stack>
    </Container>
  );
};
