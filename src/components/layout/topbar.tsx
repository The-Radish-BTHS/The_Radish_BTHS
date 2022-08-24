import { Divider, Flex, Heading } from "@chakra-ui/react";
import Link from "@components/shared/link";
import Radamir from "@components/shared/radamir";

const Topbar: React.FC = () => {
  return (
    <Flex flexDirection="column">
      <Flex alignItems="center" p="0.8rem 0.75rem">
        <Link href="/">
          <Flex h="100%" alignItems="center" gap="1rem">
            <Radamir size="2.75rem" />
            <Heading>The Radish</Heading>
          </Flex>
        </Link>
      </Flex>
      <Divider borderColor="newGrays.100" />
    </Flex>
  );
};

export default Topbar;
