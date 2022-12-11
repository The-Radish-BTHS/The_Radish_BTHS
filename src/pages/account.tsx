import { Flex, Heading, Text } from "@chakra-ui/react";
import DataInput from "@components/pages/account/data-input";
import Layout from "@components/layout/layout";
import ExecStamp from "@components/exec-stamp";
import { getPeopleSlugs } from "@lib/getters/many-getters.server";
import { customSlugify } from "@lib/helpers.server";
import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import RequiredUserWrapper from "@components/required-user-wrapper";
import { trpc } from "@lib/trpc";

const Account: NextPage<{ peopleSlugs: string[] }> = ({ peopleSlugs }) => {
  const { data } = useSession();
  const person = data?.user?.person;

  const today = new Date();
  const updateAccount = trpc.person.update.useMutation();

  const [name, setName] = useState(person?.name);
  const [gradYear, setGradYear] = useState(person?.gradYear);
  const [former, setFormer] = useState(
    person && today.getMonth() > 6 && today.getFullYear() >= person?.gradYear
  );
  const [description, setDescription] = useState(person?.description);

  useEffect(() => {
    setName(person?.name);
    setGradYear(person?.gradYear);
    setDescription(person?.description);
  }, [person]);

  useEffect(() => {
    const today = new Date();

    if (gradYear) {
      setFormer(
        person && today.getMonth() > 6 && today.getFullYear() >= gradYear
      );
    }
  }, [person, gradYear]);

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
          <Heading fontSize="4rem" fontFamily={"times-new-roman"}>
            {name}
          </Heading>
          {person?.isExec && <ExecStamp id="" size={80} />}
        </Flex>

        <Text fontSize="2.5rem" fontWeight={300} textTransform="capitalize">
          {person?.position}, Graduat{former ? "ed" : "ing"} {gradYear}
        </Text>
        <Text fontSize="1.5rem">
          {description ? `"${description}"` : <br />}
        </Text>
        <Flex flexDirection="column" mt="3rem">
          <Heading mb="1rem">Update your information</Heading>

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
          <Flex gap="1rem">
            <button
              className="accountSubmitButton"
              onClick={onSubmit}
              disabled={
                (name === person?.name &&
                  gradYear === person?.gradYear &&
                  description === person?.description) ||
                (!personSlugIsUnique(name || "") && name !== person?.name)
              }
            >
              Save!
            </button>
            <button
              className="accountRevertButton"
              disabled={
                description === person?.description &&
                gradYear === person?.gradYear &&
                name === person?.name
              }
              onClick={() => {
                setDescription(person?.description);
                setGradYear(person?.gradYear);
                setName(person?.name);
              }}
            >
              Revert
            </button>
          </Flex>
        </Flex>
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
