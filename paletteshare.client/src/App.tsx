import { Navbar } from "./components/Navigation/Navbar";
import { Gallery } from "./pages/Gallery";
import { Profile } from "./pages/Profile/Profile";
import { Discover } from "./pages/Discover";
import { Create } from "./pages/Create/Create";
import classes from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Stack, Title, Text, Button } from "@mantine/core";
import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IconLogout } from "@tabler/icons-react";

function App() {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const { user, isLoading, logout } = useAuth0();

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <div className={classes.app}>
      <BrowserRouter>
        {user && user.email_verified === false ? (
          <Container fluid className={classes.container}>
            <Stack h={"100%"} align="center" justify="center" gap="md">
              <Title order={3} className={classes.title}>
                Please verify your email address to complete your registration.
                Check your{" "}
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
        ) : (
          <>
            <Navbar />

            <Container fluid className={classes.container} ref={scrollableRef}>
              <Routes>
                <Route
                  path="/"
                  element={<Gallery scrollableRef={scrollableRef} />}
                />
                <Route path="create" element={<Create />} />
                <Route path="discover" element={<Discover />} />
                <Route path="profile/:username" element={<Profile />} />
              </Routes>
            </Container>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
