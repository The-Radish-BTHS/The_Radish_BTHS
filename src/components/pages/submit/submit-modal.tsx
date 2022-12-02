import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Button from "@components/button";
import { InputData } from "@/pages/articles/submit";
import React from "react";

const SubmitModal: React.FC<
  React.PropsWithChildren<{
    disclosure: UseDisclosureReturn;
    onClick: any;
    data: InputData;
  }>
> = ({ children, disclosure, onClick, data }) => {
  const { isOpen, onClose } = disclosure;
  const router = useRouter();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="#ebeae5" borderRadius="0.75rem">
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button
            onClick={async () => {
              onClick(data).then(() => {
                onClose();
                router.push("/");
              });
            }}>
            Yes, I&apos;m sure!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubmitModal;
