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
      });
    }),

  getAll: authedProcedure
    .input(
      z.object({
        onlyExecs: z.boolean().optional(),
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
          ...(input.onlyExecs && { isExec: true }),
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
});