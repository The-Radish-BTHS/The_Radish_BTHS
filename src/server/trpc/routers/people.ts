import { articleInclude, customSlugify } from "@lib/helpers.server";
import { Person } from "@prisma/client";
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
        include: { articles: { include: articleInclude } },
      });
    }),

  getAll: authedProcedure
    .input(
      z.object({
        who: z.enum(["execs", "normies", "all"]).default("all"),
        exclude: z.array(z.string()).optional().default([]),
        take: z.number().optional(),
        includeIsFormer: z.boolean().optional().default(true),
      })
    )
    .query(async ({ ctx, input }) => {
      const today = new Date();

      const people = await ctx.prisma.person.findMany({
        where: {
          NOT: input.exclude.map((slug) => ({ slug })),
          ...(input.who === "all" ? {} : { isExec: input.who === "execs" }),
        },
        orderBy: { gradYear: "desc" },
        take: input.take,
      });

      const former = (person: Person) =>
        input.includeIsFormer && {
          former:
            person &&
            today.getMonth() > 6 &&
            today.getFullYear() >= person.gradYear,
        };

      return people.map((person) => ({
        ...person,
        ...former(person),
      }));
    }),
  update: t.procedure
    .input(
      z.object({
        slug: z.string(),
        name: z.string(),
        gradYear: z.number(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.person.update({
        where: {
          slug: input.slug,
        },
        data: {
          name: input.name,
          slug: customSlugify(input.name),
          gradYear: input.gradYear,
          description: input.description,
        },
      });
    }),
});
