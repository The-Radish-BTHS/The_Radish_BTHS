import { Flex, Heading, Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import ExecStamp from "@components/shared/exec-stamp";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

const DataInput: React.FC<{
  number?: boolean;
  initialValue: string | number | undefined;
  value: string | number | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | number | undefined>>;
}> = ({ number, initialValue, value, setValue }) => {
  return (
    <Flex>
      <input
        type={number ? "number" : "text"}
        value={value || (number ? 0 : "")}
        style={{
          background: "transparent",
          border: "1px solid black",
          borderRadius: "0.75rem",
          marginBottom: "0.5rem",
          marginRight: "0.5rem",
          padding: "0.5rem",
          width: "50vw",
        }}
        onChange={(e) =>
          setValue(number ? parseInt(e.target.value) : e.target.value)
        }
      />{" "}
      <button
        className="accountRevertButton"
        disabled={value === initialValue}
        onClick={() => setValue(initialValue)}>
        Revert
      </button>
    </Flex>
  );
};

const Account: NextPage = () => {
  const { data } = useSession();
  const person = data?.user?.person;

  const today = new Date();

  const [name, setName] = useState<string | number | undefined>(person?.name);
  const [gradYear, setGradYear] = useState<string | number | undefined>(
    person?.gradYear
  );
  const [former, setFormer] = useState(
    person && today.getMonth() > 6 && today.getFullYear() >= person?.gradYear
  );
  const [description, setDescription] = useState<string | number | undefined>(
    person?.description
  );

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
        />
        <DataInput
          initialValue={person?.gradYear}
          value={gradYear}
          setValue={setGradYear}
          number
        />
        <DataInput
          initialValue={person?.description}
          value={description}
          setValue={setDescription}
        />
        <button
          className="accountSubmitButton"
          disabled={
            name === person?.name &&
            gradYear === person?.gradYear &&
            description === person?.description
          }>
          Save!
        </button>
      </Flex>
    </Layout>
  );
};

export default Account;
