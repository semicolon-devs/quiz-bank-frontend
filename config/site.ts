export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "QBank",
  description: "Quiz Website",
  adminSidebarItems: [
    {
      label: "Home",
      href: "/home",
      icon: "HomeIcon",
    },
    {
      label: "Manage Q Papers",
      href: "/manage-q-papers",
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
  studentSidebarItems: [
    {
      label: "Home",
      href: "/student-dashboard/home",
      icon: "HomeIcon",
    },
    {
      label: "Payment Details",
      href: "/student-dashboard/payment-details",
      icon: "ProfileIcon",
    },
    {
      label: "Profile",
      href: "/student-dashboard/profile",
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
