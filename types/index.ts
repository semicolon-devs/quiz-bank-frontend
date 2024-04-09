import { PaperType, UserRole } from "@/utils/enums";
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

export type LMSStdDetails = {
  _id: string;
  name: string;
  password: string;
  email: string;
  key:string;
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

export type Paper = {
  isTimed: boolean;
  name: string;
  paperId: string;
  paperType: PaperType;
  questions: Question[];
  timeInMinutes: number;
  __v: number;
  _id: string;
};

export type Course = {
  _id: string;
  name: string;
  subCategories: SubjectCategory[];
  __v: number;
};

export type SubjectCategory = {
  _id: string;
  name: string;
  __v: number;
  moduleList: Module[];
};

export type Module = {
  _id: string;
  name: string;
  __v: number;
};

export type Question = {
  answers: any[];
  correctAnswer: number[];
  difficulty: string;
  explaination: string;
  module: Module;
  question: string;
  subCategory: SubjectCategory;
  subject: Course;
  type: string;
  __v: number;
  _id: string;
};


export type PDFPaperDetails = {
  _id: string;
  title: string;
  fileId: string;
};