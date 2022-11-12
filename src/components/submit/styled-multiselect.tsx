import Multiselect from "multiselect-react-dropdown";
import styles from "./styles.module.css";

const StyledMultiselect: React.FC<{
  values: { name: string; id: number }[];
}> = ({ values }) => (
  <Multiselect
    className={styles.multiselect}
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
    }}
    closeIcon="cancel"
    options={values} // Options to display in the dropdown
    displayValue="name" // Property name to display in the dropdown options
  />
);

export default StyledMultiselect;
