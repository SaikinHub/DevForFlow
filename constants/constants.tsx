import { SidebarLink, Themes, Questions, PopularTags } from "@/types";

export const topQuestions: Questions[] = [
  {
    _id: 1,
    title: "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?"
  },
  {
    _id: 2,
    title: "Can I get the course for free?"
  },
  {
    _id: 3,
    title: "Redux Toolkit Not Updating State as Expected"
  },
  {
    _id: 4,
    title: "How do I use express as a custom server in NextJS?"
  },
  {
    _id: 5,
    title: "Async/Await Function Not Handling Errors Properly"
  },
]

export const popularTags: PopularTags[] = [
  {
    _id: 1,
    name: "NextJS",
    totalQuestions: 4
  },
  {
    _id: 2,
    name: "Next JS",
    totalQuestions: 3
  },
  {
    _id: 3,
    name: "Demo",
    totalQuestions: 2
  },
  {
    _id: 4,
    name: "Test",
    totalQuestions: 2
  },
  {
    _id: 5,
    name: "Javascript",
    totalQuestions: 2
  },
]

export const themes: Themes[] = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};