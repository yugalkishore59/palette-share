import {
  Button,
  Container,
  Fieldset,
  Group,
  Input,
  Stack,
  Textarea,
} from "@mantine/core";
import { IconAt, IconLogout } from "@tabler/icons-react";
import { DropzoneButton } from "../Create/DropzoneButton";
import { useState } from "react";
import classes from "./CreateProfile.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { COVER_PLACEHOLDER, PROFILE_PLACEHOLDER } from "../../utils/constants";
import { createUser, getUserByUsername } from "../../utils/api";
import { UserType } from "../../utils/interfaces";

export const CreateProfile = () => {
  const { isLoading, logout, getIdTokenClaims } = useAuth0();

  const [imageUrlBase64, setImageUrlBase64] =
    useState<string>(PROFILE_PLACEHOLDER);
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");

  const handleSubmit = async () => {
    setNameError("");
    setUsernameError("");
    if (name === "") {
      setNameError("Name cannot be empty");
      return;
    }
    if (username === "") {
      setUsernameError("Username cannot be empty");
      return;
    }
    const response = await getUserByUsername(username);
    if (response) {
      setUsernameError("Username already exists");
      return;
    }

    try {
      const idTokenClaims = await getIdTokenClaims();
      const idToken = idTokenClaims?.__raw ?? "";
      const email = idTokenClaims?.email ?? "";
      const profilePictureUrl =
        imageUrlBase64 === "" || imageUrlBase64 === PROFILE_PLACEHOLDER
          ? idTokenClaims?.picture ?? PROFILE_PLACEHOLDER
          : imageUrlBase64;
      if (email === "") {
        console.error("Error fetching email. Please log out and try again.");
        return;
      }
      //   createProfile(idToken);
      const _user: UserType = {
        name: name,
        username: username,
        email: email,
        profilePictureUrl: profilePictureUrl,
        coverPhotoUrl: COVER_PLACEHOLDER,
        bio: bio,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        followers: [],
        following: [],
      };
      createUser(_user, idToken);
      setImageUrlBase64(PROFILE_PLACEHOLDER);
      setName("");
      setUsername("");
      setBio("");
      window.alert("created profile");
      window.location.reload();
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };
  return (
    <Container size="sm" p="xs" h={"100%"} className={classes.container}>
      <Fieldset legend="Create Profile" variant="filled">
        <Stack>
          <Input.Wrapper withAsterisk label="Name" error={nameError}>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Input.Wrapper>

          <Input.Wrapper
            withAsterisk
            label="Username"
            description="Pick a unique username"
            error={usernameError}
          >
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              leftSection={<IconAt size={16} />}
            />
          </Input.Wrapper>

          <Textarea
            label="Bio"
            placeholder="Tell people about yourself"
            autosize
            minRows={1}
            maxRows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <Input.Wrapper label="Profile Picture">
            <DropzoneButton setImageUrlBase64={setImageUrlBase64} />
          </Input.Wrapper>

          <Group justify="flex-end" mt="md">
            <Button
              leftSection={<IconLogout />}
              variant="outline"
              loading={isLoading}
              loaderProps={{ type: "dots" }}
              w={150}
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Log Out
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </Group>
        </Stack>
      </Fieldset>
    </Container>
  );
};
