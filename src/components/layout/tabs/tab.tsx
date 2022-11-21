import { Flex, Text, useTheme } from "@chakra-ui/react";
import Link from "@components/link";
import { ITab } from "./tabs";

interface ITabProps {
  tab: ITab;
  selected: boolean;
}

export const Tab: React.FC<ITabProps> = ({ tab, selected }) => (
  <Link href={tab.route ?? ""}>
    <Text
      fontSize={{ base: "1.2rem", md: "1rem" }}
      fontWeight={selected ? 600 : 400}>
      {" "}
      {tab.name}
    </Text>
  </Link>
);
