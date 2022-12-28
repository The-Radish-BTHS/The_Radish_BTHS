import { Text } from "@chakra-ui/react";

const InputWrapper: React.FC<
  React.PropsWithChildren<{
    title: string;
    description?: string;
    required?: boolean;
  }>
> = ({ title, description, required = false, children }) => {
  return (
    <>
      {" "}
      <Text fontWeight="bold">
        {title}:{required ? <span style={{ color: "red" }}> *</span> : <></>}
      </Text>
      {description && <Text>{description}</Text>}
      {children}
    </>
  );
};

export default InputWrapper;
