import { initTRPC, TRPCError } from "@trpc/server";
import { UserPermission } from "@prisma/client";
import { Context } from "./context";
import { articleRouter } from "./routers/article";

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
  if (ctx.user.perms !== UserPermission.EXEC)
    throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx });
});

export const editorProcedure = authedProcedure.use(({ ctx, next }) => {
  if (
    ctx.user.perms !== UserPermission.EXEC ||
    ctx.user.perms !== UserPermission.EDITOR
  )
    throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx });
});

export const appRouter = t.router({
  article: articleRouter,
});

export type AppRouter = typeof appRouter;
