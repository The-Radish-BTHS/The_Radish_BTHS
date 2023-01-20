import { UserPermission } from "@prisma/client";
import { z } from "zod";
import { authedProcedure, execProcedure, t } from "..";

export const userRouter = t.router({
  getAll: t.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),
  changePermission: execProcedure
    .input(
      z.object({
        userId: z.string(),
        permission: z.nativeEnum(UserPermission),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.update({
        where: { id: input.userId },
        data: {
          permission: input.permission,
        },
      });
    }),

  deleteMyAccount: authedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.$transaction([
      // delete associated submissions
      ctx.prisma.submission.deleteMany({
        where: {
          userId: ctx.user.id,
        },
      }),
      // delete the user
      ctx.prisma.user.delete({
        where: {
          id: ctx.user.id,
        },
      }),
      // delete person
      ctx.prisma.person.delete({
        where: { id: ctx.user.person.id },
      }),
    ]);
  }),
});
