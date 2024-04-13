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
  const { userDetails } = useAppSelector((state: RootState) => state.auth);

  if (userDetails?.roles.includes(UserRole.ADMIN)) {
    return admin;
  } else if (userDetails?.roles.includes(UserRole.MODERATOR)) {
    return admin;
  } else if (userDetails?.roles.includes(UserRole.LMS_USER)) {
    return student;
  } else {
    return student;
  }
}
