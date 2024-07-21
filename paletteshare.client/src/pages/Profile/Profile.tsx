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

const stats = [
  { value: "34K", label: "Followers" },
  { value: "187", label: "Follows" },
  { value: "1.6K", label: "Posts" },
];
export const Profile = () => {
  const { posts } = useSelector((state: RootState) => state.posts);
  const items = stats.map((stat) => (
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
            backgroundImage:
              "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
          }}
        />
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
          size={150}
          radius={150}
          mx="auto"
          mt={-70}
          className={classes.avatar}
        />
        <Text ta="center" fz="lg" fw={500} mt="sm">
          Bill Headbanger
        </Text>
        <Text ta="center" fz="sm" c="dimmed">
          Fullstack engineer
        </Text>
        <Group mt="md" justify="center" gap={30}>
          {items}
        </Group>
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
      </Card>
      <Stack>
        {posts.length > 0 &&
          posts.map((post, index) => <PostCard key={index} post={post} />)}
      </Stack>
    </Container>
  );
};
