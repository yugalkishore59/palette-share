import {
  Container,
  Group,
  Fieldset,
  Button,
  Textarea,
  TagsInput,
  Input,
  //Select,
} from "@mantine/core";
import classes from "./Create.module.css";
import { DropzoneButton } from "./DropzoneButton";
import { useState } from "react";
import { createPost } from "../../utils/api";
import { PostType } from "../../utils/interfaces";
import { useAuth0 } from "@auth0/auth0-react";
import { SingInFirst } from "../../components/SignInFirst/SingInFirst";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PROFILE_PLACEHOLDER } from "../../utils/constants";
import { fetchPosts, resetPostsSlice } from "../../redux/slices/postSlice";

export function Create() {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [license, setLicense] = useState<string>("None");
  const [imageUrlBase64, setImageUrlBase64] = useState<string>("");
  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (isAuthenticated) {
      if (description.trim() === "") {
        setDescription("");
        window.alert("Please enter a description.");
        return;
      }
      if (imageUrlBase64.trim() === "") {
        window.alert("Please upload an image.");
        return;
      }
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
        const response = await createPost(post, idToken);
        if (!response) {
          return;
        }
        setDescription("");
        setTags([]);
        setLicense("None");
        setImageUrlBase64("");
        window.alert("submitted");
        dispatch(resetPostsSlice()); // Reset state
        dispatch(fetchPosts(1)); // Fetch fresh data
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }
  };

  return (
    <Container size="lg" p="xs" h={"100%"}>
      {isAuthenticated ? (
        <Fieldset
          legend="Create new post"
          variant="filled"
          className={classes.fieldset}
        >
          <Textarea
            label="Description"
            required
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
          <Input.Wrapper label="Upload Image" required>
            <DropzoneButton
              imageUrlBase64={imageUrlBase64}
              setImageUrlBase64={setImageUrlBase64}
            />
          </Input.Wrapper>

          <Group justify="flex-end">
            <Button onClick={handleSubmit}>Submit</Button>
          </Group>
        </Fieldset>
      ) : (
        <SingInFirst />
      )}
    </Container>
  );
}
