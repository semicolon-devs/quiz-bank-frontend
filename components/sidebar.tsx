"use client";

import React, { useState, useEffect, Fragment } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Transition } from "@headlessui/react";
import clsx from "clsx";

import { LogoutIcon, MenuIcon } from "./icons";

import { menuItems } from "@/config/menuItems";

import {
  getUserDetails,
  getUser,
  clearUserDetails,
} from "@/helpers/userDetails";
import { clearAuthToken } from "@/helpers/token";
import { MenuItems, UserDetails } from "@/types";
import { UserRole } from "@/utils/enums";
import { UrlSlugType } from "@/utils/enums/UrlSlug";

type Props = {};

export const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const [userDetails, setUserDetails] = useState<UserDetails | null>();
  const [role, setRole] = useState<UserRole>();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);

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

  const toggleIsSidebarExpanded = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  const renderLink = ({ name, path, icon, users }: MenuItems) => (
    <NextLink
      href={path}
      className={`${
        pathname == path ? "border-r-5 border-white" : ""
      }  px-5 flex gap-5 items-center duration-700 
      ${isSidebarExpanded ? "w-64" : "w-[65px]"} 
      h-10`}
      key={path}
    >
      {icon}
      {isSidebarExpanded && (
        <p
          className={`text-white font-semibold uppercase transition-all duration-700 ease-in-out ${
            isSidebarExpanded ? "opacity-100" : "opacity-0"
          }`}
        >
          {name}
        </p>
      )}
    </NextLink>
  );

  return (
    <div
      className={`h-screen flex flex-col justify-between duration-700 ${
        isSidebarExpanded ? "w-64" : "w-[65px]"
      }  bg-blue`}
    >
      <div className="flex flex-col">
        <div className="h-16 flex items-center">
          <div
            className={`cursor-pointer ml-2.5 flex gap-5 items-center p-2`}
            onClick={() => {
              toggleIsSidebarExpanded();
            }}
          >
            <MenuIcon />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {menuItems()
            .filter((route: any) => route.users.some((u: string) => u === role))
            .map((item) => renderLink(item))}
        </div>
      </div>
      <div
        className={`cursor-pointer px-5 flex gap-5 items-center py-2 mb-1`}
        onClick={() => {
          clearUserDetails();
          clearAuthToken();
          router.push(UrlSlugType.LOGIN);
        }}
      >
        <LogoutIcon />
        {isSidebarExpanded && (
          <p
            className={`text-white font-semibold uppercase transition-all duration-700 ease-in-out ${
              isSidebarExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            log out
          </p>
        )}
      </div>
    </div>
  );
};
