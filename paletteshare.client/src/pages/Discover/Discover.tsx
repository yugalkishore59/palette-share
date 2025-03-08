import { useAuth0 } from "@auth0/auth0-react";
import { SingInFirst } from "../../components/SignInFirst/SingInFirst";
import {
  ActionIcon,
  Avatar,
  Container,
  Group,
  Loader,
  Stack,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconArrowRight,
  IconChevronRight,
  IconSearch,
} from "@tabler/icons-react";
import { GradientSegmentedControl } from "../../components/Discover/GradientSegmentedControl";
import classes from "./Discover.module.css";
import { useState } from "react";
import { getPostsBySearchTerm, getUsersBySearchTerm } from "../../utils/api";
import { PostType, UserType } from "../../utils/interfaces";
import { Link } from "react-router-dom";
import { DiscoverFilters } from "../../utils/enums";
import { PostCard } from "../../components/Post/PostCard";

export const Discover = () => {
  const { isAuthenticated } = useAuth0();
  const theme = useMantineTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResultUsers, setSearchResultUsers] = useState<UserType[]>([]);
  const [searchResultPosts, setSearchResultPosts] = useState<PostType[]>([]);
  const [filter, setFilter] = useState<DiscoverFilters>(DiscoverFilters.POSTS);
  const [isLoading, setIsLoading] = useState(false);
  //const [searchResultsPosts, setSearchResultsPosts] = useState<PostType[]>([]);
  //const [searchResultsHashTags, setSearchResultsHashTags] = useState([]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchTerm("");
      return;
    }
    setIsLoading(true);
    try {
      const [users, posts] = await Promise.all([
        getUsersBySearchTerm(searchTerm),
        getPostsBySearchTerm(searchTerm),
      ]);

      setSearchResultUsers(users);
      setSearchResultPosts(posts);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const opetionalDeleteFunc = (post: PostType) => {
    setSearchResultPosts((prevPosts) =>
      prevPosts.filter((_post) => _post.id !== post.id)
    );
  };

  const optionalLikeFunc = (post: PostType) => {
    setSearchResultPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === post.id ? post : p))
    );
  };

  return (
    <Container size="md" p="xs" h={"100%"} className={classes.container}>
      {isAuthenticated ? (
        <>
          <TextInput
            radius="md"
            w={"100%"}
            size="md"
            placeholder="Search questions"
            rightSectionWidth={42}
            leftSection={
              <IconSearch
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
                onClick={handleSearch}
              >
                <IconArrowRight
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            }
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />
          <GradientSegmentedControl filter={filter} setFilter={setFilter} />
          {isLoading && <Loader m={"xl"} />}
          {(filter === DiscoverFilters.POSTS ||
            filter === DiscoverFilters.HASH_TAGS) && (
            <Stack>
              {searchResultPosts
                .filter((post) => {
                  if (filter === DiscoverFilters.HASH_TAGS) {
                    return post.tags.some((tag) =>
                      tag.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                  }
                  return true;
                })
                .map((post, index) => (
                  <PostCard
                    key={index}
                    post={post}
                    opetionalDeleteFunc={opetionalDeleteFunc}
                    optionalLikeFunc={optionalLikeFunc}
                  />
                ))}
            </Stack>
          )}
          {filter === DiscoverFilters.PEOPLE && (
            <div className={classes.userContainer}>
              {searchResultUsers.map((user, index) => (
                <Group justify="space-between" key={index}>
                  <Link
                    to={`/profile/${user.username}`}
                    className={classes.userProfileLink}
                  >
                    <UnstyledButton className={classes.user}>
                      <Group>
                        <Avatar src={user.profilePictureUrl} radius="xl" />

                        <div style={{ flex: 1 }}>
                          <Text size="sm" fw={500}>
                            {user.name}
                          </Text>
                          <Text c="dimmed" size="xs">
                            {user.username}
                          </Text>
                        </div>

                        <IconChevronRight
                          style={{ width: rem(14), height: rem(14) }}
                          stroke={1.5}
                        />
                      </Group>
                    </UnstyledButton>
                  </Link>
                </Group>
              ))}
            </div>
          )}
        </>
      ) : (
        <SingInFirst />
      )}
    </Container>
  );
};
