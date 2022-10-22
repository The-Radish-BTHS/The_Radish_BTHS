import { PersonCard } from "@/types/person";
import { Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import ExecStamp from "@components/shared/exec-stamp";
import Card from "./card";

const PersonCard: React.FC<PersonCard> = ({
  isExec = false,
  name,
  title,
  description,
  id,
  image = "",
  outerStyles,
  ...rest
}) => {
  return (
    <Card
      link={`/people/${id}`}
      image={image}
      maxW={{ base: "85vw", sm: "70vw", md: "40vw", lg: "22vw" }}
      outerStyles={{
        maxW: { base: "85vw", sm: "70vw", md: "40vw", lg: "25vw" },
        ...outerStyles,
      }}
      {...rest}>
      <Flex justifyContent="space-between" w="100%" alignItems="center">
        <Flex flexDir="column" w="100%" p="0.3rem" textAlign="center">
          <Heading w="100%" fontSize="1.5rem" mb="0.3rem">
            {name}
          </Heading>
          <Text fontWeight="bold" fontStyle="italic" w="100%">
            {title}
          </Text>
        </Flex>
        {isExec && <ExecStamp id={id} size={60} />}
      </Flex>

      <Text w="100%" textAlign="center" my="1rem" fontWeight="medium">
        {description}
      </Text>
    </Card>
  );
};

export default PersonCard;
