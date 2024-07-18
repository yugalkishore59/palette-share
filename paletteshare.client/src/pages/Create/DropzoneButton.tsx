import { useRef, useState } from "react";
import {
  SimpleGrid,
  Image,
  Text,
  Group,
  Button,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import classes from "./DropzoneButton.module.css";
import { DropzoneButtonProps } from "../../utils/interfaces";

export function DropzoneButton({ setImageUrlBase64 }: DropzoneButtonProps) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const handleFileChange = (files: FileWithPath[]) => {
    setFiles(files);
    const file = files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageUrlBase64(reader.result as string);
      };
    }
  };

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  return (
    <>
      <div className={classes.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={handleFileChange}
          className={classes.dropzone}
          radius="md"
          accept={IMAGE_MIME_TYPE}
          maxSize={30 * 1024 ** 2}
        >
          <div style={{ pointerEvents: "none" }}>
            <Group justify="center">
              <Dropzone.Accept>
                <IconDownload
                  style={{ width: rem(50), height: rem(50) }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{ width: rem(50), height: rem(50) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  style={{ width: rem(50), height: rem(50) }}
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
              <Dropzone.Accept>Drop files here</Dropzone.Accept>
              <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
              <Dropzone.Idle>Upload resume</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Drag&apos;n&apos;drop files here to upload. We can accept only{" "}
              <i>.pdf</i> files that are less than 30mb in size.
            </Text>
          </div>
        </Dropzone>
        <Button
          className={classes.control}
          size="md"
          radius="xl"
          onClick={() => openRef.current?.()}
        >
          Select files
        </Button>
      </div>
      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? "xl" : 0}>
        {previews}
      </SimpleGrid>
    </>
  );
}
