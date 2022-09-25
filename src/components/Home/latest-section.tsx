import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import IssueCard from "@components/cards/issue-card";

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
          Our newest issue is ready for consumption!
        </span>
      </Heading>

      <IssueCard
        cover={cover}
        description={description}
        issueTime={issueTime}
      />
    </>
  );
};

export default LatestSection;
