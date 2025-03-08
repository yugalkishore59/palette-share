import { useEffect, useRef, useState } from "react";
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

export function DropzoneButton({
  imageUrlBase64,
  setImageUrlBase64,
}: DropzoneButtonProps) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]); // may support multiple images in future

  const handleRemoveImage = () => {
    setFiles([]);
    setImageUrlBase64("");
    // setFiles((prevFiles) => {
    //   const updatedFiles = prevFiles.filter((_, i) => i !== index);
    //   if (updatedFiles.length === 0) {
    //     setImageUrlBase64(""); // Clear base64 when no images remain
    //   }
    //   return updatedFiles;
    // });
  };

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

  useEffect(() => {
    if (imageUrlBase64 === "") {
      setFiles([]);
    }
  }, [imageUrlBase64]);

  return (
    <>
      <div className={classes.wrapper}>
        {/* <label htmlFor="dropzone" className={classes.label}>
          Upload Image <span className={classes.required}>*</span>
        </label> */}
        <Dropzone
          openRef={openRef}
          onDrop={handleFileChange}
          className={classes.dropzone}
          radius="md"
          accept={IMAGE_MIME_TYPE}
          maxSize={30 * 1024 ** 2}
          multiple={false}
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
              <Dropzone.Accept>Drop image here</Dropzone.Accept>
              <Dropzone.Reject>Image less than 30mb</Dropzone.Reject>
              <Dropzone.Idle>Upload Image</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Image should be less than 30mb
            </Text>
          </div>
        </Dropzone>
        <Button
          className={classes.control}
          size="md"
          radius="xl"
          onClick={() => openRef.current?.()}
        >
          Browse device
        </Button>
      </div>
      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? "xl" : 0}>
        {previews.map((preview, index) => (
          <div key={index} className={classes.previewWrapper}>
            {preview}
            <Button
              size="xs"
              color="red"
              mt="xs"
              onClick={() => handleRemoveImage()}
            >
              Remove
            </Button>
          </div>
        ))}
      </SimpleGrid>
    </>
  );
}
