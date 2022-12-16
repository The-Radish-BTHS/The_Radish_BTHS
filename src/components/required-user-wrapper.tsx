import { Flex, Heading, Text } from "@chakra-ui/react";
import { useCanAccess } from "@hooks/useCanAccess";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const RequiredUserWrapper: React.FC<
  React.PropsWithChildren<{
    roleNeeded?: "exec" | "editor" | "artist" | "normie" | "";
  }>
> = ({ roleNeeded = "", children }) => {
  const router = useRouter();
  const { status, data } = useSession();
  const { canAccess } = useCanAccess();

  if (status === "authenticated" && !data.user?.hasSignedUp)
    router.push("/sign-up");

  if (!canAccess(roleNeeded)) {
    return (
      <Flex
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        flexDir="column">
        <Heading>You Don&apos;t Belong Here!</Heading>
        <Text>Sorry!</Text>
      </Flex>
    );
  }

  return status === "unauthenticated" ? (
    <Flex
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
      flexDir="column">
      <Heading>Login First!</Heading>
      <Text>Look up there!</Text>
    </Flex>
  ) : (
    <>{children}</>
  );
};

export default RequiredUserWrapper;
