import { Container, Stack, Title, Text, Button } from "@mantine/core";

import classes from "./VerifyEmail.module.css";
import { IconLogout } from "@tabler/icons-react";
import { useAuth0 } from "@auth0/auth0-react";

export const VerifyEmail = () => {
  const { isLoading, logout } = useAuth0();
  return (
    <Container fluid className={classes.container}>
      <Stack h={"100%"} align="center" justify="center" gap="md">
        <Title order={3}>
          Please verify your email address to complete your registration. Check
          your{" "}
          <Text span c="blue" inherit>
            email
          </Text>{" "}
          for the{" "}
          <Text span c="blue" inherit>
            verification link.
          </Text>
        </Title>
        <Text mt={"xl"}>Not you?</Text>
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
      </Stack>
    </Container>
  );
};
