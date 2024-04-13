"use client";

import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import clsx from "clsx";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import { SearchIcon } from "@/components/icons";
import { UserRole } from "@/utils/enums";
import { UserDetails } from "@/types";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { fetchUserDetails } from "@/store/authSlice";
import Logo from "@/public/smit_logo.webp";
import Image from "next/image";
import Chip from "@mui/material/Chip";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type NavbarProps = {
  open: boolean;
  handleDrawerOpen: () => void;
};

export const Navbar = ({ open, handleDrawerOpen }: NavbarProps) => {
  const dispatch = useAppDispatch();

  const [role, setRole] = useState<UserRole>();

  const { userDetails } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

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
    <AppBar
      position="fixed"
      open={open}
      color="inherit"
      sx={{
        bgcolor: "theme.palette.background.default",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ flexGrow: 0 }} display={"flex"} alignItems={"center"}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography>
        </Box>
        <Box sx={{}} display={"flex"} alignItems={"center"} gap={2}>
          <Stack spacing={0} >
            <Typography variant="button" display="block">
              {userDetails?.firstname} {userDetails?.lastname}
            </Typography>
            <Chip label={role} size="small" variant="outlined"/>
          </Stack>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/displayPhoto.jpg" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    // <nav className="max-h-20 h-20 flex w-full bg-white justify-between items-center px-5 py-1">
    //   <div className="flex">
    //     <Image src={Logo} alt="Logo" height={60} className="p-5" />{" "}

    //   </div>

    //   <div className="flex">
    //     <div className="flex mr-3 justify-center my-2">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         strokeWidth={1.5}
    //         stroke="currentColor"
    //         className="w-6 h-6"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    //         />
    //       </svg>
    //     </div>
    //     <div className="flex flex-col ">
    //       <p className="text-sm font-normal text-blue-500">
    //         {userDetails?.firstname}&nbsp;
    //         {userDetails?.lastname}
    //       </p>
    //       <p className="text-xs font-semibold">{role}</p>
    //     </div>
    //   </div>
    // </nav>
  );
};
