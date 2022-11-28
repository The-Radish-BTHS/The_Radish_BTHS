import {
  Box,
  Collapse,
  Divider,
  Flex,
  Portal,
  Text,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import { Tab } from "./tab";
import {
  accountTabs,
  EditorDashboardTab,
  EggsexTab,
  ITab,
  navigationTabs,
} from "./tabs";
import { Cross } from "hamburger-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserPermission } from "@prisma/client";

const MobileNav: React.FC<{
  selectedTab: ITab | undefined;
  containerRef: React.MutableRefObject<HTMLDivElement>;
}> = ({ selectedTab, containerRef }) => {
  const controls = useDisclosure();
  const theme = useTheme();
  const bg = theme.styles.global.body.bg;
  const { data: sessionData, status } = useSession();
  const authed = status === "authenticated";

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
              <Divider borderColor="black" />
              {authed ? (
                <>
                  {accountTabs.map((tab, index) => (
                    <Tab
                      tab={tab}
                      key={"account" + index}
                      selected={tab === selectedTab}
                    />
                  ))}
                  {(sessionData?.user?.permission === UserPermission.EDITOR ||
                    sessionData?.user?.permission === UserPermission.EXEC) && (
                    <Tab
                      tab={EditorDashboardTab}
                      key={"editorDashbaord"}
                      selected={EditorDashboardTab === selectedTab}
                    />
                  )}
                  {sessionData?.user?.permission === UserPermission.EXEC && (
                    <Tab
                      tab={EggsexTab}
                      key={"eggsex"}
                      selected={EggsexTab === selectedTab}
                    />
                  )}
                  <Text
                    fontSize={{ base: "1.2rem", md: "1rem" }}
                    fontWeight={400}
                    onClick={() => signOut()}>
                    Sign out
                  </Text>
                </>
              ) : (
                <Text
                  fontSize={{ base: "1.2rem", md: "1rem" }}
                  fontWeight={400}
                  onClick={() => signIn("google")}>
                  Sign in
                </Text>
              )}
            </Flex>
          </Box>
        </Collapse>
      </Portal>
    </Flex>
  );
};

export default MobileNav;
