import {
  Box,
  Collapse,
  Divider,
  Flex,
  Portal,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import { Tab } from "./tab";
import { ITab, navigationTabs } from "./tabs";
import { Cross } from "hamburger-react";

const MobileNav: React.FC<{
  selectedTab: ITab | undefined;
  containerRef: React.MutableRefObject<HTMLDivElement>;
}> = ({ selectedTab, containerRef }) => {
  const controls = useDisclosure();
  const theme = useTheme();
  const bg = theme.styles.global.body.bg;
  return (
    <Flex flexDirection="column">
      <Flex
        maxW="100rem"
        transition="background-color 0.25s ease-in-out"
        bgColor={bg}
        justifyContent="space-between"
        alignItems="center">
        <Cross onToggle={controls.onToggle} />
      </Flex>
      <Portal containerRef={containerRef}>
        <Collapse in={controls.isOpen}>
          <Box w="100vw" bgColor={bg}>
            <Flex flexDir="column" gap="1rem" px="1rem" py="1rem">
              {navigationTabs.map((tab, index) => (
                <Tab tab={tab} key={index} selected={tab === selectedTab} />
              ))}
            </Flex>
          </Box>
        </Collapse>
      </Portal>
    </Flex>
  );
};

export default MobileNav;
