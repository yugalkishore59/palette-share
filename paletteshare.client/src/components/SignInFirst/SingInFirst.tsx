import { useAuth0 } from "@auth0/auth0-react";
import { Button, Stack, Text, Title } from "@mantine/core";
import { IconLogin } from "@tabler/icons-react";
import classes from "./SignInFirst.module.css";
export const SingInFirst = () => {
  const { isLoading, loginWithRedirect } = useAuth0();
  return (
    <Stack h={"100%"} align="center" justify="center" gap="xl">
      <Title order={3} className={classes.title}>
        Unlock the full experience.{" "}
        <Text span c="blue" inherit>
          Sign in
        </Text>{" "}
        to share and discover amazing art.
      </Title>
      <Button
        leftSection={<IconLogin />}
        variant="outline"
        loading={isLoading}
        loaderProps={{ type: "dots" }}
        w={150}
        onClick={() => loginWithRedirect()}
      >
        Sign In
      </Button>
    </Stack>
  );
};
