import { Flex, Heading, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const RequiredUserWrapper: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const router = useRouter();
  const { status, data } = useSession();

  if (status === "authenticated" && !data.user?.hasSignedUp)
    router.push("/sign-up");

  return status === "unauthenticated" ? (
    <Flex
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Heading>Login First!</Heading>
      <Text>Look up there!</Text>
    </Flex>
  ) : (
    <>{children}</>
  );
};

export default RequiredUserWrapper;
