import { UserRole } from "@/utils/enums";
import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type MenuItems = {
  name: string;
  path: UrlSlugType;
  icon: React.JSX.Element;
  users: UserRole[];
};

export type UserDetails = {
  firstname: string;
  lastname: string;
  email: string;
  roles: UserRole[];
  _id: string;
};
