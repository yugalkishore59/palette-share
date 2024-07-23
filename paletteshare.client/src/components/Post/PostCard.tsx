import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  ActionIcon,
  Menu,
  rem,
  Grid,
  Avatar,
  Divider,
  // Flex,
  Stack,
  // Button,
  UnstyledButton,
} from "@mantine/core";
import classes from "./PostCard.module.css";
import {
  IconDots,
  IconEdit,
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
} from "@tabler/icons-react";

import { PostProps } from "../../utils/interfaces";
import { useFullscreen } from "@mantine/hooks";
import { deletePost, updatePost } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { deletePostSlice } from "../../redux/slices/postSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { updatePostSlice } from "../../redux/slices/postSlice";
import { useEffect, useState } from "react";

export function PostCard({ post }: PostProps) {
  const dispatch = useDispatch();
  const { ref, toggle, fullscreen } = useFullscreen();
  const { isAuthenticated, getIdTokenClaims, loginWithRedirect } = useAuth0();
  const { user } = useSelector((state: RootState) => state.user);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(user?.username ?? ""));
  }, [post, user]);
  const formatUpdatedAt = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return "Yesterday";
    }

    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }

    return date.toLocaleDateString(); // Default format: MM/DD/YYYY
  };

  const handleDelete = async () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
    if (post.id) {
      try {
        const idTokenClaims = await getIdTokenClaims();
        const idToken = idTokenClaims?.__raw ?? "";

        deletePost(post.id, idToken);
        dispatch(deletePostSlice(post.id));
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
    if (user?.username) {
      const postid = post.id ?? "";
      const idTokenClaims = await getIdTokenClaims();
      const idToken = idTokenClaims?.__raw ?? "";

      if (isLiked) {
        setIsLiked(false);
        const updatedPost = {
          ...post,
          likes: post.likes.filter((like) => like !== user.username),
        };
        dispatch(updatePostSlice(updatedPost));
        updatePost(postid, updatedPost, idToken);
      } else {
        setIsLiked(true);
        const updatedPost = { ...post, likes: [...post.likes, user.username] };
        dispatch(updatePostSlice(updatedPost));
        updatePost(postid, updatedPost, idToken);
      }
    }
  };

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Link
            className={classes.profileLink}
            to={`/profile/${post.username}`}
          >
            <UnstyledButton className={classes.user}>
              <Group>
                <Avatar src={post.profilePictureUrl} radius="xl" />

                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    {post.name}
                  </Text>

                  <Text c="dimmed" size="xs">
                    {post.username} • {formatUpdatedAt(post.updatedAt || "")}
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
                <Menu.Item
                  leftSection={
                    <IconEdit style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Edit
                </Menu.Item>

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
        <Grid gutter={0}>
          <Grid.Col
            span={{ base: 12, lg: 6 }}
            className={classes.ImageContainer}
          >
            <Image
              ref={ref}
              src={post.imageUrl}
              alt={`${post.username}'s post`}
              h={420}
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
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }} p={"xs"}>
            <Stack gap={0} justify="space-between" h={"100%"}>
              <Text fz="sm" lineClamp={12}>
                {post.description}
              </Text>
              <div>
                <Group gap={4} pt={"xs"}>
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
                <Divider my="md" />
                <Text c="dimmed" size="sm">
                  {post.likes.length}{" "}
                  {post.likes.length === 1 ? "like" : "likes"}
                  {/* • {post.comments.length} comments */}
                </Text>

                <Group mt="xs">
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
                  {/* <ActionIcon variant="default" radius="md" size={36}>
                    <IconMessageCircle stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon variant="default" radius="md" size={36}>
                    <IconShare stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon variant="default" radius="md" size={36}>
                    <IconDownload stroke={1.5} />
                  </ActionIcon> */}
                </Group>
              </div>
            </Stack>
          </Grid.Col>
        </Grid>
      </Card.Section>
    </Card>
  );
}
