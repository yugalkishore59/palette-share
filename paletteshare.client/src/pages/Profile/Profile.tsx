import {
  Container,
  Card,
  Avatar,
  Text,
  Group,
  Button,
  Stack,
} from "@mantine/core";
import classes from "./Profile.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PostCard } from "../../components/Post/PostCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostType, UserType } from "../../utils/interfaces";
import { getUserByUsername, getPostsByUsername } from "../../utils/api";
import { COVER_PLACEHOLDER, PROFILE_PLACEHOLDER } from "../../utils/constants";
import { formatNumber } from "../../utils/functions";
import { useAuth0 } from "@auth0/auth0-react";

interface userStatsType {
  value: string;
  label: string;
}

enum userStatsEnum {
  FOLLOWERS = "Followers",
  FOLLOWING = "Follows",
  POSTS = "Posts",
}

export const Profile = () => {
  const { isAuthenticated } = useAuth0();
  const [posts, setPosts] = useState<PostType[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
  const [isMyProfile, setIsMyProfile] = useState<boolean | null>(null);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [userStats, setUserStats] = useState<userStatsType[]>([
    { value: "0", label: userStatsEnum.FOLLOWERS },
    { value: "0", label: userStatsEnum.FOLLOWING },
    { value: "0", label: userStatsEnum.POSTS },
  ]);

  useEffect(() => {
    if (currentUser?.username && user?.username) {
      setIsMyProfile(currentUser?.username === user?.username);
    }
  }, [currentUser, user]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const username = location.pathname.split("/")[2] ?? null;
        const response = await getUserByUsername(username);
        setCurrentUser(response);
        setUserStats([
          {
            value: formatNumber(response.followers?.length),
            label: userStatsEnum.FOLLOWERS,
          },
          {
            value: formatNumber(response.following?.length),
            label: userStatsEnum.FOLLOWING,
          },
          {
            value: formatNumber(response.posts?.length),
            label: userStatsEnum.POSTS,
          },
        ]);

        const posts = await getPostsByUsername(response.username);
        setPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };

    getUserDetails();
  }, [location]);

  const items = userStats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));
  return (
    <Container size="md" p="xs">
      <Card
        withBorder
        padding="xl"
        radius="md"
        className={classes.card}
        mb={"md"}
      >
        <Card.Section
          h={140}
          style={{
            backgroundImage: `url(${
              currentUser?.coverPhotoUrl ?? COVER_PLACEHOLDER
            })`,
          }}
        />
        <Avatar
          src={currentUser?.profilePictureUrl ?? PROFILE_PLACEHOLDER}
          size={150}
          radius={150}
          mx="auto"
          mt={-70}
          className={classes.avatar}
        />
        <Text ta="center" fz="lg" fw={500} mt="sm">
          {currentUser?.name ?? "Loading..."}
        </Text>
        <Text ta="center" fz="sm" c="dimmed">
          @{currentUser?.username ?? "Loading..."}
        </Text>
        <Group mt="md" justify="center" gap={30}>
          {items}
        </Group>
        {isAuthenticated && !isMyProfile && (
          <Group justify="center">
            <Button
              fullWidth
              radius="md"
              mt="xl"
              size="md"
              w={300}
              variant="default"
            >
              Follow
            </Button>
          </Group>
        )}
      </Card>
      <Stack>
        {posts.length > 0 &&
          posts.map((post, index) => <PostCard key={index} post={post} />)}
      </Stack>
    </Container>
  );
};
