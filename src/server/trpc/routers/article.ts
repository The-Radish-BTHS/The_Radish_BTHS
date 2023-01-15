import {
  articleInclude,
  customSlugify,
  deeperArticleInclude,
} from "@lib/helpers.server";
import { UserPermission } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { authedProcedure, editorProcedure, execProcedure, t } from "..";
import { markdownToTxt } from "markdown-to-txt";

const ARTICLE_SUBMISSION_COOLDOWN = 3 * 60 * 1000; // 3 minutes, in milliseconds

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

  // the use of this procedure is discouraged, use getInfinite instead
  getAll: t.procedure
    .input(
      z.object({
        issueSlug: z.string().optional(),
        sortOrder: z.enum(["asc", "desc"]).default("desc"),
        exclude: z.array(z.string()).optional().default([]),
        take: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.article.findMany({
        where: {
          published: true,
          issue: {
            slug: input.issueSlug,
          },
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
        timeFrame: z.string().optional(),
        otherTopics: z.string().optional(),
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
      if (
        articleSubmissionElapsed < ARTICLE_SUBMISSION_COOLDOWN &&
        ctx.user.permission !== UserPermission.EXEC
      )
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: `You can only submit an article every ${
            ARTICLE_SUBMISSION_COOLDOWN / 1000 / 60
          } minutes`,
        });

      await ctx.prisma.$transaction([
        ctx.prisma.submission.create({
          data: {
            link: input.link,
            title: input.title,
            graphicsRequest: input.graphics,
            timeFrame: input.timeFrame,
            otherTopics: input.otherTopics,
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
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const slug = customSlugify(input.title);

      await ctx.prisma.$transaction([
        ctx.prisma.article.create({
          data: {
            authors: {
              connect: input.authors,
            },
            title: input.title,
            slug,
            content: input.content,
            excerpt: markdownToTxt(input.content).substring(0, 100),
            topics: {
              connect: input.topics,
            },
            submission: {
              connect: {
                id: input.id,
              },
            },
          },
        }),
        ctx.prisma.submission.update({
          where: {
            id: input.id,
          },
          data: {
            beenEdited: true,
          },
        }),
      ]);
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
          issue: input.issueSlug
            ? {
                connect: {
                  slug: input.issueSlug,
                },
              }
            : undefined,
        },
      });
    }),

  unpublish: execProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.article.update({
        where: { slug: input.slug },
        data: {
          published: false,
        },
      });
    }),

  getInfinite: t.procedure
    .input(
      z.object({
        query: z.string().nullish(),
        withTopic: z.string().nullish(),
        withIssue: z.string().nullish(),
        withAuthor: z.string().nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const TAKE = 10;

      const articles = await ctx.prisma.article.findMany({
        where:
          input.withTopic || input.withIssue || input.withAuthor
            ? {
                published: true,
                title: input.query
                  ? {
                      search: input.query.replaceAll(" ", "_"),
                    }
                  : undefined,
                topics: input.withTopic
                  ? {
                      some: {
                        slug: input.withTopic,
                      },
                    }
                  : undefined,
                issue: input.withIssue
                  ? {
                      slug: input.withIssue,
                    }
                  : undefined,
                authors: input.withAuthor
                  ? {
                      some: {
                        slug: input.withAuthor,
                      },
                    }
                  : undefined,
              }
            : {
                published: true,
                title: input.query
                  ? {
                      search: input.query.replaceAll(" ", "_"),
                    }
                  : undefined,
              },
        take: TAKE + 1,
        orderBy: {
          publishedOn: "desc",
        },
        cursor: input.cursor ? { id: input.cursor } : undefined,
        include: articleInclude,
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (articles.length > TAKE) {
        const nextItem = articles.pop();
        nextCursor = nextItem!.id;
      }

      return {
        articles,
        nextCursor,
      };
    }),

  unEdit: execProcedure
    .input(
      z.object({
        articleId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction([
        ctx.prisma.submission.update({
          where: { articleId: input.articleId },
          data: { articleId: null, beenEdited: false },
        }),
        ctx.prisma.article.delete({
          where: { id: input.articleId },
        }),
      ]);
    }),
});
