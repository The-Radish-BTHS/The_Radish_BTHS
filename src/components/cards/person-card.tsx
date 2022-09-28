import { FlexProps, Text } from "@chakra-ui/react";
import Card from "./card";

interface PersonCardProps extends FlexProps {
  isExec?: boolean;
  name: string;
  title: string;
  description: string;
  id: string;
}

const PersonCard: React.FC<PersonCardProps> = ({
  isExec = false,
  name,
  title,
  description,
  id,
  ...rest
}) => {
  return (
    <Card
      link={`/${isExec ? "execs" : "authors"}/${id}`}
      header={name}
      p="0.3rem"
      pb="0.6rem"
      {...rest}>
      <Text fontWeight="bold" fontStyle="italic" w="100%" mt="-0.2rem">
        {title}
      </Text>
      <Text w="100%" textAlign="center" mt="1rem" fontWeight="medium">
        {description}
      </Text>
    </Card>
  );
};

export default PersonCard;
