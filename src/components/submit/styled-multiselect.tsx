import { useTheme } from "@chakra-ui/react";
import Multiselect from "multiselect-react-dropdown";
import React, { createRef, useEffect } from "react";
import styles from "./styles.module.css";

const StyledMultiselect: React.FC<{
  values: { name: string; id: number }[];
}> = ({ values }) => {
  const ref = createRef<Multiselect>();

  if (ref.current) {
    console.log("ergehhgwe");
    ref.current.onFocus = () => {
      console.log("hey");
    };
  }

  return (
    <Multiselect
      className={styles.multiselect}
      ref={ref}
      onSearch={() => console.log("Hi")}
      style={{
        searchBox: {
          display: "flex",
          alignItems: "center",
          width: "60vw",
          height: "2.6rem",
          padding: "0.5rem",
          border: "1px solid black",
          borderRadius: "0.75rem",
        },
        chips: {
          marginBottom: "0",
          background: "transparent",
          border: "1px solid black",
          borderRadius: "0.75rem",
          color: "black",
          fill: "black",
        },
        optionContainer: {
          background: useTheme().styles.global.body.bg,
          border: "1px solid black",
        },
        multiselectContainer: {
          color: "black",
        },
        option: {
          color: "black",
        },
      }}
      closeIcon="cancel"
      avoidHighlightFirstOption={true}
      closeOnSelect={true}
      placeholder="Select..."
      options={values} // Options to display in the dropdown
      displayValue="name" // Property name to display in the dropdown options
    />
  );
};

export default StyledMultiselect;
