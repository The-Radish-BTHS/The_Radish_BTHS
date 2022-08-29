import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import Link from "@components/shared/link";
import { useIsMobile } from "@hooks/useIsMobile";

const Error404: React.FC = () => {
  const isMobile = useIsMobile();
  const textSize = isMobile ? "7rem" : "10rem";
  return (
    <Layout alignItems="center" justifyContent="center">
      <Flex h={isMobile ? "10rem" : "15rem"} alignItems="flex-end" mb="2.5rem">
        <Text fontWeight={900} fontSize={textSize} lineHeight={textSize}>
          4
        </Text>

        <Box
          backgroundImage="/images/sadish.png"
          _hover={{
            backgroundImage: isMobile
              ? "/images/sadish.png"
              : "/images/happyish.png",
          }}
          h="100%"
          backgroundSize="contain"
          backgroundRepeat="no-repeat"
          mb="0.75rem">
          {isMobile ? (
            <Image src="/images/sadish.png" alt="radish" h="100%" />
          ) : (
            <Link
              href="https://www.youtube.com/watch?v=ic_iClOg34A"
              target="_blank">
              <Image
                src="/images/sadish.png"
                alt="radish"
                h="100%"
                opacity={0}
              />
            </Link>
          )}
        </Box>

        <Text fontWeight={900} fontSize={textSize} lineHeight={textSize}>
          4
        </Text>
      </Flex>

      <Text
        fontSize={isMobile ? "1rem" : "1.4rem"}
        textAlign="center"
        maxW="38rem"
        mb="2rem">
        Looks like an oopsie doopsie has occurred here! Either the page you were
        looking for doesn&apos;t exist or you wanted to see a crying radish. If
        so, please stop making radishes cry.
      </Text>

      {isMobile && (
        <iframe
          title="Radishes"
          src="https://www.youtube.com/embed/ic_iClOg34A"
          allowFullScreen
        />
      )}
    </Layout>
  );
};

export default Error404;
