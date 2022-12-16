import { articleInclude, customSlugify } from "@lib/helpers.server";
import { Person } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { authedProcedure, execProcedure, t } from "..";

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
        include: {
          articles: {
            include: articleInclude,
            orderBy: { publishedOn: "desc" },
          },
        },
      });
    }),

  getAll: t.procedure
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
        include: { user: true },
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

  update: authedProcedure
    .input(
      z.object({
        name: z.string(),
        gradYear: z.number(),
        description: z.string(),
        completeSignUp: z.optional(z.boolean()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.person.update({
        where: {
          slug: ctx.user.person.slug,
        },
        data: {
          name: input.name,
          // TODO: changing slugs
          gradYear: input.gradYear,
          description: input.description,
          user: input.completeSignUp
            ? {
                update: {
                  hasSignedUp: true,
                },
              }
            : undefined,
        },
      });
    }),

  linkUserToExistingPerson: authedProcedure
    .input(
      z.object({
        currentUserId: z.string(),
        newPersonId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = await ctx.prisma.user.findUnique({
        where: {
          id: input.currentUserId,
        },
        include: { person: true },
      });

      if (!currentUser) throw new TRPCError({ code: "UNAUTHORIZED" });

      try {
        await ctx.prisma.$transaction([
          ctx.prisma.user.update({
            where: { id: currentUser.id },
            data: { personId: input.newPersonId },
          }),
          ctx.prisma.person.delete({
            where: {
              id: currentUser.person.id,
            },
          }),
        ]);
      } catch {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already has this person.",
        });
      }
    }),
});
