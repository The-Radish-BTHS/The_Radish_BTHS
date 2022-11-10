import client, { aboutSectionDataType } from "@/cms/cms-data";
import { Flex, useTheme } from "@chakra-ui/react";
import AboutSection from "@components/about/about-section";
import { IconLink } from "@components/about/icon-link";
import { SectionHeader } from "@components/about/section-header";
import Layout from "@components/layout/layout";
import { GetStaticProps, NextPage } from "next";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { MdEmail } from "react-icons/md";

const About: NextPage<{ sectionsData: aboutSectionDataType[] }> = ({
  sectionsData,
}) => {
  return (
    <Layout pageIndex={4} header={"/images/about_header.jpeg"}>
      {sectionsData.map((section, i) => (
        <AboutSection key={i} {...section} />
      ))}
      <SectionHeader
        title="Say Hi!"
        subtitle="I think we'd make great friends!"
      />
      <Flex gap="1rem" my="1.5rem">
        <IconLink
          Icon={AiFillGithub}
          href="https://github.com/The-Radish-BTHS/The_Radish_BTHS"
        />
        <IconLink
          Icon={AiOutlineTwitter}
          href="https://twitter.com/theradishbths"
        />
        <IconLink
          Icon={AiFillInstagram}
          href="https://www.instagram.com/theradishbths/"
        />
        <IconLink Icon={MdEmail} href="mailto:theradishbths@gmail.com" />
      </Flex>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const sectionsData =
    await client.fetch(`*[_type == 'aboutSection'] | order(index asc) {
    title,
    subtitle,
    index,
    link,
    linkName,
    body
  }`);

  return {
    props: {
      sectionsData,
    },
  };
};

export default About;
