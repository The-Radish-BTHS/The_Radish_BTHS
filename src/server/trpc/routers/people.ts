import { z } from "zod";
import { authedProcedure, t } from "..";

export const peopleRouter = t.router({
  getBySlug: t.procedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.person.findUnique({
        where: { slug: input.slug },
      });
    }),

  getAll: authedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.person.findMany({
      orderBy: { gradYear: "desc" },
    });
  }),
});
