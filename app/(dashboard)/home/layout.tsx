"use client";

import React, { useState, useEffect } from "react";

import { RootState, useAppSelector } from "@/store";

import { UserRole } from "@/utils/enums";

export default function DashboardHomeLayout({
  admin,
  student,
}: {
  admin: React.ReactNode;
  student: React.ReactNode;
}) {
  const [role, setRole] = useState<UserRole | undefined>(undefined);

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

  return student;
  // return role === UserRole.ADMIN ? admin : student;
}
