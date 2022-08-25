import { Flex, Text, useTheme } from "@chakra-ui/react";
import Link from "@components/shared/link";
import { ITab } from "./tabs";

interface ITabProps {
  tab: ITab;
  selected: boolean;
}

export const Tab: React.FC<ITabProps> = ({ tab, selected }) => {
  const theme = useTheme();

  return (
    <Link href={tab.route ?? ""}>
      <Flex flexDirection="column" alignItems="center">
        {selected ? (
          <tab.fillIcon size="1.5rem" fill={theme.colors.theme.color} />
        ) : (
          <tab.outlineIcon size="1.5rem" fill={theme.colors.theme.color} />
        )}

        <Text fontSize="0.8rem">{tab.name}</Text>
      </Flex>
    </Link>
  );
};
