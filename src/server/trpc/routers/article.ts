import {
  articleInclude,
  customSlugify,
  deeperArticleInclude,
} from "@lib/helpers.server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { authedProcedure, editorProcedure, execProcedure, t } from "..";

const ARTICLE_SUBMISSION_COOLDOWN = 5 * 60 * 1000; // 5 minutes, in milliseconds

export const articleRouter = t.router({
  get: t.procedure
    .input(
      z.object({
        slug: z.string(),
        getAllData: z.boolean().optional().default(false),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.article.findUnique({
        where: {
          slug: input.slug,
        },
        include: input.getAllData ? deeperArticleInclude : articleInclude,
      });
    }),

  getMany: t.procedure
    .input(
      z.object({
        issueSlug: z.string().optional(),
        sortOrder: z.enum(["asc", "desc"]),
        exclude: z.array(z.string()).optional().default([]),
        take: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.article.findMany({
        where: {
          published: true,
          issueSlug: input.issueSlug,
          NOT: input.exclude.map((slug) => ({ slug })),
        },
        include: articleInclude,
        orderBy: { publishedOn: input.sortOrder },
        take: input.take,
      });
    }),

  getSlugs: t.procedure.query(async ({ ctx }) => {
    const articleSlugs = await ctx.prisma.article.findMany({
      orderBy: { publishedOn: "desc" },
      select: {
        slug: true,
      },
    });

    return articleSlugs.map(({ slug }) => slug);
  }),

  getEdited: t.procedure.query(async ({ ctx }) => {
    const articles = await ctx.prisma.article.findMany({
      where: {
        published: false,
      },
      include: articleInclude,
    });

    return articles;
  }),

  submit: authedProcedure
    .input(
      z.object({
        link: z.string(),
        title: z.string(),
        graphics: z.string().optional(),
        authors: z.array(
          z.object({
            slug: z.string(),
          })
        ),
        topics: z.array(
          z.object({
            slug: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const articleSubmissionElapsed =
        Date.now() - (ctx.user.lastArticleSubmission?.getTime() || 0);
      if (articleSubmissionElapsed < ARTICLE_SUBMISSION_COOLDOWN)
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: `You can only submit an article every ${ARTICLE_SUBMISSION_COOLDOWN} milliseconds`,
        });

      await ctx.prisma.$transaction([
        ctx.prisma.submission.create({
          data: {
            link: input.link,
            title: input.title,
            graphicsRequest: input.graphics,
            userId: ctx.user.id,
            authors: {
              connect: input.authors,
            },
            topics: {
              connect: input.topics,
            },
          },
        }),
        ctx.prisma.user.update({
          where: { id: ctx.user.id },
          data: { lastArticleSubmission: new Date() },
        }),
      ]);
    }),

  editorSubmit: editorProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        topics: z.array(
          z.object({
            slug: z.string(),
          })
        ),
        authors: z.array(
          z.object({
            slug: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const slug = customSlugify(input.title);

      await ctx.prisma.article.create({
        data: {
          authors: {
            connect: input.authors,
          },
          title: input.title,
          slug,
          content: input.content,
          excerpt: input.content.substring(0, 100),
          topics: {
            connect: input.topics,
          },
        },
      });
    }),

  publish: execProcedure
    .input(
      z.object({
        slug: z.string(),
        issueSlug: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.article.update({
        where: { slug: input.slug },
        data: {
          published: true,
          publishedOn: new Date(),
          issueSlug: input.issueSlug,
        },
      });
    }),
});
