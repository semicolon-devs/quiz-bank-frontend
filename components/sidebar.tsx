"use client";

import React, { useState, useEffect, Fragment } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";

import SemicolonDevs from "@/public/devs.png";

import {
  generalMenuItems,
  lmsMenuItems,
  profileItems,
  qBankMenuItems,
} from "@/config/menuItems";

import { clearAuthToken } from "@/helpers/token";
import { MenuItems } from "@/types";
import { UserRole } from "@/utils/enums";
import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { clearUserDetails } from "@/store/authSlice";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

export const customStyles = {
  drawer: {
    backgroundColor: "#141E25",
    border: "red",
  },
  list: {
    backgroundColor: "#141E25",
  },
  icon: {
    color: "#FFFFFF",
  },
  listItemIcon: {
    minWidth: 0,
    justifyContent: "center",
  },
  listItemButton: {
    minHeight: 48,
    px: 2.5,
  },
  divider: {
    borderColor: "#FFF",
  },
  text: {
    color: "#FFF",
  },
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type Props = { open: boolean; handleDrawerClose: () => void };

export const Sidebar = ({ open, handleDrawerClose }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();

  const [role, setRole] = useState<UserRole>();

  const { userDetails } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const getHighestRole = (): UserRole => {
      if (userDetails?.roles.includes(UserRole.ADMIN)) {
        return UserRole.ADMIN;
      } else if (userDetails?.roles.includes(UserRole.MODERATOR)) {
        return UserRole.MODERATOR;
      } else {
        return UserRole.USER;
      }
    };

    setRole(getHighestRole());
  }, [userDetails]);

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{ sx: customStyles.drawer }}
    >
      <DrawerHeader sx={customStyles.list}>
        <IconButton onClick={handleDrawerClose} sx={customStyles.icon}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider sx={customStyles.divider} />
      <List sx={customStyles.list}>
        {generalMenuItems()
          .filter((route: any) => route.users.some((u: string) => u === role))
          .map((item, index) => (
            <ListItem
              key={item.path}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => router.push(item.path)}
            >
              <ListItemButton
                sx={{
                  ...customStyles.listItemButton,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    ...customStyles.icon,
                    ...customStyles.listItemIcon,
                    mr: open ? 3 : "auto",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    ...customStyles.text,
                    opacity: open ? 1 : 0,
                    textTransform: "capitalize",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider sx={customStyles.divider} />
      <List sx={customStyles.list}>
        {qBankMenuItems()
          .filter((route: any) => route.users.some((u: string) => u === role))
          .map((item, index) => (
            <ListItem
              key={item.path}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => router.push(item.path)}
            >
              <ListItemButton
                sx={{
                  ...customStyles.listItemButton,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    ...customStyles.icon,
                    ...customStyles.listItemIcon,
                    mr: open ? 3 : "auto",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    ...customStyles.text,
                    opacity: open ? 1 : 0,
                    textTransform: "capitalize",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider sx={customStyles.divider} />
      <List sx={customStyles.list}>
        {lmsMenuItems()
          .filter((route: any) => route.users.some((u: string) => u === role))
          .map((item, index) => (
            <ListItem
              key={item.path}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => router.push(item.path)}
            >
              <ListItemButton
                sx={{
                  ...customStyles.listItemButton,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    ...customStyles.icon,
                    ...customStyles.listItemIcon,
                    mr: open ? 3 : "auto",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    ...customStyles.text,
                    opacity: open ? 1 : 0,
                    textTransform: "capitalize",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider sx={customStyles.divider} />
      <List sx={customStyles.list}>
        {profileItems()
          .filter((route: any) => route.users.some((u: string) => u === role))
          .map((item, index) => (
            <ListItem
              key={item.path}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => router.push(item.path)}
            >
              <ListItemButton
                sx={{
                  ...customStyles.listItemButton,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    ...customStyles.icon,
                    ...customStyles.listItemIcon,
                    mr: open ? 3 : "auto",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    ...customStyles.text,
                    opacity: open ? 1 : 0,
                    textTransform: "capitalize",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider sx={customStyles.divider} />
      <List sx={customStyles.list}>
        {["Log out"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              clearUserDetails();
              clearAuthToken();
              router.push(UrlSlugType.LOGIN);
            }}
          >
            <ListItemButton
              sx={{
                ...customStyles.listItemButton,
                justifyContent: open ? "initial" : "center",
              }}
            >
              <ListItemIcon
                sx={{
                  ...customStyles.icon,
                  ...customStyles.listItemIcon,
                  mr: open ? 3 : "auto",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ ...customStyles.text, opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </Drawer>
  );
};
