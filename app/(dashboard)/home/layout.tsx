"use client"
import React from "react";

import { RootState, useAppSelector } from "@/store";

import { UserRole } from "@/utils/enums";

export default function DashboardHomeLayout({
  admin,
  student,
}:{
  admin: React.ReactNode;
  student: React.ReactNode;
}) {
  const { userDetails } = useAppSelector((state: RootState) => state.auth);

  // Default content if userDetails is initially missing
 // const defaultContent = <p>Loading user details...</p>;

  return userDetails ? (
    userDetails?.roles.includes(UserRole.ADMIN) ? admin : student
  ) : (
    "User Details are still loading"
  );
  
}
