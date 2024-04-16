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
            <Avatar alt="Remy Sharp" src="/displayPhoto.jpg" variant="square"/>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
