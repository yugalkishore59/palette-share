import {
  Group,
  UnstyledButton,
  rem,
  Menu,
  Avatar,
  Tooltip,
  useMantineColorScheme,
  useComputedColorScheme,
  Button,
} from "@mantine/core";
import {
  IconChevronDown,
  IconLogout,
  IconHome,
  IconBrush,
  IconSearch,
  IconSun,
  IconMoon,
  IconUser,
} from "@tabler/icons-react";
import cx from "clsx";
import classes from "./Header.module.css";
import { useState } from "react";
import { NavLablesEnum } from "../../utils/enums";
import { Link } from "react-router-dom";
import { HeaderProps } from "../../utils/interfaces";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const data = [
  { link: "/", label: NavLablesEnum.GALLERY, icon: IconHome },
  { link: "/create", label: NavLablesEnum.CREATE, icon: IconBrush },
  { link: "/discover", label: NavLablesEnum.DISCOVER, icon: IconSearch },
];

export function Header({ active }: HeaderProps) {
  const { logout, isLoading, loginWithRedirect, isAuthenticated } = useAuth0();
  const { user } = useSelector((state: RootState) => state.user);

  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const links = data.map((item) => (
    <Tooltip
      label={item.label}
      position="bottom"
      withArrow
      transitionProps={{ duration: 0 }}
      key={item.label}
    >
      <Link
        className={classes.mainLink}
        data-active={item.label === active || undefined}
        to={item.link}
        key={item.label}
      >
        <item.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
      </Link>
    </Tooltip>
  ));

  return (
    <header className={classes.header}>
      <Group justify="space-between" h="100%">
        <Group h="100%" gap={rem(5)}>
          {links}
        </Group>
        <Group>
          <Tooltip
            label="Toggle color scheme"
            position="bottom"
            withArrow
            transitionProps={{ duration: 0 }}
          >
            <UnstyledButton
              onClick={() =>
                setColorScheme(
                  computedColorScheme === "light" ? "dark" : "light"
                )
              }
              className={classes.colorSchemeToggle}
            >
              <IconSun
                className={cx(classes.icon, classes.light)}
                stroke={1.5}
              />
              <IconMoon
                className={cx(classes.icon, classes.dark)}
                stroke={1.5}
              />
            </UnstyledButton>
          </Tooltip>
          {isAuthenticated ? (
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group gap={7}>
                    <Avatar
                      src={user?.profilePictureUrl}
                      alt={user?.name}
                      radius="xl"
                      size={32}
                    />
                    <IconChevronDown
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Link
                  className={classes.profileLink}
                  to={`/profile/${user?.username}`}
                >
                  <Menu.Item
                    leftSection={
                      <IconUser
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                  >
                    Profile
                  </Menu.Item>
                </Link>
                <Menu.Divider />

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconLogout
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button
              variant="outline"
              loading={isLoading}
              loaderProps={{ type: "dots" }}
              onClick={() => loginWithRedirect()}
            >
              Sign In
            </Button>
          )}
        </Group>
      </Group>
    </header>
  );
}
