import { Flex, Heading, Image, Text } from "@chakra-ui/react";

interface ILatestProps {
  issueTime: string;
  description: string;
  cover: string;
}

const LatestSection: React.FC<ILatestProps> = ({
  issueTime,
  description,
  cover,
}) => {
  return (
    <>
      <Heading fontSize="2rem">
        Latest & Greatest:{" "}
        <span style={{ fontWeight: "normal" }}>
          Our {issueTime} Issue is ready for consumption!
        </span>
      </Heading>
      <Text mt="1rem" fontSize="1.1rem">
        {description}
      </Text>
      <Flex background="rgba(255,255,255,0.6)" mt="2rem">
        <Image
          src={cover}
          alt="recent-cover"
          w={{ base: "94vw", sm: "50vw", md: "40vw", lg: "25vw" }}
        />
      </Flex>
    </>
  );
};

export default LatestSection;
