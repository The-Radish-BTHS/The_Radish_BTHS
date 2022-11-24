import { trpc } from "@lib/trpc";
import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { Context } from "./context";

export const t = initTRPC.context<Context>().create();

export const authedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const appRouter = t.router({
  test: authedProcedure.query(async () => {
    return {
      a: 120,
    };
  }),
});

export type AppRouter = typeof appRouter;
