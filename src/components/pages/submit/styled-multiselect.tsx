import { useBreakpoint, useTheme } from "@chakra-ui/react";
import Multiselect from "multiselect-react-dropdown";
import styles from "./styles.module.css";
import { useIsMobile } from "@hooks/useIsMobile";

function StyledMultiselect<T>({
  options,
  values,
  setValues,
  marginBottom = true,
}: {
  options: T[];
  values: T[];
  setValues: React.Dispatch<React.SetStateAction<T[]>>;
  marginBottom?: boolean;
}) {
  const mobile = useIsMobile();

  return (
    <Multiselect
      className={
        (marginBottom ? styles.bottomMargin : styles.smallBottomMargin) +
        " " +
        styles.multiselect
      }
      onSelect={(_, selectedItem) =>
        setValues((prev: T[]) => [...prev, selectedItem])
      }
      onRemove={(_, selectedItem) =>
        setValues((prev: T[]) => {
          console.log(prev);
          console.log(selectedItem);
          prev.splice(prev.indexOf(selectedItem), 1);
          return prev;
        })
      }
      style={{
        searchBox: {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          width: mobile ? "85vw" : "60vw",
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
      showArrow={true}
      closeOnSelect={true}
      placeholder="Select..."
      selectedValues={values}
      options={options} // Options to display in the dropdown
      displayValue="name" // Property name to display in the dropdown options
    />
  );
}

export default StyledMultiselect;
