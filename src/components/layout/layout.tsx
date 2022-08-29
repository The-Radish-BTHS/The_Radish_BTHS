import { Flex, FlexProps } from "@chakra-ui/react";
import Sidebar from "./sidebar/sidebar";
import Title from "./title";
import Topbar from "./topbar";
import { navigationTabs } from "./sidebar/tabs";

interface LayoutProps extends FlexProps {
  pageIndex?: number;
  header?: string;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  pageIndex,
  header,
  children,
  ...rest
}) => (
  <Flex flexDirection="column" maxW="100vw" w="100vw" maxH="100vh" h="100vh">
    <Title page={pageIndex ? navigationTabs[pageIndex].name : ""} />
    <Topbar
      selectedTab={
        pageIndex !== undefined ? navigationTabs[pageIndex] : undefined
      }
    />
    <Flex w="100%" maxH="100%" flex={1}>
      {/* <Sidebar
        selectedTab={
          pageIndex !== undefined ? navigationTabs[pageIndex] : undefined
        }
      /> */}
      <Flex
        flex={1}
        p="1.5rem 2rem"
        pb="10rem"
        flexDirection="column"
        overflowY="scroll"
        {...rest}>
        {children}
      </Flex>
    </Flex>
  </Flex>
);

export default Layout;
