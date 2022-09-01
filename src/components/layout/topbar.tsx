import {
  Box,
  Divider,
  Flex,
  FlexProps,
  Heading,
  useTheme,
} from "@chakra-ui/react";
import Link from "@components/shared/link";
import Radamir from "@components/shared/radamir";
import { useIsMobile } from "@hooks/useIsMobile";
import { useRef } from "react";
import MobileNav from "./tabs/mobile-nav";
import { Tab } from "./tabs/tab";
import { ITab, navigationTabs } from "./tabs/tabs";

const Wrapper: React.FC<React.PropsWithChildren<FlexProps>> = ({
  children,
  ...rest
}) => (
  <Flex h="100%" flex={1} alignItems="center" {...rest}>
    {children}
  </Flex>
);

const Topbar: React.FC<{ selectedTab: ITab | undefined }> = ({
  selectedTab,
}) => {
  const isMobile = useIsMobile();
  const mobileDropdownRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const theme = useTheme();
  const bg = theme.styles.global.body.bg;
  return (
    <Flex
      flexDirection="column"
      position="absolute"
      w="100%"
      bgColor={bg}
      zIndex={999}>
      <Flex alignItems="center" p="0.8rem 0.75rem" w="100%">
        <Wrapper>
          <Link href="/">
            <Flex alignItems="center" gap="1rem">
              <Radamir size="2.75rem" />
              <Heading>The Radish</Heading>
            </Flex>
          </Link>
        </Wrapper>
        {isMobile ? (
          <MobileNav
            selectedTab={selectedTab}
            containerRef={mobileDropdownRef}
          />
        ) : (
          <>
            <Wrapper justifyContent="center" gap="1rem">
              {navigationTabs.map((tab, i) => (
                <Tab key={i} tab={tab} selected={selectedTab === tab} />
              ))}
            </Wrapper>
            <Wrapper />
          </>
        )}
      </Flex>
      <Box ref={mobileDropdownRef} zIndex={999} />
      <Divider borderColor="newGrays.100" />
    </Flex>
  );
};

export default Topbar;
