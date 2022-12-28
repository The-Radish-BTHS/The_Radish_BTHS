import { initTRPC, TRPCError } from "@trpc/server";
import prisma from "@/server/db/prisma.server";
import { UserPermission } from "@prisma/client";
import { Context } from "./context";
import { appRouter } from "./routers";
import superjson from "superjson";

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

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

export const execProcedure = authedProcedure.use(({ ctx, next }) => {
  if (ctx.user.permission !== UserPermission.EXEC)
    throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx });
});

export const editorProcedure = authedProcedure.use(({ ctx, next }) => {
  if (!["EXEC", "EDITOR"].includes(ctx.user.permission))
    throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx });
});

export const createPublicCaller = () => {
  return appRouter.createCaller({ prisma, user: undefined });
};

export type AppRouter = typeof appRouter;
