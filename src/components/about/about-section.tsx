import { aboutSectionDataType } from "@/cms/cms-data";
import { Box, Button, Link, Text } from "@chakra-ui/react";
import { PortableTextLayout } from "@/cms/portable-text";
import { SectionHeader } from "./section-header";

const AboutSection: React.FC<aboutSectionDataType> = ({
  title,
  subtitle,
  index,
  link,
  linkName,
  body,
}) => (
  <>
    <SectionHeader title={title} subtitle={subtitle} noSep={index === 0} />
    <Box py="1.5rem">
      <PortableTextLayout text={body} />
    </Box>
    {link && (
      <Button
        as={Link}
        href={link}
        target="_blank"
        p="0.6rem"
        variant="outline"
        colorScheme="black">
        {linkName}
      </Button>
    )}
  </>
);

export default AboutSection;
