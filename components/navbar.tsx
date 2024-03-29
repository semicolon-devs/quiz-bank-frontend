"use client";

import React, { useState, useEffect } from "react";

import { getUser, getUserDetails } from "@/helpers/userDetails";

import NextLink from "next/link";
import clsx from "clsx";

import { SearchIcon } from "@/components/icons";
import { UserRole } from "@/utils/enums";
import { UserDetails } from "@/types";

export const Navbar = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>();
  const [role, setRole] = useState<UserRole>();

  useEffect(() => {
    setUserDetails(getUserDetails());
  }, []);

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
    <nav className="max-h-14 h-14 flex w-full bg-white justify-end items-center px-5 py-1">
      <div className="flex flex-col ">
        <p className="text-sm font-normal text-blue-500">
          {userDetails?.firstname}&nbsp;
          {userDetails?.lastname}
        </p>
        <p className="text-xs font-semibold">{role}</p>
      </div>
    </nav>
  );
};
