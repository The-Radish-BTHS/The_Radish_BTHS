import StyledMultiselect from "./styled-multiselect";

import { ErrorMessage } from "@hookform/error-message";
import { SubmitFormProps } from "@/pages/articles/submit";

import styles from "@components/submit/styles.module.css";

const DefaultSubmit: React.FC<SubmitFormProps> = ({
  contentData,
  titleData,
  errors,
  topicData,
  authorData,
}) => {
  return (
    <>
      <p>
        Google Docs link:<span style={{ color: "red" }}> *</span>
      </p>
      <input
        required
        placeholder="Google Docs Link"
        {...contentData}
        className={styles["form-element-margin"]}
      />
      <p>
        Article title:<span style={{ color: "red" }}> *</span>
      </p>
      <input required placeholder="Title" {...titleData} />

      <p
        className={`${styles["form-element-margin"]} ${styles["error-message"]}`}>
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ messages }) => {
            console.log("messages", messages);
            return messages
              ? Object.entries(messages).map(([type, message], i) => (
                  <span key={i}>
                    {message}
                    <br />
                  </span>
                ))
              : null;
          }}
        />
      </p>

      <p>Topics covered:</p>
      <StyledMultiselect {...topicData} />

      <p>Partners:</p>
      <StyledMultiselect {...authorData} />
    </>
  );
};

export default DefaultSubmit;
