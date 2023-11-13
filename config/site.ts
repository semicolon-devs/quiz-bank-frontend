export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "QBank",
  description: "Quiz Website",
  sidebarItems: [
    {
      label: "Home",
      href: "/",
      icon: "HomeIcon",
    },
    {
      label: "Create Q Pack",
      href: "/create-q-pack",
      icon: "CreateQBankIcon",
    },
    {
      label: "Manage Questions",
      href: "/manage-questions",
      icon: "ManageQuestionsIcon",
    },
    {
      label: "Add Questions",
      href: "/add-question",
      icon: "AddQuestionIcon",
    },
    {
      label: "Manage Courses",
      href: "/manage-courses",
      icon: "ManageCoursesIcon",
    },
    {
      label: "Manage Users",
      href: "/manage-users",
      icon: "ManageUsersIcon",
    },
    {
      label: "Subscriptions",
      href: "/subscriptions",
      icon: "SubscriptionIcon",
    },
    {
      label: "Profile",
      href: "/profile",
      icon: "ProfileIcon",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
