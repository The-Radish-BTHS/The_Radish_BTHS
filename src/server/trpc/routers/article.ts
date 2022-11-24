import { customSlugify } from "@lib/helpers.server";
import { z } from "zod";
import { authedProcedure, editorProcedure, execProcedure, t } from "..";

export const articleRouter = t.router({
  submit: authedProcedure
    .input(
      z.object({
        link: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.submission.create({
        data: {
          link: input.link,
          authorId: ctx.user.id,
        },
      });
    }),

  editorSubmit: editorProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        issueSlug: z.string(),
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
          issueSlug: input.issueSlug,
        },
      });
    }),

  publish: execProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.article.update({
        where: { slug: input.slug },
        data: {
          published: true,
          publishedOn: new Date(),
        },
      });
    }),
});
