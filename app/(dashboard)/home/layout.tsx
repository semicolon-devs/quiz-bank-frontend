"use client";

import React, { useEffect, useState } from "react";

import { RootState, useAppSelector } from "@/store";

import { UserRole } from "@/utils/enums";

export default function DashboardHomeLayout({
  admin,
  student,
}: {
  admin: React.ReactNode;
  student: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { userDetails } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userDetails?.roles.includes(UserRole.ADMIN)) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userDetails]);

  // Default content if userDetails is initially missing
  // const defaultContent = <p>Loading user details...</p>;

  return isAdmin ? admin : student;
}
