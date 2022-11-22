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
import { useForm } from "react-hook-form";

interface NewTopicType {
  name: string;
  description?: string;
}

const useNewTopicModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const [inputData, setInputData] = useState<{
    title: string;
    content: string;
  }>();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<InputData>({
    criteriaMode: "all",
    defaultValues: isEditing
      ? {
          title: article?.title || "",
          content: article?.content || "",
        }
      : {},
  });

  const ModalComponent: React.FC<{ onClick: any }> = ({ onClick }) => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="#ebeae5" borderRadius="0.75rem">
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you have checked all the things???</Text>
          <ul style={{ marginTop: "1rem" }}>
            <li style={{ marginLeft: "1rem" }}>
              Is the doc shared with theradishbths@gmail.com?
            </li>
            <li style={{ marginLeft: "1rem" }}>Is your title correct?</li>
            <li style={{ marginLeft: "1rem" }}>
              Have you selected all of your topics?
            </li>
            <li style={{ marginLeft: "1rem" }}>
              Have you added anyone you worked with?
            </li>
          </ul>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={async () => {
              const response = await onClick(inputData);
              router.push("/");
              if (response.status === 200) {
                toast({
                  title: "Article Submit Success!",
                  status: "success",
                  duration: 4000,
                  position: "bottom-right",
                  isClosable: true,
                });
              } else {
                toast({
                  title: `Article Submit Error ${response.status}: ${response.statusText}`,
                  status: "error",
                  duration: 4000,
                  position: "bottom-right",
                  isClosable: true,
                });
              }
            }}>
            Yes, I&apos;m sure!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return { ModalComponent, onOpen, setInputData };
};

export default useNewTopicModal;
