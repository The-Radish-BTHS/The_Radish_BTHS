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
      {selected ? (
        <tab.fillIcon size="1.5rem" fill="white" />
      ) : (
        <tab.outlineIcon size="1.5rem" fill="white" />
      )}

      <Text fontSize="0.8rem">{tab.name}</Text>
    </Flex>
  </Link>
);
