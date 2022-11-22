import client, { ticketDataType } from "@/cms/cms-data";
import Layout from "@components/layout/layout";
import { GetStaticProps, NextPage } from "next";

import Row from "@components/pages/tickets/row";
import TicketTable from "@components/pages/tickets/table";
import Link from "@components/link";
import { Flex, Text } from "@chakra-ui/react";

const Tickets: NextPage<{ ticketData: ticketDataType }> = ({ ticketData }) => {
  return (
    <Layout title="Tickonomy" alignItems="center">
      <Flex my="0.5rem">
        <Text mr="0.25rem">If you wanna see your role models, look </Text>
        <Link href="/rankings" textDecor="underline">
          here.
        </Link>
      </Flex>
      <TicketTable textHeader="Action" numericHeader="Reward">
        {ticketData.actions.map(({ action, description, reward }, i) => (
          <Row
            text={action}
            description={description}
            number={reward}
            key={i}
          />
        ))}
      </TicketTable>
      <TicketTable textHeader="Prize" numericHeader="Cost">
        {ticketData.prizes.map(({ prize, description, cost }, i) => (
          <Row text={prize} description={description} number={cost} key={i} />
        ))}
      </TicketTable>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const actions =
    await client.fetch(`*[_type == 'ticketValue'] | order(index asc) {
    action,
    description,
    reward,
    index
  }`);
  const prizes =
    await client.fetch(`*[_type == 'ticketPrize'] | order(index asc) {
    prize,
    description,
    cost,
    index
  }`);
  const ticketData = { actions, prizes };

  return {
    props: {
      ticketData,
    },
  };
};

export default Tickets;
