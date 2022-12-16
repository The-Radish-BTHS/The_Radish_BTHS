import {
  articleInclude,
  customSlugify,
  deeperArticleInclude,
} from "@lib/helpers.server";
import { UserPermission } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { authedProcedure, editorProcedure, execProcedure, t } from "..";
import { markdownToTxt } from "markdown-to-txt";

export const userRouter = t.router({
  getAll: t.procedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
});
