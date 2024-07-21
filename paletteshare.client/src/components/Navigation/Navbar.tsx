import cx from "clsx";
import { useEffect, useState } from "react";
import {
  Group,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Box,
  Button,
  Paper,
  Avatar,
  Text,
  Title,
  Container,
} from "@mantine/core";
import {
  IconLogout,
  IconHome,
  IconBrush,
  IconSearch,
  IconSun,
  IconMoon,
  IconLogin,
  IconUserCircle,
} from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import { NavLablesEnum } from "../../utils/enums";
import { useLocation, Link } from "react-router-dom";
import { Header } from "./Header";
import { useAuth0 } from "@auth0/auth0-react";

const data = [
  { link: "/", label: NavLablesEnum.GALLERY, icon: IconHome },
  { link: "/create", label: NavLablesEnum.CREATE, icon: IconBrush },
  { link: "/discover", label: NavLablesEnum.DISCOVER, icon: IconSearch },
];

export const getInitialActiveLabel = (pathname: string) => {
  switch (pathname) {
    case "/create":
      return NavLablesEnum.CREATE;
    case "/discover":
      return NavLablesEnum.DISCOVER;
    case "/profile":
      return NavLablesEnum.PROFILE;
    case "/":
      return NavLablesEnum.GALLERY;
    default:
      return NavLablesEnum.NONE;
  }
};

export function Navbar() {
  const location = useLocation();
  const [active, setActive] = useState<string>(
    getInitialActiveLabel(location.pathname)
  );
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const { logout, user, isLoading, loginWithRedirect, isAuthenticated } =
    useAuth0();

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <>
      <Box visibleFrom="sm">
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Group className={classes.header} justify="space-between">
              <Title order={3}>PalletteShare</Title>
              <ActionIcon
                onClick={() =>
                  setColorScheme(
                    computedColorScheme === "light" ? "dark" : "light"
                  )
                }
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
              >
                <IconSun
                  className={cx(classes.icon, classes.light)}
                  stroke={1.5}
                />
                <IconMoon
                  className={cx(classes.icon, classes.dark)}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>
            <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                size={120}
                radius={120}
                mx="auto"
              />
              <Text ta="center" fz="lg" fw={500} mt="md">
                Jane Fingerlicker
              </Text>
              <Text ta="center" c="dimmed" fz="sm">
                jfingerlicker@me.io • Art director
              </Text>
              <Link
                className={classes.profileLink}
                to={"/profile/yugal"}
                onClick={() => setActive(NavLablesEnum.PROFILE)}
              >
                <Button
                  variant="default"
                  fullWidth
                  mt="md"
                  leftSection={<IconUserCircle />}
                  className={classes.profileButton}
                >
                  View Profile
                </Button>
              </Link>
            </Paper>
            <Container w={"100%"} p={0} mt="md">
              {links}
            </Container>
          </div>

          <div className={classes.footer}>
            {isAuthenticated ? (
              <a
                href="#"
                className={classes.link}
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                <IconLogout className={classes.linkIcon} stroke={1.5} />
                <span>Logout</span>
              </a>
            ) : (
              <Button
                leftSection={<IconLogin />}
                variant="outline"
                loading={isLoading}
                loaderProps={{ type: "dots" }}
                w={"100%"}
                onClick={() => loginWithRedirect()}
              >
                Sign In
              </Button>
            )}
          </div>
        </nav>
      </Box>
      <Box hiddenFrom="sm">
        <Header active={active} setActive={setActive} />
      </Box>
    </>
  );
}
