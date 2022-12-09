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
import { useIsMobile } from "@hooks/useIsMobile";

const SubmitModal: React.FC<
  React.PropsWithChildren<{
    disclosure: UseDisclosureReturn;
    onClick: any;
    data: InputData;
  }>
> = ({ children, disclosure, onClick, data }) => {
  const { isOpen, onClose } = disclosure;
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={isMobile ? "full" : "md"}
      isCentered>
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
