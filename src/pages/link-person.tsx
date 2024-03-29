import {
  Flex,
  Select,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/layout/layout";
import RequiredUserWrapper from "@components/required-user-wrapper";
import { trpc } from "@lib/trpc";
import { Person, User } from "@prisma/client";
import { NextPage } from "next";
import { useState } from "react";

const LinkPerson: NextPage = () => {
  const toast = useToast();
  const linkUserToExistingPerson =
    trpc.person.linkUserToExistingPerson.useMutation({
      onError(err) {
        toast({
          title: `Person Link errror ${err.data?.httpStatus}: ${err.message}`,
          status: "error",
          duration: 4000,
          position: "bottom-right",
          isClosable: true,
        });
      },
      onSuccess() {
        toast({
          title: "People connected successfully!",
          status: "success",
          duration: 4000,
          position: "bottom-right",
          isClosable: true,
        });
      },
    });

  const usersQuery = trpc.user.getAll.useQuery();
  const users = usersQuery.data || [];
  const peopleQuery = trpc.person.getAll.useQuery({});
  const people = peopleQuery.data || [];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [data, setData] = useState<{
    userId?: string;
    userPersonId?: string;
    personId?: string;
  }>();

  console.log(data);

  return (
    <Layout title="Link A Person!">
      <RequiredUserWrapper roleNeeded="exec">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>This change is irreversible!</Text>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => {
                  if (!(data?.userId && data.personId)) return;
                  // NOTE: THE CURRENT PERSON GOES POOF
                  // THIS WILL FAIL IF THERE ARE ARTICLES ASSOCIATED THE CURRENT PERSON SLUG
                  //
                  // (SANTIAGO WHY DID YOU MAKE THE FUCKING SLUG THE FOREIGN KEY)
                  linkUserToExistingPerson.mutate({
                    // FROM
                    currentUserId: data?.userId,
                    // TO, the existing one
                    newPersonId: data.personId,
                  });
                  onClose();
                }}>
                I am sure!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Flex
          alignItems="center"
          gap="1rem"
          w="25rem"
          justifyContent="space-between">
          <Text>User to change: </Text>
          <Select
            placeholder="Choose a User"
            variant="flushed"
            borderColor="black"
            w="15rem"
            onChange={(e) => {
              const new_data = JSON.parse(e.target.value);
              setData({
                ...data,
                userId: new_data.id,
                userPersonId: new_data.personId,
              });
            }}>
            {users
              .sort(function (a, b) {
                const keyA = a.name ?? "";
                const keyB = b.name ?? "";
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
              })
              .map((user, i) => (
                <option
                  value={JSON.stringify({
                    id: user.id,
                    personId: user.personId,
                  })}
                  key={i}>
                  {user.name} - {user.email}
                </option>
              ))}
          </Select>
        </Flex>
        <Flex
          alignItems="center"
          gap="1rem"
          mt="1rem"
          w="25rem"
          justifyContent="space-between">
          <Text>Who are they? </Text>
          <Select
            placeholder="Choose their account"
            variant="flushed"
            borderColor="black"
            w="15rem"
            onChange={(e) => setData({ ...data, personId: e.target.value })}>
            {people
              .filter(
                (person) => person.id !== data?.userPersonId && !person.user
              )
              .sort(function (a, b) {
                const keyA = a.name;
                const keyB = b.name;
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
              })
              .map((person, i) => (
                <option value={person.id} key={i}>
                  {person.name}
                </option>
              ))}
          </Select>
        </Flex>

        <Button
          mt="3rem"
          width="20rem"
          onClick={() => onOpen()}
          disabled={!(data?.userId && data.personId)}>
          Connect
        </Button>
      </RequiredUserWrapper>
    </Layout>
  );
};

export default LinkPerson;
