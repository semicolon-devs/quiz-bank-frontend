"use client"

import React from "react";
import { siteConfig } from "@/config/site";
import * as Icons from "@/components/icons";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

// const renderIconComponent = (icon: any) => {
//   const IconComponent = Icons[icon];
//   if (IconComponent) {
//     return <IconComponent />;
//   }
//   return null;
// };

type Props = {};

export const Sidebar = (props: Props) => {
  const pathname = usePathname();

  return (
    <div className="bg-blue h-screen w-max flex flex-col gap-4 pt-16">
      {siteConfig.sidebarItems.map((item) => (
        <NextLink
          href={item.href}
          className={`${
            pathname == item.href ? "border-r-5 border-white" : ""
          }  px-5 flex gap-5 items-center py-2 w-64`}
          key={item.href}
        >
          {/* {renderIconComponent(item.icon)} */}
          <p className="text-white font-semibold uppercase">{item.label}</p>
        </NextLink>
      ))}
    </div>
  );
};
