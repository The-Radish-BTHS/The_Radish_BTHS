import Link from "@components/link";
import { IconType } from "react-icons";

export const IconLink: React.FC<{ Icon: IconType; href: string }> = ({
  Icon,
  href,
}) => (
  <Link href={href} target="_blank">
    <Icon size="2rem" />
  </Link>
);
