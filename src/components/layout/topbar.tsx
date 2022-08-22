import { Divider, Flex, Heading } from "@chakra-ui/react";
import Radamir from "@components/shared/radamir";

const Topbar: React.FC = () => {
  return (
    <Flex flexDirection="column">
      <Flex alignItems="center" p="1rem 0.75rem">
        <Flex h="100%" alignItems="center" gap="1rem">
          <Radamir size="2.75rem" />
          <Heading>The Radish</Heading>
        </Flex>
      </Flex>
      <Divider borderColor="grays.100" />
    </Flex>
  );
};

export default Topbar;
