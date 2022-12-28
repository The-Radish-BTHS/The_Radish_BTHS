import { UserPermission } from "@prisma/client";
import { z } from "zod";
import { execProcedure, t } from "..";

export const userRouter = t.router({
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
});
