import PersonType from "@/types/person";
import { useTheme } from "@chakra-ui/react";
import { Person, Topic } from "@prisma/client";
import Multiselect from "multiselect-react-dropdown";
import styles from "./styles.module.css";

function StyledMultiselect<T>({
  options,
  select,
  selectedValues,
  keepFirst,
}: {
  options: T[];
  select: React.Dispatch<React.SetStateAction<T[]>>;
  selectedValues: T[];
  keepFirst?: boolean;
}) {
  return (
    <Multiselect
      className={styles.multiselect}
      onSelect={(_, item) => select((prev) => [...prev, item])}
      onRemove={(_, item) =>
        select((prev) => {
          prev.splice(prev.indexOf(item), 1);
          return prev;
        })
      }
      style={{
        searchBox: {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          width: "60vw",
          height: "fit-content",
          padding: "0.5rem",
          border: "1px solid black",
          borderRadius: "0.75rem",
          gap: "0.4rem 0",
        },
        chips: {
          marginBottom: "0",
          background: "transparent",
          border: "1px solid black",
          borderRadius: "0.75rem",
          color: "black",
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
      disablePreSelectedValues={keepFirst}
      showArrow={true}
      closeOnSelect={true}
      placeholder="Select..."
      selectedValues={selectedValues}
      options={options} // Options to display in the dropdown
      displayValue="name" // Property name to display in the dropdown options
    />
  );
}

export default StyledMultiselect;
