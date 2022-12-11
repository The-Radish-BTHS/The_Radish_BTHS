import { Button } from "@chakra-ui/react";
import { trpc } from "@lib/trpc";
import { NextPage } from "next";

const LinkPerson: NextPage = () => {
  const linkUserToExistingPerson =
    trpc.person.linkUserToExistingPerson.useMutation();

  return (
    <Button
      onClick={() => {
        // NOTE: THE CURRENT PERSON GOES POOF
        // THIS WILL FAIL IF THERE ARE ARTICLES ASSOCIATED THE CURRENT PERSON SLUG
        //
        // (SANTIAGO WHY DID YOU MAKE THE FUCKING SLUG THE FOREIGN KEY)
        linkUserToExistingPerson.mutate({
          // FROM
          currentPersonSlug: "gilbert-zhang",
          // TO
          oldPersonSlug: "aramie-ewen",
        });
      }}
    >
      Work
    </Button>
  );
};

export default LinkPerson;
