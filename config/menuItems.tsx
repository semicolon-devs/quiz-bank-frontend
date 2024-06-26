import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { UserRole } from "@/utils/enums";
import { MenuItems } from "@/types";

import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PaymentIcon from "@mui/icons-material/Payment";
import GroupIcon from "@mui/icons-material/Group";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

export const generalMenuItems = (): MenuItems[] => {
  return [
    {
      name: "home",
      path: UrlSlugType.HOME,
      icon: <HomeIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER],
    },
    // {
    //   name: "manage papers",
    //   path: UrlSlugType.MANAGE_PAPERS,
    //   icon: <FolderIcon />,
    //   users: [UserRole.ADMIN, UserRole.MODERATOR],
    // },
    // {
    //   name: "quiz",
    //   path: UrlSlugType.PAPERS,
    //   icon: <CheckCircleIcon />,
    //   users: [UserRole.USER],
    // },
    // {
    //   name: "pdf-papers",
    //   path: UrlSlugType.PDF_PAPERS,
    //   icon: <InsertDriveFileIcon />,
    //   users: [UserRole.USER],
    // },
    // {
    //   name: "notes",
    //   path: UrlSlugType.NOTES,
    //   icon: <FilePresentIcon />,
    //   users: [UserRole.USER],
    // },
    // {
    //   name: "manage questions",
    //   path: UrlSlugType.MANAGE_QUESTIONS,
    //   icon: <LibraryBooksIcon />,
    //   users: [UserRole.ADMIN, UserRole.MODERATOR],
    // },
    // {
    //   name: "add question",
    //   path: UrlSlugType.ADD_QUESTION,
    //   icon: <LibraryAddIcon />,
    //   users: [UserRole.ADMIN, UserRole.MODERATOR],
    // },
    // {
    //   name: "manage courses",
    //   path: UrlSlugType.MANAGE_COURSES,
    //   icon: <DashboardIcon />,
    //   users: [UserRole.ADMIN, UserRole.MODERATOR],
    // },
    // {
    //   name: "add pdf papers",
    //   path: UrlSlugType.ADD_PDF_PAPERS,
    //   icon: <NoteAddIcon />,
    //   users: [UserRole.ADMIN, UserRole.MODERATOR],
    // },
    // {
    //   name: "add notes",
    //   path: UrlSlugType.ADD_NOTES,
    //   icon: <PostAddIcon />,
    //   users: [UserRole.ADMIN, UserRole.MODERATOR],
    // },
    // {
    //   name: "manage lms users",
    //   path: UrlSlugType.MANAGE_USERS,
    //   icon: <GroupIcon />,
    //   users: [UserRole.ADMIN],
    // },
    // {
    //   name: "lms settings",
    //   path: UrlSlugType.LMS_SETTINGS,
    //   icon: <SettingsIcon />,
    //   users: [UserRole.ADMIN],
    // },
    // {
    //   name: "subscriptions",
    //   path: UrlSlugType.SUBSCRIPTIONS,
    //   icon: <WidgetsIcon />,
    //   users: [UserRole.ADMIN],
    // },
    // {
    //   name: "profile",
    //   path: UrlSlugType.PROFILE,
    //   icon: <ManageAccountsIcon />,
    //   users: [UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER],
    // },
    // {
    //   name: "payment details",
    //   path: UrlSlugType.PAYMENT_DETAILS,
    //   icon: <PaymentIcon />,
    //   users: [UserRole.USER],
    // },
  ];
};

export const qBankMenuItems = (): MenuItems[] => {
  return [
    {
      name: "manage papers",
      path: UrlSlugType.MANAGE_PAPERS,
      icon: <FolderIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR],
    },
    {
      name: "quiz",
      path: UrlSlugType.PAPERS,
      icon: <CheckCircleIcon />,
      users: [UserRole.USER],
    },
    {
      name: "manage questions",
      path: UrlSlugType.MANAGE_QUESTIONS,
      icon: <LibraryBooksIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR],
    },
    {
      name: "add question",
      path: UrlSlugType.ADD_QUESTION,
      icon: <LibraryAddIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR],
    },
    {
      name: "manage courses",
      path: UrlSlugType.MANAGE_COURSES,
      icon: <DashboardIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR],
    },
  ];
};

export const lmsMenuItems = (): MenuItems[] => {
  return [
    {
      name: "Model papers",
      path: UrlSlugType.PDF_PAPERS,
      icon: <InsertDriveFileIcon />,
      users: [UserRole.USER],
    },
    {
      name: "notes",
      path: UrlSlugType.NOTES,
      icon: <FilePresentIcon />,
      users: [UserRole.USER],
    },
    {
      name: "add Model papers",
      path: UrlSlugType.ADD_PDF_PAPERS,
      icon: <NoteAddIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR],
    },
    {
      name: "add notes",
      path: UrlSlugType.ADD_NOTES,
      icon: <PostAddIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR],
    },
    {
      name: "manage LMS users",
      path: UrlSlugType.MANAGE_USERS,
      icon: <GroupIcon />,
      users: [UserRole.ADMIN],
    },
    {
      name: "LMS settings",
      path: UrlSlugType.LMS_SETTINGS,
      icon: <SettingsIcon />,
      users: [UserRole.ADMIN],
    },
  ];
};

export const profileItems = (): MenuItems[] => {
  return [
    {
      name: "profile",
      path: UrlSlugType.PROFILE,
      icon: <ManageAccountsIcon />,
      users: [UserRole.ADMIN, UserRole.MODERATOR],
    },
  ];
};
