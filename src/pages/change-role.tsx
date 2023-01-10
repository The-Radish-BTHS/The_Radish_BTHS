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
import { Person, User, UserPermission } from "@prisma/client";
import { NextPage } from "next";
import { useState } from "react";

const ChangeRole: NextPage = () => {
  const toast = useToast();
  const changePermission = trpc.user.changePermission.useMutation({
    onError(err) {
      toast({
        title: `User Change Role errror ${err.data?.httpStatus}: ${err.message}`,
        status: "error",
        duration: 4000,
        position: "bottom-right",
        isClosable: true,
      });
    },
    onSuccess() {
      toast({
        title: "Role changed successfully!",
        status: "success",
        duration: 4000,
        position: "bottom-right",
        isClosable: true,
      });
    },
  });

  const usersQuery = trpc.user.getAll.useQuery();
  const users = usersQuery.data || [];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [data, setData] = useState<{
    userId?: string;
    currentRole?: string;
    newRole?: string;
  }>();

  console.log(data);

  return (
    <Layout title="Change a role!">
      <RequiredUserWrapper roleNeeded="exec">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>This better be the right person!</Text>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => {
                  if (!(data?.userId && data.newRole)) return;
                  if (
                    ![
                      "NORMIE",
                      "EDITOR",
                      "ARTIST",
                      "TEAMS_MEMBER",
                      "EXEC",
                    ].includes(data.newRole)
                  )
                    return;

                  changePermission.mutate({
                    userId: data?.userId,
                    permission: data.newRole as
                      | "NORMIE"
                      | "EDITOR"
                      | "ARTIST"
                      | "TEAMS_MEMBER"
                      | "EXEC",
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
          w="30rem"
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
                currentRole: new_data.role,
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
                    role: user.permission,
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
          w="30rem"
          justifyContent="space-between">
          <Text>What should they be? </Text>
          <Select
            placeholder="Choose their role"
            variant="flushed"
            borderColor="black"
            w="15rem"
            onChange={(e) => setData({ ...data, newRole: e.target.value })}>
            <option value={UserPermission.NORMIE}>Normie (lame)</option>
            <option value={UserPermission.ARTIST}>Graphics Team</option>
            <option value={UserPermission.EDITOR}>Editing Team</option>
            <option value={UserPermission.TEAMS_MEMBER}>Both Teams</option>
            <option value={UserPermission.EXEC}>Executive</option>
          </Select>
        </Flex>

        <Button
          mt="3rem"
          width="20rem"
          onClick={() => onOpen()}
          disabled={!(data?.userId && data.newRole)}>
          Change
        </Button>
      </RequiredUserWrapper>
    </Layout>
  );
};

export default ChangeRole;
