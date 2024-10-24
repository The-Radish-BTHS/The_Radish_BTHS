import client, { aboutSectionDataType } from "@/cms/cms-data";
import { Flex, useTheme } from "@chakra-ui/react";
import AboutSection from "@components/pages/about/about-section";
import { IconLink } from "@components/pages/about/icon-link";
import { SectionHeader } from "@components/pages/about/section-header";
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
      {/* TODO: get rid of this hack (edit the cms) */}
      <AboutSection
        title="We are The Radish"
        subtitle="Bum-Ba-Dum Bum-Bum-Bum-Bum"
        body={[
          {
            _key: "e0-k7",
            children: [
              {
                _type: "span",
                marks: [],
                text: "We are Brooklyn Technical High School's first, worst, and only satirical newspaper. We probably started around the 1980s—definitely before The Onion, our fierce rival.\n\nInterested in joining us? Find us in school on Wednesdays in room 2N3 after 10th period. Also, join our email list for updates.",
                _key: "bee1effad54f0",
              },
            ],
            markDefs: [],
            _type: "block",
            style: "normal",
          },
        ]}
        linkName="Sign Up Now!"
        link="https://docs.google.com/forms/d/e/1FAIpQLScfhiwteouLAMkJ0YOgSQ8-IiYzIlInRZr7ImOgpxwKZvFvFg/viewform?usp=sf_link"
        index={0}
      />
      {sectionsData.map((section, i) =>
        section.title === "We are The Radish" ? null : (
          <AboutSection key={i} {...section} />
        )
      )}
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
