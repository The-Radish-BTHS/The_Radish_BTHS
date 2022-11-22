import { SubmitFormProps } from "@/pages/articles/submit";
import { ErrorMessage } from "@hookform/error-message";
import { Markdown } from "./markdown";
import useNewTopicModal from "./new-topic-modal";
import StyledMultiselect from "./styled-multiselect";
import styles from "./styles.module.css";

const EditorSubmit: React.FC<SubmitFormProps> = ({
  contentData,
  titleData,
  errors,
  topicData,
  authorData,
  topicSlugs,
  apiPath,
}) => {
  const { ModalComponent, onOpen } = useNewTopicModal(topicSlugs, apiPath);

  return (
    <>
      <ModalComponent />
      <p>
        Article title:<span style={{ color: "red" }}> *</span>
      </p>
      <input placeholder="Title" required {...titleData} />
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

      <button onClick={onOpen} type="button">
        + Add new topic
      </button>

      <p>Authors:</p>
      <StyledMultiselect {...authorData} />

      <p>
        Content:<span style={{ color: "red" }}> *</span>
      </p>
      <input placeholder="Add the articul!" required {...contentData} />
    </>
  );
};

export default EditorSubmit;
