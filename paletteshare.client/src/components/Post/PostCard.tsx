import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  ActionIcon,
  Menu,
  rem,
  //Grid,
  Avatar,
  Divider,
  // Flex,
  //Stack,
  // Button,
  UnstyledButton,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import classes from "./PostCard.module.css";
import {
  IconDots,
  // IconEdit,
  IconHash,
  IconTrash,
  IconHeart,
  // IconDownload,
  // IconShare,
  // IconMessageCircle,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconChevronRight,
  IconHeartFilled,
  IconMessage,
  IconMessageFilled,
  IconPaint,
} from "@tabler/icons-react";

import { CommentType, PostProps } from "../../utils/interfaces";
import { useFullscreen } from "@mantine/hooks";
import { deletePost, updatePost } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { deletePostSlice } from "../../redux/slices/postSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { updatePostSlice } from "../../redux/slices/postSlice";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function PostCard({
  post,
  opetionalDeleteFunc,
  optionalUpdatePostFunc,
}: PostProps) {
  const dispatch = useDispatch();
  const { ref, toggle, fullscreen } = useFullscreen();
  const { isAuthenticated, getIdTokenClaims, loginWithRedirect } = useAuth0();
  const { user } = useSelector((state: RootState) => state.user);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);

  const theme = useMantineTheme();

  useEffect(() => {
    setIsLiked(post.likes.includes(user?.username ?? ""));
  }, [post, user]);
  const formatTimeElapsed = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date"; // Handle invalid date input

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays}d ago`;

    // Use localized long format for older dates (e.g., "January 15, 2024")
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = async () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
    if (post) {
      try {
        const idTokenClaims = await getIdTokenClaims();
        const idToken = idTokenClaims?.__raw ?? "";
        const postId = post.id ?? "";

        deletePost(postId, idToken);
        dispatch(deletePostSlice(postId));
        opetionalDeleteFunc?.(post);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    if (user?.username) {
      const postid = post.id ?? "";
      const idTokenClaims = await getIdTokenClaims();
      const idToken = idTokenClaims?.__raw ?? "";

      const updatedLikes = isLiked
        ? post.likes.filter((like) => like !== user.username) // Unlike
        : [...post.likes, user.username]; // Like

      const updatedPost = { ...post, likes: updatedLikes };

      try {
        dispatch(updatePostSlice(updatedPost));
        updatePost(postid, updatedPost, idToken);
        optionalUpdatePostFunc?.(updatedPost);
        setIsLiked(!isLiked);
      } catch (error) {
        console.error("Failed to update like:", error);
      }
    }
  };

  const handleComment = async () => {
    if (comment.trim() === "") {
      setComment("");
      return;
    }

    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    if (!user?.username) return;

    const postid = post.id ?? "";
    const idTokenClaims = await getIdTokenClaims();
    const idToken = idTokenClaims?.__raw ?? "";

    const newComment: CommentType = {
      id: uuidv4(),
      userId: user.id ?? "",
      username: user.username,
      content: comment,
      createdAt: new Date().toISOString(),
    };

    const updatedPost = { ...post, comments: [...post.comments, newComment] };

    try {
      dispatch(updatePostSlice(updatedPost));
      optionalUpdatePostFunc?.(updatedPost);
      await updatePost(postid, updatedPost, idToken);

      setComment(""); // Clear input after successful update
    } catch (error) {
      dispatch(updatePostSlice(post)); // Restore old state
      optionalUpdatePostFunc?.(post);
      console.error("Failed to update comment:", error);
      window.alert("Failed to update comment. Something is not right!");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleComment();
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
    if (user?.username) {
      const postid = post.id ?? "";
      const idTokenClaims = await getIdTokenClaims();
      const idToken = idTokenClaims?.__raw ?? "";

      const updatedPost = {
        ...post,
        comments: post.comments.filter((comment) => comment.id !== commentId),
      };
      dispatch(updatePostSlice(updatedPost));
      updatePost(postid, updatedPost, idToken);
      optionalUpdatePostFunc?.(updatedPost);
    }
  };

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Link to={`/profile/${post.username}`}>
            <UnstyledButton className={classes.user}>
              <Group>
                <Avatar src={post.profilePictureUrl} radius="xl" />

                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    {post.name}
                  </Text>

                  <Text c="dimmed" size="xs">
                    {post.username} • {formatTimeElapsed(post.createdAt || "")}
                  </Text>
                </div>

                <IconChevronRight
                  style={{ width: rem(14), height: rem(14) }}
                  stroke={1.5}
                />
              </Group>
            </UnstyledButton>
          </Link>

          {user?.username === post.username && (
            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                  <IconDots style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                {/* <Menu.Item
                  leftSection={
                    <IconEdit style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Edit
                </Menu.Item> */}

                <Menu.Item
                  leftSection={
                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }
                  color="red"
                  onClick={handleDelete}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Card.Section>
      <Card.Section>
        <div className={classes.postContainer}>
          {post.imageUrl && (
            <div className={classes.ImageContainer}>
              <Image
                ref={ref}
                src={post.imageUrl}
                alt={`${post.username}'s post`}
                mah={600}
                fit="contain"
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
              />
              <ActionIcon
                onClick={toggle}
                variant="default"
                size={36}
                aria-label="Toggle color scheme"
                className={classes.fullscreenButton}
                bg={"rgba(0,0,0,0.1)"}
                m={"xs"}
              >
                {fullscreen ? (
                  <IconArrowsMinimize stroke={1.5} />
                ) : (
                  <IconArrowsMaximize stroke={1.5} />
                )}
              </ActionIcon>
            </div>
          )}
          <Text fz="sm" lineClamp={12} pl={"1rem"} pr={"1rem"} mt={"0.5rem"}>
            {post.description}
          </Text>
          {post.tags.length > 0 && (
            <Group gap={4} pl={"1rem"} pr={"1rem"}>
              {post.tags.map((tag, index) => (
                <Badge
                  size="sm"
                  variant="light"
                  leftSection={<IconHash size={14} />}
                  key={index}
                >
                  {tag}
                </Badge>
              ))}
            </Group>
          )}
          <div>
            <Divider mb={"1rem"} />
            <Text c="dimmed" size="sm" pr={"1rem"} pl={"1rem"} mb={"0.5rem"}>
              {post.likes.length} {post.likes.length === 1 ? "like" : "likes"} ⦁{" "}
              {post.comments.length}{" "}
              {post.comments.length === 1 ? "comment" : "comments"}
            </Text>
            <Group pl={"1rem"} pr={"0.5rem"}>
              <ActionIcon
                variant="default"
                radius="md"
                size={36}
                onClick={handleLike}
              >
                {isLiked ? (
                  <IconHeartFilled className={classes.like} stroke={1.5} />
                ) : (
                  <IconHeart className={classes.like} stroke={1.5} />
                )}
              </ActionIcon>
              <ActionIcon
                variant="default"
                radius="md"
                size={36}
                onClick={() => setIsCommentOpen((prev) => !prev)}
              >
                {isCommentOpen ? (
                  <IconMessageFilled className={classes.comment} stroke={1.5} />
                ) : (
                  <IconMessage className={classes.comment} stroke={1.5} />
                )}
              </ActionIcon>
            </Group>
          </div>
          {isCommentOpen && (
            <div className={classes.commentContainer}>
              <TextInput
                type="text"
                radius="md"
                w={"100%"}
                size="md"
                placeholder="Share your thoughts..."
                rightSectionWidth={42}
                leftSection={
                  <IconMessage
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                }
                rightSection={
                  <ActionIcon
                    size={32}
                    radius="xl"
                    color={theme.primaryColor}
                    variant="filled"
                    onClick={handleComment}
                  >
                    <IconPaint
                      style={{ width: rem(18), height: rem(18) }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                }
                value={comment}
                onChange={(event) => setComment(event.currentTarget.value)}
                onKeyDown={handleKeyDown}
              />
              <div className={classes.commentList}>
                {[...post.comments]
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((comment, index) => (
                    <div key={index} className={classes.comment}>
                      <Link to={`/profile/${comment.username}`}>
                        <UnstyledButton className={classes.user}>
                          <Group>
                            <div style={{ flex: 1 }}>
                              <Text size="sm" fw={500}>
                                {comment.username}
                              </Text>
                              <Text c="dimmed" size="xs">
                                {formatTimeElapsed(comment.createdAt || "")}
                              </Text>
                            </div>
                          </Group>
                        </UnstyledButton>
                      </Link>
                      <Text size="sm" fw={500} p={"0.5rem"}>
                        {comment.content}
                      </Text>
                      {comment.username === user?.username && (
                        <ActionIcon
                          className={classes.deleteCommentButton}
                          size={32}
                          color="red"
                          variant="subtle"
                          onClick={() => handleDeleteComment(comment.id || "")}
                        >
                          <IconTrash stroke={1.5} />
                        </ActionIcon>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </Card.Section>
    </Card>
  );
}
