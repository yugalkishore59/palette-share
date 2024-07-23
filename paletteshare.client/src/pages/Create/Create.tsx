import {
  Container,
  Group,
  Fieldset,
  Button,
  Textarea,
  TagsInput,
  Select,
} from "@mantine/core";
// import classes from "./Create.module.css";
import { DropzoneButton } from "./DropzoneButton";
import { useState } from "react";
import { createPost } from "../../utils/api";
import { PostType } from "../../utils/interfaces";
import { useAuth0 } from "@auth0/auth0-react";
import { SingInFirst } from "../../components/SignInFirst/SingInFirst";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PROFILE_PLACEHOLDER } from "../../utils/constants";

export function Create() {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [license, setLicense] = useState<string>("None");
  const [imageUrlBase64, setImageUrlBase64] = useState<string>();
  const { user } = useSelector((state: RootState) => state.user);

  const handleSubmit = async () => {
    if (isAuthenticated) {
      try {
        const idTokenClaims = await getIdTokenClaims();
        const idToken = idTokenClaims?.__raw ?? "";

        const userId = user?.id;
        const name = user?.name;
        const username = user?.username;
        const profilePictureUrl =
          user?.profilePictureUrl ?? PROFILE_PLACEHOLDER;

        if (!userId || !name || !username || !profilePictureUrl) {
          return;
        }

        const post: PostType = {
          description: description,
          userId: userId,
          name: name,
          username: username,
          profilePictureUrl: profilePictureUrl,
          imageUrl: imageUrlBase64,
          tags: tags,
          likes: [],
          comments: [],
          license: license,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        createPost(post, idToken);
        setDescription("");
        setTags([]);
        setLicense("None");
        window.alert("submitted");
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }
  };

  return (
    <Container size="lg" p="xs" h={"100%"}>
      {isAuthenticated ? (
        <Fieldset legend="Create new post" variant="filled">
          <Textarea
            label="Description"
            placeholder="Whats on your mind?"
            autosize
            minRows={4}
            maxRows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TagsInput
            label="Tags"
            description="Add up to 3 tags"
            placeholder="Enter tag"
            clearable
            maxTags={3}
            value={tags}
            onChange={setTags}
          />
          <Select
            label="License"
            placeholder="Pick license"
            data={["None", "MIT", "CC BY 4.0", "GFDL", "CC BY-SA 4.0"]}
            searchable
            nothingFoundMessage="Nothing found..."
            allowDeselect={false}
            checkIconPosition="right"
            value={license}
            onOptionSubmit={setLicense}
          />
          <DropzoneButton setImageUrlBase64={setImageUrlBase64} />

          <Group justify="flex-end" mt="md">
            <Button onClick={handleSubmit}>Submit</Button>
          </Group>
        </Fieldset>
      ) : (
        <SingInFirst />
      )}
    </Container>
  );
}
