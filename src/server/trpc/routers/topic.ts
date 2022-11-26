import { customSlugify } from "@lib/helpers.server";
import { z } from "zod";
import { t, authedProcedure } from "..";

export const topicRouter = t.router({
  create: authedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.topic.create({
        data: {
          slug: customSlugify(input.name),
          name: input.name,
          description: input.description || "",
        },
      });
    }),

  getBySlug: t.procedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.topic.findUnique({
        where: { slug: input.slug },
      });
    }),

  getAll: t.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.topic.findMany();
  }),
});
