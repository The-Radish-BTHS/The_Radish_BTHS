import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import Button from "@components/button";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { ErrorMessage } from "@hookform/error-message";
import { customSlugify, topicNameIsUnique } from "@lib/helpers.server";
import { Topic } from "@prisma/client";
import { trpc } from "@lib/trpc";
import { MutationObserverErrorResult } from "react-query";

interface NewTopicType {
  name: string;
  description?: string;
}

const NewTopicModal: React.FC<{
  disclosure: UseDisclosureReturn;
  topicSlugs: string[];
  addTopic: (topic: Topic) => void;
}> = ({ disclosure, topicSlugs, addTopic }) => {
  const toast = useToast();
  const createTopic = trpc.topic.create.useMutation({
    onError(err: any) {
      toast({
        title: `Topic Creation Error ${err.data?.httpStatus}: ${err.message}`,
        status: "error",
        duration: 4000,
        position: "bottom-right",
        isClosable: true,
      });
    },
  });
  const { isOpen, onClose } = disclosure;

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<NewTopicType>({
    criteriaMode: "all",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="#ebeae5" borderRadius="0.75rem">
        <ModalHeader>New Topic Alert!!!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form autoComplete="off" className={styles["new-topic-form-wrapper"]}>
            {/* register your input into the hook by invoking the "register" function */}
            <p style={{ width: "100%" }}>
              Topic Name:<span style={{ color: "red" }}> *</span>
            </p>
            <input
              placeholder="ex. Radishes"
              {...register("name", {
                required: "A name is required!",
                validate: (val) => topicNameIsUnique(val, topicSlugs),
              })}
              required
            />
            <p
              className={`${styles["form-element-margin"]} ${styles["error-message"]}`}>
              <ErrorMessage
                errors={errors}
                name="name"
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

            <p style={{ width: "100%" }}>Description:</p>
            <input
              placeholder="ex. Yummy root vegetables"
              {...register("description")}
              className={styles["form-element-margin"]}
            />
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={handleSubmit(async (data) => {
              console.log(errors);
              if (data.name === "") {
                return;
              }

              const response = await fetch(`/api/create?type=topic`, {
                method: "post",
                mode: "no-cors",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  ...data,
                  slug: customSlugify(data.name),
                }),
              })
                .then((response) => {
                  console.log(response);
                  return response;
                })
                .catch((e) => {
                  console.error(e);
                  return e;
                });
              if (response.status === 200) {
                toast({
                  title: "Topic Creation Success!",
                  status: "success",
                  duration: 4000,
                  position: "bottom-right",
                  isClosable: true,
                });
              } else {
                toast({
                  title: `Topic Creation Error ${response.status}: ${response.statusText}`,
                  status: "error",
                  duration: 4000,
                  position: "bottom-right",
                  isClosable: true,
                });
              }

              onClose();
              setValue("name", "");
              setValue("description", "");

              // TODO: creating a new topic doesnt invalidate the query for topics
              window.location.reload();
            })}>
            Make!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewTopicModal;
