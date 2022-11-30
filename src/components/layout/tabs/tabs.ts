// import {
//   RiNewspaperLine,
//   RiNewspaperFill,
//   RiVipCrownLine,
//   RiVipCrownFill,
// } from "react-icons/ri";
// import { BsPeople, BsPeopleFill } from "react-icons/bs";
// import { IoBookOutline, IoBook } from "react-icons/io5";
// import { AiOutlineInfoCircle, AiFillInfoCircle } from "react-icons/ai";
// import { MdOutlineArticle, MdArticle } from "react-icons/md";

export interface ITab {
  name: string;
  route: string;
  perm?: "exec" | "editor" | "artist" | "normie";
}

export const navigationTabs: ITab[] = [
  {
    name: "Articles",
    route: "/articles",
  },
  {
    name: "Issues",
    route: "/issues",
  },
  {
    name: "People",
    route: "/people",
  },
  {
    name: "Execs",
    route: "/execs",
  },
  {
    name: "About",
    route: "/about",
  },
];

export const accountTabs: ITab[] = [
  {
    name: "Account",
    route: "/account",
    perm: "normie",
  },
  {
    name: "Submit An Article",
    route: "/articles/submit",
    perm: "normie",
  },
  {
    name: "Exec Dashboard",
    route: "/eggsex",
    perm: "exec",
  },
  {
    name: "Editor Dashboard",
    route: "/editor-dashboard",
    perm: "editor",
  },
  {
    name: "Artsy Dashboard",
    route: "/artsy-dashboard",
    perm: "artist",
  },
];
