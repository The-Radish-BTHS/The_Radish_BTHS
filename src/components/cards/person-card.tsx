import { PersonCardType } from "@/types/person";
import { Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import ExecStamp from "@components/exec-stamp";
import Link from "@components/link";
import { useIsFormer } from "@hooks/useIsFormer";
import CardWrapper from "./card-wrapper";

const PersonCard: React.FC<PersonCardType> = ({
  isExec = false,
  name,
  position,
  description,
  slug,
  gradYear,
  image = "",
  styles,
}) => {
  const { isFormer } = useIsFormer();

  return (
    <CardWrapper w="100%" {...styles}>
      <Link href={`/people/${slug}`}>
        {image && (
          <Image
            src={`data:image/png;base64,${image}`}
            alt="image"
            w="100%"
            borderBottom="1px solid"
            borderTopRadius="0.5rem"
          />
        )}
        <Center p="0.75rem" flexDir="column">
          <Flex justifyContent="space-between" w="100%" alignItems="center">
            <Flex flexDir="column" w="100%" p="0.3rem" textAlign="left">
              <Heading w="100%" fontSize="1.5rem" mb="0.3rem">
                {name}
              </Heading>
              <Text fontWeight="bold" fontStyle="italic" w="100%">
                {position}
                {isFormer(gradYear) ? " (Former)" : ""}
              </Text>
            </Flex>
            {isExec && <ExecStamp id={slug} size={60} />}
          </Flex>

          {description && (
            <Text
              w="100%"
              textAlign="center"
              fontStyle="italic"
              my="1rem"
              fontWeight="medium">
              &quot;{description}&quot;
            </Text>
          )}
        </Center>
      </Link>
    </CardWrapper>
  );
};

export default PersonCard;
