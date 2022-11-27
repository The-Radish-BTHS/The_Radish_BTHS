import { Flex, Heading, Text } from "@chakra-ui/react";
import DataInput from "@components/pages/account/data-input";
import Layout from "@components/layout/layout";
import ExecStamp from "@components/exec-stamp";
import { getPeopleSlugs } from "@lib/getters/many-getters.server";
import { customSlugify } from "@lib/helpers.server";
import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

const update = async (slug: string, data: any) => {
  const response = await fetch(`/api/update?type=person&&slug=${slug}`, {
    method: "post",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((e) => {
      console.error(e);
      return e;
    });

  return response;
};

const Account: NextPage<{ peopleSlugs: string[] }> = ({ peopleSlugs }) => {
  const { data } = useSession();
  const person = data?.user?.person;

  const today = new Date();

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

    if (name !== person?.name && personSlugIsUnique(name!)) {
      await update(person?.slug, {
        name: name,
        slug: customSlugify(name!),
      });
    }
    if (gradYear !== person?.gradYear) {
      await update(person?.slug, {
        gradYear: gradYear,
      });
    }
    if (description !== person?.description) {
      await update(person?.slug, {
        description: description,
      });
    }

    reloadSession();
  };

  return (
    <Layout title="My Account">
      <Flex gap="1.5rem">
        <Heading fontSize="4rem" fontFamily={"times-new-roman"}>
          {name}
        </Heading>
        {person?.isExec && <ExecStamp id="" size={80} />}
      </Flex>

      <Text fontSize="2.5rem" fontWeight={300} textTransform="capitalize">
        {person?.position}, Graduat{former ? "ed" : "ing"} {gradYear}
      </Text>
      <Text ml="1.5rem" fontSize="1.5rem">
        {description ? `"${description}"` : <br />}
      </Text>
      <Flex flexDirection="column" mt="3rem">
        <Heading mb="1rem">Update your information</Heading>

        <DataInput
          initialValue={person?.name}
          value={name}
          setValue={setName}
          placeholder="Name"
        />
        {!personSlugIsUnique(name || "") && name !== person?.name && (
          <p className={"form-element-margin error-message"}>
            Someone with that name already exists!
          </p>
        )}
        <DataInput
          initialValue={person?.gradYear}
          value={gradYear}
          setValue={setGradYear}
          placeholder="Graduation Year"
          number
        />
        <DataInput
          initialValue={person?.description}
          value={description}
          setValue={setDescription}
          placeholder="Description"
        />
        <button
          className="accountSubmitButton"
          onClick={onSubmit}
          disabled={
            (name === person?.name &&
              gradYear === person?.gradYear &&
              description === person?.description) ||
            (!personSlugIsUnique(name || "") && name !== person?.name)
          }>
          Save!
        </button>
      </Flex>
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
