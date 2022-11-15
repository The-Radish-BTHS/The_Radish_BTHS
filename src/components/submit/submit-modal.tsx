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
import Button from "@components/shared/button";
import { useState } from "react";
import { Article, Person, Topic } from "@prisma/client";

const useSubmitModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const [inputData, setInputData] = useState<{
    title: string;
    content: string;
  }>();

  const ModalComponent: React.FC<{ onClick: any }> = ({ onClick }) => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="#ebeae5" borderRadius="0.75rem">
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you have checked all the things???</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              onClick(inputData);
              router.push("/");
              toast({
                title: "Article Submit Success!",
                status: "success",
                duration: 4000,
                position: "bottom-right",
                isClosable: true,
              });
            }}>
            Yes, I&apos;m sure!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return { ModalComponent, onOpen, setInputData };
};

export default useSubmitModal;
