import client, { ticketDataType } from "@/cms/cms-data";
import Layout from "@components/layout/layout";
import { NextPage } from "next";

import Row from "@components/tickets/row";
import TicketTable from "@components/tickets/table";

const Index: NextPage<{ ticketData: ticketDataType }> = ({ ticketData }) => {
  return (
    <Layout alignItems="center">
      <TicketTable textHeader="Action" numericHeader="Reward">
        {ticketData.actions.map(({ action, reward }, i) => (
          <Row text={action} number={reward} key={i} />
        ))}
      </TicketTable>
      <TicketTable textHeader="Prize" numericHeader="Cost">
        {ticketData.prizes.map(({ prize, cost }, i) => (
          <Row text={prize} number={cost} key={i} />
        ))}
      </TicketTable>
    </Layout>
  );
};

export async function getStaticProps() {
  const actions = await client.fetch(`*[_type == 'ticketValue'] {
    action,
    reward
  }`);
  const prizes = await client.fetch(`*[_type == 'ticketPrize'] {
    prize,
    cost
  }`);
  const ticketData = { actions, prizes };

  return {
    props: {
      ticketData,
    },
  };
}

export default Index;
