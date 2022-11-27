import { Flex } from "@chakra-ui/react";

const DataInput: React.FC<{
  number?: boolean;
  initialValue: string | number | undefined;
  value: string | number | undefined;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  placeholder: string;
}> = ({ number, initialValue, value, setValue, placeholder }) => {
  return (
    <Flex>
      <input
        placeholder={placeholder}
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

export default DataInput;
