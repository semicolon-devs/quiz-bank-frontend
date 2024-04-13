"use client";

import React, { useState, useEffect, Fragment } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import SemicolonDevs from "@/public/devs.png";
import { LogoutIcon, MenuIcon } from "./icons";
import Image from "next/image";

import { menuItems } from "@/config/menuItems";

import { clearAuthToken } from "@/helpers/token";
import { MenuItems, UserDetails } from "@/types";
import { UserRole } from "@/utils/enums";
import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { clearUserDetails } from "@/store/authSlice";

type Props = {};

export const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const [role, setRole] = useState<UserRole>();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

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

  const toggleIsSidebarExpanded = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  const renderLink = ({ name, path, icon, users }: MenuItems) => (
    <NextLink
      href={path}
      className={`${
        pathname == path ? "border-r-5 border-white" : ""
      }  px-5 flex gap-5 items-center duration-700 h-10
      ${isSidebarExpanded ? "w-64" : "w-[65px]"}
      `}
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
      className={`h-full flex flex-col justify-between duration-700 ${
        isSidebarExpanded ? "min-w-64" : "min-w-[65px]"
      }  bg-blue-600`}
    >
      <div className="flex flex-col">
        <div className="h-14 flex items-center">
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
        className={`cursor-pointer px-5 flex gap-5 items-center py-2 mb-1 ${
          isSidebarExpanded ? "w-64" : "w-[65px]"
        }`}
        onClick={() => {
          clearUserDetails();
          clearAuthToken();
          router.push(UrlSlugType.LOGIN);
        }}
      >
        <LogoutIcon />
        {isSidebarExpanded && (
          <div>
            <p
              className={`text-white font-semibold uppercase transition-all duration-700 ease-in-out ${
                isSidebarExpanded ? "opacity-100" : "opacity-0"
              }`}
            >
              log out
            </p>
          </div>
        )}
      </div>
      <div
        style={{ padding: 20 + "px" }}
        className={`${!isSidebarExpanded ? "hidden" : "block"}`}
      >
        <p style={{ fontSize: 12 + "px" }} className="text-white	">
          Developed By
          <Image
            style={{
              display: "inline-block",
              width: 20 + "px",
              marginLeft: 10 + "px",
            }}
            alt="SemicolonDevs"
            src={SemicolonDevs}
          />
        </p>
        <a
          className="text-white"
          style={{ fontSize: "15px" }}
          href="https://semicolondevs.com/"
          target="_blank"
        >
          SemicolonDevs
        </a>
      </div>
    </div>
  );
};
