import { initTRPC, TRPCError } from "@trpc/server";
import { UserPermission } from "@prisma/client";
import { Context } from "./context";
import { appRouter } from "./routers";

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

export type AppRouter = typeof appRouter;
