"use client";

import { useState } from "react";

import SectionTitle from "@/components/sectionTitle";
import { getAccess } from "@/helpers/token";

export default function ProfilePage() {
  return (
    <div>
      <SectionTitle title="Profile" />
    </div>
  );
}
