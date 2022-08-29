import { Divider, Flex, FlexProps, Heading } from "@chakra-ui/react";
import Link from "@components/shared/link";
import Radamir from "@components/shared/radamir";
import { TextTab } from "./sidebar/tab";
import { navigationTabs } from "./sidebar/tabs";

const Wrapper: React.FC<React.PropsWithChildren<FlexProps>> = ({
  children,
  ...rest
}) => (
  <Flex h="100%" flex={1} alignItems="center" {...rest}>
    {children}
  </Flex>
);

const Topbar: React.FC<{ selectedTab: any }> = ({ selectedTab }) => {
  return (
    <Flex flexDirection="column">
      <Flex alignItems="center" p="0.8rem 0.75rem" w="100%">
        <Wrapper>
          <Link href="/">
            <Flex alignItems="center" gap="1rem">
              <Radamir size="2.75rem" />
              <Heading>The Radish</Heading>
            </Flex>
          </Link>
        </Wrapper>
        <Wrapper justifyContent="center" gap="1rem">
          {navigationTabs.map((tab, i) => (
            <TextTab key={i} tab={tab} selected={selectedTab === tab} />
          ))}
        </Wrapper>
        <Wrapper />
      </Flex>
      <Divider borderColor="newGrays.100" />
    </Flex>
  );
};

export default Topbar;
