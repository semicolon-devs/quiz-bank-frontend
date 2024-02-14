"use client";

import React, { useState, useEffect } from "react";
import { getUserDetails } from "@/helpers/userDetails";
import { UserRole } from "@/utils/enums";

export default function DashboardHomeLayout({
  admin,
  student,
}: {
  admin: React.ReactNode;
  student: React.ReactNode;
}) {
  const [role, setRole] = useState<UserRole | undefined>(undefined);

  useEffect(() => {
    const getHighestRole = (): UserRole => {
      const userDetails = getUserDetails();

      if (userDetails?.roles.includes(UserRole.ADMIN)) {
        return UserRole.ADMIN;
      } else if (userDetails?.roles.includes(UserRole.MODERATOR)) {
        return UserRole.MODERATOR;
      } else {
        return UserRole.USER;
      }
    };

    setRole(getHighestRole());
  }, []);

  return student;
  // return role === UserRole.ADMIN ? admin : student;
}
