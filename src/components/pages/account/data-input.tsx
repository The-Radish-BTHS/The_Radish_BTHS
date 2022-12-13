import { Flex, Input, Text } from "@chakra-ui/react";

const DataInput: React.FC<{
  number?: boolean;
  value: string | number | undefined;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  max?: number;
  placeholder: string;
}> = ({ number, value, setValue, max, placeholder }) => {
  return (
    <>
      <Text
        textAlign="left"
        width={{ base: "80vw", md: "50vw" }}
        mt="1rem"
        fontWeight={600}>
        {placeholder}:
      </Text>
      <Input
        placeholder={placeholder}
        pattern={number ? "d*" : "*"}
        value={value || (number ? 0 : "")}
        style={{
          background: "transparent",
          border: "1px solid black",
          borderRadius: "0.75rem",
          marginBottom: "0.5rem",
          marginRight: "0.5rem",
          padding: "0.5rem",
        }}
        width={{ base: "80vw", md: "50vw" }}
        maxLength={max}
        onChange={(e) =>
          setValue(number ? parseInt(e.target.value) : e.target.value)
        }
      />
    </>
  );
};

export default DataInput;
