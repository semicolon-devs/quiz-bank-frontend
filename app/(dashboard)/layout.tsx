"use client";

import { useState } from "react";

import { Toaster } from "react-hot-toast";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const drawerWidth = 240;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex h-screen w-screen">
      <Toaster position="top-center" />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <div className="relative flex flex-col w-full">
        <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
        <div className="p-5 overflow-y-auto h-full mt-16">{children}</div>
      </div>
    </div>
  );
}
