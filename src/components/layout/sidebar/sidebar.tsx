import { Divider, Flex } from "@chakra-ui/react";
import { Tab } from "./tab";
import { navigationTabs } from "./tabs";

const Sidebar: React.FC<{ selectedTab: any }> = ({ selectedTab }) => (
  <Flex>
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      p="1rem"
      gap="0.75rem">
      {navigationTabs.map((tab, i) => (
        <Tab key={i} tab={tab} selected={selectedTab === tab} />
      ))}
    </Flex>
    <Divider orientation="vertical" borderColor="grays.100" />
  </Flex>
);
export default Sidebar;
