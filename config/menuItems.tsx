import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { UserRole } from "@/utils/enums";
import { MenuItems } from "@/types";

import {
  HomeIcon,
  ManagePapersIcon,
  ManageQuestionsIcon,
  AddQuestionIcon,
  ManageCoursesIcon,
  ManageUsersIcon,
  SubscriptionIcon,
  ProfileIcon,
} from "@/components/icons";

export const menuItems = (): MenuItems[] => {
  return [
    {
      name: "home",
      path: UrlSlugType.HOME,
      icon: <HomeIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER],
    },
    {
      name: "manage papers",
      path: UrlSlugType.MANAGE_PAPERS,
      icon: <ManagePapersIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR],
    },
    {
      name: "papers",
      path: UrlSlugType.PAPERS,
      icon: <ManagePapersIcon />,
      users: [UserRole.USER],
    },
    {
      name: "manage questions",
      path: UrlSlugType.MANAGE_QUESTIONS,
      icon: <ManageQuestionsIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR],
    },
    {
      name: "add question",
      path: UrlSlugType.ADD_QUESTION,
      icon: <AddQuestionIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR],
    },
    {
      name: "manage courses",
      path: UrlSlugType.MANAGE_COURSES,
      icon: <ManageCoursesIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR],
    },
    {
      name: "add pdf papers",
      path: UrlSlugType.ADD_PDF_PAPERS,
      icon: <AddQuestionIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR],
    },
    {
      name: "add notes",
      path: UrlSlugType.ADD_NOTES,
      icon: <AddQuestionIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR],
    },
    {
      name: "manage users",
      path: UrlSlugType.MANAGE_USERS,
      icon: <ManageUsersIcon />,
      users: [UserRole.ADMIN],
    },
    // {
    //   name: "subscriptions",
    //   path: UrlSlugType.SUBSCRIPTIONS,
    //   icon: <SubscriptionIcon />,
    //   users: [UserRole.ADMIN],
    // },
    {
      name: "profile",
      path: UrlSlugType.PROFILE,
      icon: <ProfileIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER],
    },
    // {
    //   name: "payment details",
    //   path: UrlSlugType.PAYMENT_DETAILS,
    //   icon: <ProfileIcon />,
    //   users: [UserRole.USER],
    // },
  ];
};
