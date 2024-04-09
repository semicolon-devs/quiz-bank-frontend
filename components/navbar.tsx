"use client";

import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import clsx from "clsx";

import { SearchIcon } from "@/components/icons";
import { UserRole } from "@/utils/enums";
import { UserDetails } from "@/types";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { fetchUserDetails } from "@/store/authSlice";
import Logo from "@/public/smit_logo.webp";
import Image from "next/image";

export const Navbar = () => {
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
    <nav className="max-h-14 h-14 flex w-full bg-white justify-between items-center px-5 py-1">
      <div className="flex">
        <Image src={Logo} alt="Logo" height={50} className="p-2" />{" "}
        {/* Use the Logo component */}
      </div>

      <div className="flex">
        <div className="flex mr-3 justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
        <div className="flex flex-col ">
          <p className="text-sm font-normal text-blue-500">
            {userDetails?.firstname}&nbsp;
            {userDetails?.lastname}
          </p>
          <p className="text-xs font-semibold">{role}</p>
        </div>
      </div>
    </nav>
  );
};
