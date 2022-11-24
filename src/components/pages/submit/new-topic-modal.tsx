import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  useToast,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Button from "@components/button";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { ErrorMessage } from "@hookform/error-message";
import { customSlugify, topicNameIsUnique } from "@lib/helpers.server";
import { trpc } from "@lib/trpc";

interface NewTopicType {
  name: string;
  description?: string;
}

const NewTopicModal: React.FC<{
  disclosure: UseDisclosureReturn;
  topicSlugs: string[];
}> = ({ disclosure, topicSlugs }) => {
  const toast = useToast();
  const createTopic = trpc.topic.create.useMutation({
    onError(err) {
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
              className={`${styles["form-element-margin"]} ${styles["error-message"]}`}
            >
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

              const response = await createTopic.mutateAsync({
                name: data.name,
                description: data.description,
              });
              toast({
                title: "Topic Creation Success!",
                status: "success",
                duration: 4000,
                position: "bottom-right",
                isClosable: true,
              });

              onClose();
              setValue("name", "");
              setValue("description", "");
            })}
          >
            Make!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewTopicModal;
