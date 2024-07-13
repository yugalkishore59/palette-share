import cx from "clsx";
import { useState } from "react";
import {
  Group,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import {
  IconLogout,
  IconHome,
  IconBrush,
  IconSearch,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import { NavLablesEnum } from "../../utils/enums";
import { useLocation, Link } from "react-router-dom";

const data = [
  { link: "/", label: NavLablesEnum.GALLERY, icon: IconHome },
  { link: "/create", label: NavLablesEnum.CREATE, icon: IconBrush },
  { link: "/discover", label: NavLablesEnum.DISCOVER, icon: IconSearch },
];

const getInitialActiveLabel = (pathname: string) => {
  switch (pathname) {
    case "/create":
      return NavLablesEnum.CREATE;
    case "/discover":
      return NavLablesEnum.DISCOVER;
    case "/profile":
      return NavLablesEnum.PROFILE;
    case "/":
    default:
      return NavLablesEnum.GALLERY;
  }
};

export function Navbar() {
  const location = useLocation();
  const [active, setActive] = useState(
    getInitialActiveLabel(location.pathname)
  );
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

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
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          PalletteShare
          <ActionIcon
            onClick={() =>
              setColorScheme(computedColorScheme === "light" ? "dark" : "light")
            }
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
          >
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
          </ActionIcon>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
