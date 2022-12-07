import {
  Flex,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Button from "@components/button";
import { ImageUpload } from "@components/image-upload";
import { trpc } from "@lib/trpc";
import { useState } from "react";
import CardWrapper from "./card-wrapper";

const GraphicsCard: React.FC<{
  title: string;
  request: string | null;
  submissionId: string;
}> = ({ submissionId, title, request }) => {
  // TODO: SANTIAGO UI!!!!!!!!!!!!!!!!!!!!
  const submitGraphics = trpc.submission.submitGraphics.useMutation();
  const trpcContext = trpc.useContext();
  const [files, setFiles] = useState<File[]>([]);
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <CardWrapper p="1rem" mb="1.5rem" width="100%">
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="#ebeae5"
          borderRadius="0.75rem"
          maxW="min(40rem, 100%)">
          <ModalHeader>Thanks for making some dope art!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ImageUpload name="thumbnail" files={files} setFiles={setFiles} />
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={submitGraphics.isLoading}
              onClick={async () => {
                await submitGraphics
                  .mutateAsync({
                    id: submissionId,
                    files: await Promise.all(files.map(toBase64)),
                  })
                  .catch(() => 0);

                await trpcContext.submission.getGraphicsRequests.invalidate();

                onClose();
              }}>
              Submit my images!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Heading fontSize="1.5rem" mb="0.25rem">
        {title}
      </Heading>
      <Text>{request}</Text>
      <Flex w="100%" justifyContent="flex-end">
        <Button onClick={onOpen}>Complete</Button>
      </Flex>
    </CardWrapper>
  );
};

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve((reader.result as string).replace("data:image/png;base64,", ""));
    reader.onerror = (error) => reject(error);
  });

export default GraphicsCard;
