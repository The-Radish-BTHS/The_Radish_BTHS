import client, { ticketDataType } from "@/cms/cms-data";
import Layout from "@components/layout/layout";
import { NextPage } from "next";

import Row from "@components/tickets/row";
import TicketTable from "@components/tickets/table";

const Index: NextPage<{ ticketData: ticketDataType }> = ({ ticketData }) => {
  return (
    <Layout alignItems="center">
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

export async function getStaticProps() {
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
}

export default Index;
