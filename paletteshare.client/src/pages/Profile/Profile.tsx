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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PostCard } from "../../components/Post/PostCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostType, UserType } from "../../utils/interfaces";
import {
  getUserByUsername,
  getPostsByUsername,
  updateUser,
} from "../../utils/api";
import { COVER_PLACEHOLDER, PROFILE_PLACEHOLDER } from "../../utils/constants";
import { formatNumber } from "../../utils/functions";
import { useAuth0 } from "@auth0/auth0-react";
import { setUser } from "../../redux/slices/userSlice";

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
  const { isAuthenticated, getIdTokenClaims, loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<PostType[]>([]);
  const { user } = useSelector((state: RootState) => state.user); // current logged in user
  const [isMyProfile, setIsMyProfile] = useState<boolean | null>(null);
  const location = useLocation();
  const [profileOwner, setProfileOwner] = useState<UserType | null>(null); // user who's profile is being viewed
  const [userStats, setUserStats] = useState<userStatsType[]>([
    { value: "0", label: userStatsEnum.FOLLOWERS },
    { value: "0", label: userStatsEnum.FOLLOWING },
    { value: "0", label: userStatsEnum.POSTS },
  ]);
  const [isFollowed, setIsFollowed] = useState<boolean>(false); // is the logged in user following the profile owner

  useEffect(() => {
    if (profileOwner && user) {
      setIsMyProfile(profileOwner.username === user.username);
      setIsFollowed(profileOwner.followers?.includes(user.username));

      setUserStats([
        {
          value: formatNumber(profileOwner.followers?.length),
          label: userStatsEnum.FOLLOWERS,
        },
        {
          value: formatNumber(profileOwner.following?.length),
          label: userStatsEnum.FOLLOWING,
        },
        {
          value: formatNumber(profileOwner.posts?.length),
          label: userStatsEnum.POSTS,
        },
      ]);
    }
  }, [profileOwner, user]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const username = location.pathname.split("/")[2] ?? null;
        const response = await getUserByUsername(username);
        setProfileOwner(response);

        const posts = await getPostsByUsername(response.username);
        setPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };

    getUserDetails();
  }, [location]);

  const handleFollow = async () => {
    if (!profileOwner) return;
    if (!isAuthenticated) {
      loginWithRedirect();
    }
    if (user?.username) {
      const idTokenClaims = await getIdTokenClaims();
      const idToken = idTokenClaims?.__raw ?? "";
      const userId = user.id ?? "";
      const profileOwnerId = profileOwner.id ?? "";

      if (isFollowed) {
        setIsFollowed(false);

        // remove following from the logged in user
        const updatedUser = {
          ...user,
          following: user.following.filter(
            (_following) => _following !== profileOwner.username
          ),
        };
        dispatch(setUser(updatedUser));
        updateUser(userId, updatedUser, idToken);

        // remove follower from the profile owner
        const updatedProfileOwner = {
          ...profileOwner,
          followers: profileOwner.followers.filter(
            (_follower) => _follower !== user.username
          ),
        };
        setProfileOwner(updatedProfileOwner);
        updateUser(profileOwnerId, updatedProfileOwner, idToken);
      } else {
        setIsFollowed(true);

        // add following to the logged in user
        const updatedUser = {
          ...user,
          following: [...user.following, profileOwner.username],
        };
        dispatch(setUser(updatedUser));
        updateUser(userId, updatedUser, idToken);

        // add follower to the profile owner
        const updatedProfileOwner = {
          ...profileOwner,
          followers: [...profileOwner.followers, user.username],
        };
        setProfileOwner(updatedProfileOwner);
        updateUser(profileOwnerId, updatedProfileOwner, idToken);
      }
    }
  };

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
              profileOwner?.coverPhotoUrl ?? COVER_PLACEHOLDER
            })`,
          }}
        />
        <Avatar
          src={profileOwner?.profilePictureUrl ?? PROFILE_PLACEHOLDER}
          size={150}
          radius={150}
          mx="auto"
          mt={-70}
          className={classes.avatar}
        />
        <Text ta="center" fz="lg" fw={500} mt="sm">
          {profileOwner?.name ?? "Loading..."}
        </Text>
        <Text ta="center" fz="sm" c="dimmed">
          @{profileOwner?.username ?? "Loading..."}
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
              onClick={handleFollow}
            >
              {isFollowed ? "Unfollow" : "Follow"}
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
