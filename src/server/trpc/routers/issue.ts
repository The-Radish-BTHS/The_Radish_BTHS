import { z } from "zod";
import { storage } from "@/server/utils/storage";
import { execProcedure, t } from "..";
import { customSlugify } from "@lib/helpers.server";

export const issueRouter = t.router({
  // create an UNPUBLISHED issue
  create: execProcedure
    .input(
      z.object({
        title: z.string(),
        coverBase64: z.string(),
        description: z.string(),
        pdfBase64: z.string(),
        publish: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const slug = customSlugify(input.title);

      const coverKey = `issue-cover/${slug}`;
      await storage.uploadPublic(coverKey, input.coverBase64);
      const pdfKey = `issue-pdf/${slug}`;
      await storage.uploadPublic(pdfKey, input.pdfBase64);

      const coverUrl = storage.key(coverKey);
      const pdfUrl = storage.key(pdfKey);

      await ctx.prisma.issue.create({
        data: {
          coverUrl,
          description: input.description,
          slug,
          title: input.title,
          published: false,
          pdf: pdfUrl,
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
      await ctx.prisma.issue.update({
        where: { slug: input.slug },
        data: { publishedOn: new Date(), published: true },
      });
    }),

  getAll: t.procedure
    .input(
      z.object({
        exclude: z.array(z.string()).optional().default([]),
        take: z.number().optional(),
      })
    )
    .query(async ({ ctx }) => {
      return await ctx.prisma.issue.findMany({
        orderBy: {
          publishedOn: "desc",
        },
        include: {
          articles: {
            include: {
              authors: true,
              topics: true,
            },
          },
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
      return await ctx.prisma.issue.findUnique({
        where: {
          slug: input.slug,
        },
        include: {
          articles: {
            include: {
              authors: true,
              topics: true,
            },
          },
        },
      });
    }),

  getLast: t.procedure.query(async ({ ctx }) => {
    return await (
      await ctx.prisma.issue.findMany({
        orderBy: {
          publishedOn: "desc",
        },
        take: 1,
        include: {
          articles: {
            include: {
              authors: true,
              topics: true,
            },
          },
        },
      })
    )[0];
  }),
});
