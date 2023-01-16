import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import DataInput from "@components/pages/account/data-input";
import Layout from "@components/layout/layout";
import ExecStamp from "@components/exec-stamp";
import { getPeopleSlugs } from "@lib/getters/many-getters.server";
import { customSlugify } from "@lib/helpers.server";
import { GetServerSideProps, NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import RequiredUserWrapper from "@components/required-user-wrapper";
import { trpc } from "@lib/trpc";
import Button from "@components/button";
import { BiSave } from "react-icons/bi";
import { GrRevert } from "react-icons/gr";
import { useIsFormer } from "@hooks/useIsFormer";

const Account: NextPage<{ peopleSlugs: string[] }> = ({ peopleSlugs }) => {
  const { data } = useSession();
  const { isFormer } = useIsFormer();
  const person = data?.user?.person;

  const today = new Date();
  const updateAccount = trpc.person.update.useMutation();
  const confirmationDisclosure = useDisclosure();
  const deleteMyAccount = trpc.user.deleteMyAccount.useMutation();

  const [name, setName] = useState(person?.name);
  const [gradYear, setGradYear] = useState(person?.gradYear);
  const [former, setFormer] = useState(person && isFormer(person?.gradYear));
  const [description, setDescription] = useState(person?.description);

  useEffect(() => {
    setName(person?.name);
    setGradYear(person?.gradYear);
    setDescription(person?.description);
  }, [person]);

  useEffect(() => {
    const today = new Date();

    if (gradYear) {
      setFormer(person && isFormer(gradYear));
    }
  }, [person, gradYear, isFormer]);

  const personSlugIsUnique = (name: string) => {
    const isUnique = peopleSlugs.indexOf(customSlugify(name)) === -1;
    return isUnique;
  };

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const onSubmit = async () => {
    if (!person?.slug) {
      return;
    }

    if (name && gradYear && description !== undefined) {
      await updateAccount
        .mutateAsync({
          name: name,
          gradYear: gradYear,
          description: description,
        })
        .then(() => reloadSession());
    }
  };

  return (
    <Layout title="My Account">
      <RequiredUserWrapper>
        <Flex gap="1.5rem">
          <Flex flex={1} />
          <Heading
            fontSize="3.5rem"
            w="100%"
            flex={1}
            fontWeight={600}
            textAlign="center"
          >
            {name}
          </Heading>
          <Flex flex={1} justifyContent="flex-end">
            {person?.isExec && <ExecStamp id="" size={80} />}
          </Flex>
        </Flex>

        <Text
          fontSize="2rem"
          fontWeight={300}
          w="100%"
          textAlign="center"
          textTransform="capitalize"
        >
          {person?.position}, Graduat{former ? "ed" : "ing"} {gradYear}
        </Text>
        <Text fontSize="2rem" fontWeight={300} w="100%" textAlign="center">
          {description ? `"${description}"` : <br />}
        </Text>

        <Flex flexDirection="column" alignItems="center" mt="3rem">
          <Heading
            mb="1rem"
            fontWeight={600}
            fontSize="2.5rem"
            textAlign="center"
          >
            Update your information
          </Heading>

          <DataInput value={name} setValue={setName} placeholder="Name" />
          {!personSlugIsUnique(name || "") && name !== person?.name && (
            <p className={"form-element-margin error-message"}>
              Someone with that name already exists!
            </p>
          )}
          <DataInput
            value={gradYear}
            setValue={setGradYear}
            placeholder="Graduation Year"
            max={4}
            number
          />
          <DataInput
            value={description}
            setValue={setDescription}
            placeholder="Description"
          />
          <Flex gap="1.5rem" mt="1rem">
            <Button
              leftIcon={<BiSave />}
              _disabled={{ display: "none" }}
              onClick={onSubmit}
              disabled={
                (name === person?.name &&
                  gradYear === person?.gradYear &&
                  description === person?.description) ||
                (!personSlugIsUnique(name || "") && name !== person?.name)
              }
            >
              Save
            </Button>
            <Button
              leftIcon={<GrRevert />}
              _disabled={{ display: "none" }}
              onClick={() => {
                setDescription(person?.description);
                setGradYear(person?.gradYear);
                setName(person?.name);
              }}
              disabled={
                description === person?.description &&
                gradYear === person?.gradYear &&
                name === person?.name
              }
            >
              Revert
            </Button>
          </Flex>
        </Flex>

        <Modal {...confirmationDisclosure}>
          <ModalOverlay />

          <ModalContent bg="#ebeae5">
            <ModalHeader>Are you REALLY REALLY SURE?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Deleting your account will delete:</Text>
              <Box ml="4">
                <ul>
                  <li>Your article submissions</li>
                  <li>Your account</li>
                  <li>Your profile</li>
                </ul>
              </Box>

              <Text mt="2">
                <b>THIS WILL FAIL IF YOU HAVE WRITTEN ANY ARTICLES.</b> Please
                ask an exec to help delete your account.
              </Text>

              <Button
                mt="4"
                mb="2"
                w="full"
                isLoading={deleteMyAccount.isLoading}
                onClick={() => {
                  deleteMyAccount.mutateAsync().then(() => {
                    signOut({
                      callbackUrl: "/",
                    });
                  });
                }}
              >
                I am sure, delete my account
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Button
          mt="16"
          w="80"
          mx="auto"
          onClick={() => {
            confirmationDisclosure.onOpen();
          }}
        >
          I want to delete my account.
        </Button>
      </RequiredUserWrapper>
    </Layout>
  );
};

export default Account;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const peopleSlugs = await getPeopleSlugs();

  return {
    props: {
      peopleSlugs,
    },
  };
};
