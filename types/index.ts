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

export type PaperDetails = {
  isTimed: boolean;
  name: string;
  paperId: string;
  paperType: string;
  timeInMinutes: number;
  questionsCount: number;
  __v: number;
  _id: string;
};

export type Course = {
  _id: string;
  name: string;
  subCategories: subjectCategory[];
  __v: number;
};

export type subjectCategory = {
  _id: string;
  name: string;
  __v: number;
  moduleList: module[];
};

export type module = {
  _id: string;
  name: string;
  __v: number;
};
