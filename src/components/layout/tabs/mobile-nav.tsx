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
import { accountTabs, navigationTabs } from "./tabs";
import { Cross } from "hamburger-react";
import { signIn, signOut, useSession } from "next-auth/react";

const MobileNav: React.FC<{
  containerRef: React.MutableRefObject<HTMLDivElement>;
}> = ({ containerRef }) => {
  const controls = useDisclosure();
  const theme = useTheme();
  const bg = theme.styles.global.body.bg;
  const { status } = useSession();
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
                <Tab tab={tab} key={index} />
              ))}
              <Divider borderColor="black" />
              {authed ? (
                <>
                  {accountTabs.map((tab, index) => (
                    <Tab tab={tab} key={"account" + index} />
                  ))}
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
