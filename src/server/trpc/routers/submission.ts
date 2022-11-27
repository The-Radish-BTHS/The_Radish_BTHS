import { z } from "zod";
import { t } from "..";

export const submissionRouter = t.router({
  get: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.submission.findUnique({
        where: {
          id: input.id,
        },
        include: { topics: true, authors: true },
      });
    }),
});
