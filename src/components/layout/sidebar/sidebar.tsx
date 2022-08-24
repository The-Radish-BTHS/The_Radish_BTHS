import { Divider, Flex } from "@chakra-ui/react";
import { Tab } from "./tab";
import { navigationTabs } from "./tabs";

const Sidebar: React.FC<{ selectedTab: any }> = ({ selectedTab }) => (
  <Flex>
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      p="0.9rem 0.7rem"
      gap="1.2rem">
      {navigationTabs.map((tab, i) => (
        <Tab key={i} tab={tab} selected={selectedTab === tab} />
      ))}
    </Flex>
    <Divider orientation="vertical" borderColor="newGrays.100" />
  </Flex>
);
export default Sidebar;
