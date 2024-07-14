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

const images = [
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
];

export function Create() {
  return (
    <Container size="md" p="xs">
      <Fieldset legend="Create new post" variant="filled">
        {/* <TextInput label="Your name" placeholder="Your name" />
        <TextInput label="Email" placeholder="Email" mt="md" /> */}
        <Textarea
          label="Description"
          placeholder="Whats on your mind?"
          autosize
          minRows={4}
          maxRows={8}
        />
        <TagsInput
          label="Tags"
          description="Add up to 3 tags"
          placeholder="Enter tag"
          clearable
          maxTags={3}
        />
        <Select
          label="License"
          placeholder="Pick license"
          data={["None", "MIT", "CC BY 4.0", "GFDL", "CC BY-SA 4.0"]}
          searchable
          nothingFoundMessage="Nothing found..."
          defaultValue="None"
          allowDeselect={false}
          checkIconPosition="right"
        />
        <DropzoneButton />

        <Group justify="flex-end" mt="md">
          <Button>Submit</Button>
        </Group>
      </Fieldset>
    </Container>
  );
}
