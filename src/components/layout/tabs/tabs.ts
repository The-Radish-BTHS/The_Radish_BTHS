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
    name: "People",
    outlineIcon: BsPeople,
    fillIcon: BsPeopleFill,
    route: "/people",
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

export const accountTabs: ITab[] = [
  {
    name: "Account",
    outlineIcon: MdOutlineArticle,
    fillIcon: MdArticle,
    route: "/account",
  },
  {
    name: "Submit An Article",
    outlineIcon: MdOutlineArticle,
    fillIcon: MdArticle,
    route: "/articles/submit",
  },
];

export const EggsexTab: ITab = {
  name: "Exec Dashboard",
  outlineIcon: MdOutlineArticle,
  fillIcon: MdArticle,
  route: "/eggsex",
};

export const EditorDashboardTab: ITab = {
  name: "Editor Dashboard",
  outlineIcon: MdOutlineArticle,
  fillIcon: MdArticle,
  route: "/editor-dashboard",
};

export const ArtsyDashboardTab: ITab = {
  name: "Artsy Dashboard",
  outlineIcon: MdOutlineArticle,
  fillIcon: MdArticle,
  route: "/artsy-dashboard",
};
