import { articleInclude, customSlugify } from "@lib/helpers.server";
import { Person, UserPermission } from "@prisma/client";
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
        orderBy: [{ position: "desc" }, { name: "asc" }, { gradYear: "desc" }],
        include: { user: true },
        take: input.take,
      });

      console.log(people);

      const former = (person: Person) =>
        input.includeIsFormer && {
          former:
            person &&
            today.getMonth() > 6 &&
            today.getFullYear() >= person.gradYear &&
            person.gradYear > 1980,
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

  linkUserToExistingPerson: execProcedure
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

      const newPerson = await ctx.prisma.person.findUnique({
        where: { id: input.newPersonId },
        select: { isExec: true },
      });

      const data = newPerson?.isExec
        ? { personId: input.newPersonId, permission: UserPermission.EXEC }
        : { personId: input.newPersonId };

      try {
        await ctx.prisma.$transaction([
          ctx.prisma.user.update({
            where: { id: currentUser.id },
            data,
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

  getAllSlugs: t.procedure.query(async ({ ctx }) => {
    return (
      await ctx.prisma.person.findMany({
        select: { slug: true },
      })
    ).map(({ slug }) => slug);
  }),

  getInfinite: t.procedure
    .input(
      z.object({
        who: z.enum(["execs", "normies", "all"]).default("all"),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const TAKE = 15;

      const people = await ctx.prisma.person.findMany({
        take: TAKE + 1,
        where: {
          ...(input.who === "all" ? {} : { isExec: input.who === "execs" }),
        },
        orderBy: {
          gradYear: "desc",
        },
        cursor: input.cursor ? { id: input.cursor } : undefined,
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (people.length > TAKE) {
        const nextItem = people.pop();
        nextCursor = nextItem!.id;
      }

      return {
        people,
        nextCursor,
      };
    }),
});
