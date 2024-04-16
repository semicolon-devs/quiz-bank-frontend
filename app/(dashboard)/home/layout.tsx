"use client";

import React from "react";

import { RootState, useAppSelector } from "@/store";

import { UserRole } from "@/utils/enums";

export default function DashboardHomeLayout({
  admin,
  student,
}: {
  admin: React.ReactNode;
  student: React.ReactNode;
}) {
  const { userDetails } = useAppSelector((state: RootState) => state.auth);

  // return <>{userDetails?.roles.includes(UserRole.ADMIN) ? admin : student}</>;
  return student;
}
