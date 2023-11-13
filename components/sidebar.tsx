import React from "react";
import { siteConfig } from "@/config/site";
import * as Icons from "@/components/icons";

import NextLink from "next/link";
import clsx from "clsx";

const renderIconComponent = (icon: string) => {
  const IconComponent = Icons[icon];
  if (IconComponent) {
    return <IconComponent />;
  }
  return null;
};

type Props = {};

export const Sidebar = (props: Props) => {
  return (
    <div className="bg-blue h-screen w-max flex flex-col gap-8 pt-16">
      {siteConfig.sidebarItems.map((item) => (
        <NextLink
          href={item.href}
          className="w-max px-5 flex gap-5 items-center"
          key={item.href}
        >
          {renderIconComponent(item.icon)}
          <p className="text-white font-semibold uppercase">{item.label}</p>
        </NextLink>
      ))}
    </div>
  );
};
