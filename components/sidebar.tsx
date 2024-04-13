"use client";

import React, { useState, useEffect, Fragment } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import SemicolonDevs from "@/public/devs.png";
import Image from "next/image";

import { menuItems } from "@/config/menuItems";

import { clearAuthToken } from "@/helpers/token";
import { MenuItems, UserDetails } from "@/types";
import { UserRole } from "@/utils/enums";
import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { clearUserDetails } from "@/store/authSlice";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

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

type Props = {};

export const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();

  const [role, setRole] = useState<UserRole>();
  const [open, setOpen] = useState<boolean>(false);

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

  // const toggleIsSidebarExpanded = () => {
  //   setIsSidebarExpanded((prev) => !prev);
  // };

  // const renderLink = ({ name, path, icon, users }: MenuItems) => (
  //   <NextLink
  //     href={path}
  //     className={`${
  //       pathname == path ? "border-r-5 border-white" : ""
  //     }  px-5 flex gap-5 items-center duration-700 h-10
  //     ${isSidebarExpanded ? "w-64" : "w-[65px]"}
  //     `}
  //     key={path}
  //   >
  //     {icon}
  //     {isSidebarExpanded && (
  //       <p
  //         className={`text-white font-semibold uppercase transition-all duration-700 ease-in-out ${
  //           isSidebarExpanded ? "opacity-100" : "opacity-0"
  //         }`}
  //       >
  //         {name}
  //       </p>
  //     )}
  //   </NextLink>
  // );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems()
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
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider />
      <List>
        {["Log out"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
    // <div
    //   className={`h-full flex flex-col justify-between duration-700 ${
    //     isSidebarExpanded ? "min-w-64" : "min-w-[65px]"
    //   }  bg-blue-600`}
    // >
    //   <div className="flex flex-col">
    //     <div className="h-14 flex items-center">
    //       <div
    //         className={`cursor-pointer ml-2.5 flex gap-5 items-center p-2`}
    //         onClick={() => {
    //           toggleIsSidebarExpanded();
    //         }}
    //       >
    //         <MenuIcon />
    //       </div>
    //     </div>
    //     <div className="flex flex-col gap-4">
    //       {menuItems()
    //         .filter((route: any) => route.users.some((u: string) => u === role))
    //         .map((item) => renderLink(item))}
    //     </div>
    //   </div>

    //   <div
    //     className={`cursor-pointer px-5 flex gap-5 items-center py-2 mb-1 ${
    //       isSidebarExpanded ? "w-64" : "w-[65px]"
    //     }`}
    //     onClick={() => {
    //       clearUserDetails();
    //       clearAuthToken();
    //       router.push(UrlSlugType.LOGIN);
    //     }}
    //   >
    //     <LogoutIcon />
    //     {isSidebarExpanded && (
    //       <div>
    //         <p
    //           className={`text-white font-semibold uppercase transition-all duration-700 ease-in-out ${
    //             isSidebarExpanded ? "opacity-100" : "opacity-0"
    //           }`}
    //         >
    //           log out
    //         </p>
    //       </div>
    //     )}
    //   </div>
    //   <div
    //     style={{ padding: 20 + "px" }}
    //     className={`${!isSidebarExpanded ? "hidden" : "block"}`}
    //   >
    //     <p style={{ fontSize: 12 + "px" }} className="text-white	">
    //       Developed By
    //       <Image
    //         style={{
    //           display: "inline-block",
    //           width: 20 + "px",
    //           marginLeft: 10 + "px",
    //         }}
    //         alt="SemicolonDevs"
    //         src={SemicolonDevs}
    //       />
    //     </p>
    //     <a
    //       className="text-white"
    //       style={{ fontSize: "15px" }}
    //       href="https://semicolondevs.com/"
    //       target="_blank"
    //     >
    //       SemicolonDevs
    //     </a>
    //   </div>
    // </div>
  );
};
