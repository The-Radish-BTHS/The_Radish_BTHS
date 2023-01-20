import { Heading, Text } from "@chakra-ui/react";

export const SectionHeader: React.FC<{
  title: string;
  subtitle: string;
  noSep?: boolean;
}> = ({ title, subtitle, noSep = false }) => (
  <>
    <Heading fontWeight={700} mt={noSep ? "0" : "2rem"}>
      {title}
    </Heading>
    <Text fontWeight={600} color="custom.red">
      {subtitle}
    </Text>
  </>
);
