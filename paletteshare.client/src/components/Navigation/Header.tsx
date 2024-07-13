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

const user = {
  name: "Jane Spoonfighter",
  email: "janspoon@fighter.dev",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
};

const data = [
  { link: "/", label: NavLablesEnum.GALLERY, icon: IconHome },
  { link: "/create", label: NavLablesEnum.CREATE, icon: IconBrush },
  { link: "/discover", label: NavLablesEnum.DISCOVER, icon: IconSearch },
];

export function Header({ active, setActive }: HeaderProps) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const [userLoggedIn, setUserLoggedIn] = useState(true);

  const links = data.map((item) => (
    <Tooltip
      label={item.label}
      position="bottom"
      withArrow
      transitionProps={{ duration: 0 }}
      key={item.label}
    >
      <Link
        onClick={() => setActive(item.label)}
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
          {userLoggedIn ? (
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
                      src={user.image}
                      alt={user.name}
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
                  onClick={() => setUserLoggedIn(false)}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button onClick={() => setUserLoggedIn(true)}>Log in</Button>
          )}
        </Group>
      </Group>
    </header>
  );
}
