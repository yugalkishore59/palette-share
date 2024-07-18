import {
  Image,
  Container,
  Card,
  Group,
  Text,
  Menu,
  ActionIcon,
  SimpleGrid,
  rem,
  Paper,
  Fieldset,
  TextInput,
  Button,
  Textarea,
  TagsInput,
  Select,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import classes from "./Create.module.css";
import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons-react";
import { DropzoneButton } from "./DropzoneButton";
import { useState } from "react";
import { createPost } from "../../utils/api";
import { PostType } from "../../utils/interfaces";

const images = [
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
];

export function Create() {
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [license, setLicense] = useState<string>("None");
  const [imageUrlBase64, setImageUrlBase64] = useState<string>();

  const handleSubmit = () => {
    const post: PostType = {
      description: description,
      userId: "1",
      name: "John Doe",
      username: "johndoe",
      imageUrl: imageUrlBase64,
      tags: tags,
      likes: 0,
      comments: [],
      license: license,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    createPost(post);
    setDescription("");
    setTags([]);
    setLicense("None");
    window.alert("submitted");
  };

  return (
    <Container size="lg" p="xs">
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
    </Container>
  );
}
