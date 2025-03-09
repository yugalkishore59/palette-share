import classes from "./PostSkeleton.module.css";
import { Container, Skeleton } from "@mantine/core";

const PostSkeleton = () => {
  return (
    <Container size="md" pt="xs" pb="xs" pl={"0"} pr={"0"} w="100%">
      <Skeleton height={50} circle />
      <Skeleton height={200} mt={12} />
      <Skeleton height={12} mt={6} radius="xl" />
      <Skeleton height={12} mt={6} radius="xl" />
      <Skeleton height={12} mt={6} radius="xl" />
      <Skeleton height={12} mt={6} radius="xl" />
      <Skeleton height={12} mt={6} width="70%" radius="xl" />
      <div className={classes.rowFlex}>
        <Skeleton height={30} w={30} />
        <Skeleton height={30} w={30} />
      </div>
    </Container>
  );
};

export default PostSkeleton;
