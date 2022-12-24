import { articleInclude, customSlugify } from "@lib/helpers.server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t, authedProcedure } from "..";

const TOPIC_CREATION_COOLDOWN = 60 * 1000; // 1 minute, in milliseconds

export const topicRouter = t.router({
  create: authedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // check cooldown
      const topicCreationElapsed =
        Date.now() - (ctx.user.lastTopicCreation?.getTime() || 0);
      if (topicCreationElapsed < TOPIC_CREATION_COOLDOWN)
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: `You can only create a new topic ${
            TOPIC_CREATION_COOLDOWN === 60 * 1000
              ? "once every minute"
              : `every ${TOPIC_CREATION_COOLDOWN / 1000 / 60} minutes`
          }`,
        });

      await ctx.prisma.$transaction([
        ctx.prisma.topic.create({
          data: {
            slug: customSlugify(input.name),
            name: input.name,
            description: input.description || "",
          },
        }),
        ctx.prisma.user.update({
          where: { id: ctx.user.id },
          data: { lastTopicCreation: new Date() },
        }),
      ]);
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
  getSlugs: t.procedure.query(async ({ ctx }) => {
    const topicSlugs = await ctx.prisma.topic.findMany({
      select: {
        slug: true,
      },
    });

    return topicSlugs.map(({ slug }) => slug);
  }),
});

export type TopicRouter = typeof topicRouter;
