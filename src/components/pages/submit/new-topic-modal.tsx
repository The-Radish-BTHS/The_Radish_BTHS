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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Button from "@components/button";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { ErrorMessage } from "@hookform/error-message";
import { customSlugify } from "@lib/helpers.server";

interface NewTopicType {
  name: string;
  description?: string;
}

const useNewTopicModal = (topicSlugs: string[], apiPath: string) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<NewTopicType>({
    criteriaMode: "all",
  });

  const articleNameIsUnique = (name: string) => {
    const isUnique = topicSlugs.indexOf(customSlugify(name)) === -1;
    return isUnique || "A Topic with that name already exists!";
  };

  const ModalComponent: React.FC<{}> = ({}) => (
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
                validate: articleNameIsUnique,
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

              const response = await fetch(`${apiPath}/create?type=topic`, {
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
            })} //{async () => {
            // console.log(errors.name);
            // const response = await onClick(inputData);
            // router.push("/");
            // if (response.status === 200) {
            //   toast({
            //     title: "Article Submit Success!",
            //     status: "success",
            //     duration: 4000,
            //     position: "bottom-right",
            //     isClosable: true,
            //   });
            // } else {
            //   toast({
            //     title: `Article Submit Error ${response.status}: ${response.statusText}`,
            //     status: "error",
            //     duration: 4000,
            //     position: "bottom-right",
            //     isClosable: true,
            //   });
            // }
            //}}
          >
            Make!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return { ModalComponent, onOpen };
};

export default useNewTopicModal;
