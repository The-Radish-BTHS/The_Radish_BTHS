import { Center, Flex, Heading, Text, Textarea } from "@chakra-ui/react";
import Button from "@components/button";
import { trpc } from "@lib/trpc";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const SignUpPage: NextPage = () => {
  const completeSignUp = trpc.person.update.useMutation();
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const router = useRouter();

  if (!session?.user) return <Text>Loading</Text>;
  // TODO: callback urls
  if (session?.user.hasSignedUp) router.push("/");

  // TOOD: UI
  return (
    <Center mt="4">
      <Flex gap={2} w="40rem" flexDirection="column">
        <Heading>Hello fellow human!</Heading>
        <Text>We see that you are new around here</Text>
        <Text>Tell us a bit more about yourself</Text>

        <br />

        <Text fontFamily="monospace">
          {`Enter valid JSON in the form of: 
{
slug: z.string(),
name: z.string(),
gradYear: z.number(),
description: z.string(),
}`
            .split("\n")
            .map((v) => (
              <span key={v}>
                {v}
                <br />
              </span>
            ))}
        </Text>

        <Textarea
          fontFamily="monospace"
          w="40rem"
          h={300}
          borderColor="red.200"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />

        <Button
          onClick={async () => {
            await completeSignUp.mutateAsync({
              ...JSON.parse(input),
              completeSignUp: true,
            });
            // TODO: callback urls
            router.push("/");
          }}
        >
          Sign up
        </Button>
      </Flex>
    </Center>
  );
};

export default SignUpPage;
