import StyledMultiselect from "./styled-multiselect";

import { ErrorMessage } from "@hookform/error-message";
import { SubmitFormProps } from "@/pages/articles/submit";

type Inputs = {
  title: string;
  content: string;
};

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
      <input required placeholder="Google Docs Link" {...contentData} />
      <p>
        Article title:<span style={{ color: "red" }}> *</span>
      </p>
      <input required placeholder="Title" {...titleData} aria-invalid="true" />

      <ErrorMessage
        errors={errors}
        name="title"
        render={({ messages }) => {
          console.log("messages", messages);
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      />

      <p>Topics covered:</p>
      <StyledMultiselect {...topicData} />

      <p>Partners:</p>
      <StyledMultiselect {...authorData} />
    </>
  );
};

export default DefaultSubmit;
