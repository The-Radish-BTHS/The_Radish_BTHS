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
import LinkButton from "@components/link-button";
import { Person, Topic, User } from "@prisma/client";
import CardWrapper from "./card-wrapper";
import TopicCard from "./topic-card";

const GraphicsCard: React.FC<{
  title: string;
  request: string | null;
}> = ({ title, request }) => {
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
            <ImageUpload name="thumbnail" />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={async () => {
                // TODO: gilbert make the images happen
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

export default GraphicsCard;
