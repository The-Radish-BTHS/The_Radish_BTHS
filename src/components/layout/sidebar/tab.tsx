import { Flex, Text } from "@chakra-ui/react";
import Link from "@components/shared/link";
import { ITab } from "./tabs";

interface ITabProps {
  tab: ITab;
  selected: boolean;
}

export const Tab: React.FC<ITabProps> = ({ tab, selected }) => (
  <Link href={tab.route ?? ""}>
    <Flex flexDirection="column" alignItems="center">
      <tab.icon
        size="2rem"
        fill={selected ? "white" : "rgba(255,255,255, 0.2)"}
      />
      <Text
        fontSize="0.8rem"
        color={selected ? "white" : "rgba(255,255,255, 0.5)"}>
        {tab.name}
      </Text>
    </Flex>
  </Link>
);
