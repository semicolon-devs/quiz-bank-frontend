"use client";

import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { menuItems } from "@/config/menuItems";

import { getUserDetails, getUser } from "@/helpers/userDetails";
import { MenuItems, UserDetails } from "@/types";
import { UserRole } from "@/utils/enums";

type Props = { admin: boolean };

export const Sidebar = (props: Props) => {
  const pathname = usePathname();

  const [userDetails, setUserDetails] = useState<UserDetails | null>();
  const [role, setRole] = useState<UserRole>();

  useEffect(() => {
    getUser();

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

  const renderLink = ({ name, path, icon, users }: MenuItems) => (
    <NextLink
      href={path}
      className={`${
        pathname == path ? "border-r-5 border-white" : ""
      }  px-5 flex gap-5 items-center py-2 w-64`}
      key={path}
    >
      {icon}
      <p className="text-white font-semibold uppercase">{name}</p>
    </NextLink>
  );

  return (
    <div className="bg-blue h-screen w-max flex flex-col gap-4 pt-16">
      {menuItems()
        .filter((route: any) =>
          route.users.some((u: string) => u === role)
        )
        .map((item) => renderLink(item))}
    </div>
  );
};
