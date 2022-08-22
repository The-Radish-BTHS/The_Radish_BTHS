import { IconType } from "react-icons";
import { IoNewspaperOutline } from "react-icons/io5";
import { BsPeople, BsInfoCircle } from "react-icons/bs";
import { GoBook } from "react-icons/go";
import { RiVipCrownLine } from "react-icons/ri";

export interface ITab {
  name: string;
  icon: IconType;
  route?: string;
  hash?: string;
}

export const navigationTabs: ITab[] = [
  {
    name: "Articles",
    icon: IoNewspaperOutline,
    route: "/articles",
  },
  {
    name: "Issues",
    icon: GoBook,
    route: "/issues",
  },
  {
    name: "Authors",
    icon: BsPeople,
    route: "/authors",
  },
  {
    name: "Execs",
    icon: RiVipCrownLine,
    route: "/execs",
  },
  {
    name: "About",
    icon: BsInfoCircle,
    route: "/about",
  },
];
