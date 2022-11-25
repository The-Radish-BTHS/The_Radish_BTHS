import prisma from "@server/db/prisma.server";
import { appRouter } from "@server/trpc/routers";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";

export const getSsgCaller = async () => {
  return createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma: prisma, user: undefined },
    transformer: superjson,
  });
};
