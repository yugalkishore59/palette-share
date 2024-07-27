import { useAuth0 } from "@auth0/auth0-react";
import { SingInFirst } from "../../components/SignInFirst/SingInFirst";
import {
  ActionIcon,
  Avatar,
  Container,
  Group,
  Table,
  Text,
  TextInput,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { GradientSegmentedControl } from "../../components/Discover/GradientSegmentedControl";
import classes from "./Discover.module.css";
import { useState } from "react";
import { getUsersBySearchTerm } from "../../utils/api";
import { PostType, UserType } from "../../utils/interfaces";
import { Link } from "react-router-dom";

export const Discover = () => {
  const { isAuthenticated } = useAuth0();
  const theme = useMantineTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResultsUsers, setSearchResultsUsers] = useState<UserType[]>([]);
  const [searchResultsPosts, setSearchResultsPosts] = useState<PostType[]>([]);
  const [searchResultsHashTags, setSearchResultsHashTags] = useState([]);

  const handleSearch = async () => {
    setSearchTerm("");
    const users = await getUsersBySearchTerm(searchTerm);
    setSearchResultsUsers(users);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const rows = searchResultsUsers.map((_user, index) => (
    <Table.Tr key={index} className={classes.tr}>
      <Link to={`/profile/${_user.username}`} className={classes.unstyledLink}>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={40} src={_user.profilePictureUrl} radius={40} />
            <div>
              <Text fz="sm" fw={500}>
                {_user.name}
              </Text>
              <Text c="dimmed" fz="xs">
                {_user.username}
              </Text>
            </div>
          </Group>
        </Table.Td>
      </Link>
    </Table.Tr>
  ));

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
          <GradientSegmentedControl />
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="md">
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </>
      ) : (
        <SingInFirst />
      )}
    </Container>
  );
};
