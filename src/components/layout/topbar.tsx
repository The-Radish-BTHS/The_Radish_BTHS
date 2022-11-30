import {
  Box,
  Divider,
  Flex,
  FlexProps,
  Heading,
  Image,
  useTheme,
} from "@chakra-ui/react";
import Link from "@components/link";
import { useIsMobile } from "@hooks/useIsMobile";
import { useRef } from "react";
import PfpSection from "./pfp-section";
import MobileNav from "./tabs/mobile-nav";
import { Tab } from "./tabs/tab";
import { navigationTabs } from "./tabs/tabs";

const Wrapper: React.FC<React.PropsWithChildren<FlexProps>> = ({
  children,
  ...rest
}) => (
  <Flex h="100%" flex={1} alignItems="center" {...rest}>
    {children}
  </Flex>
);

const Topbar: React.FC<{ image: string }> = ({ image }) => {
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
              <Image src={image} alt="icon" maxW="2.75rem" maxH="2.75rem" />
              <Heading
                fontSize={{
                  base: "1.75rem",
                  sm: "2.5rem",
                  md: "1.75rem",
                  lg: "2.5rem",
                }}>
                The Radish
              </Heading>
            </Flex>
          </Link>
        </Wrapper>
        {isMobile ? (
          <MobileNav containerRef={mobileDropdownRef} />
        ) : (
          <>
            <Wrapper justifyContent="center" gap="1rem">
              {navigationTabs.map((tab, i) => (
                <Tab key={i} tab={tab} />
              ))}
            </Wrapper>
            <Wrapper justifyContent="flex-end" pr="1.5rem">
              <PfpSection />
            </Wrapper>
          </>
        )}
      </Flex>
      <Box ref={mobileDropdownRef} zIndex={999} />
      <Divider borderColor="newGrays.100" />
    </Flex>
  );
};

export default Topbar;
