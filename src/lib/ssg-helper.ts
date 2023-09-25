import prisma from "@server/db/prisma.server";
import { appRouter } from "@server/trpc/routers";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";

export const getSsgCaller = async () => {
  return createServerSideHelpers({
    router: appRouter,
    ctx: { prisma: prisma, user: undefined },
    transformer: superjson,
  });
};
