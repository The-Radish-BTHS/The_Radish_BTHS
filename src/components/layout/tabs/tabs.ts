import { IconType } from "react-icons";
import {
  RiNewspaperLine,
  RiNewspaperFill,
  RiVipCrownLine,
  RiVipCrownFill,
} from "react-icons/ri";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { IoBookOutline, IoBook } from "react-icons/io5";
import { AiOutlineInfoCircle, AiFillInfoCircle } from "react-icons/ai";
import { MdOutlineArticle, MdArticle } from "react-icons/md";

export interface ITab {
  name: string;
  outlineIcon: IconType;
  fillIcon: IconType;
  route?: string;
  hash?: string;
}

export const navigationTabs: ITab[] = [
  {
    name: "Articles",
    outlineIcon: MdOutlineArticle,
    fillIcon: MdArticle,
    route: "/articles",
  },
  {
    name: "Issues",
    outlineIcon: IoBookOutline,
    fillIcon: IoBook,
    route: "/issues",
  },
  {
    name: "Authors",
    outlineIcon: BsPeople,
    fillIcon: BsPeopleFill,
    route: "/authors",
  },
  {
    name: "Execs",
    outlineIcon: RiVipCrownLine,
    fillIcon: RiVipCrownFill,
    route: "/execs",
  },
  {
    name: "About",
    outlineIcon: AiOutlineInfoCircle,
    fillIcon: AiFillInfoCircle,
    route: "/about",
  },
];
