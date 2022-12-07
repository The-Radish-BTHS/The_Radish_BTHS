import { storage } from "@server/utils/storage";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { authedProcedure, t } from "..";

// 1MB in base64 string
const GRAPHICS_MAX_PER = 4 * 1024 * 1024 * (4 / 3);

export const submissionRouter = t.router({
  get: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.submission.findUnique({
        where: {
          id: input.id,
        },
        include: { topics: true, authors: true },
      });
    }),

  getAll: t.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.submission.findMany({
      include: { topics: true, authors: true },
    });
  }),

  getGraphicsRequests: t.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.submission.findMany({
      include: { topics: true, authors: true },
      where: { graphicsComplete: false },
    });
  }),
  getCompletedGraphicsRequests: t.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.submission.findMany({
      include: { topics: true, authors: true },
      where: { graphicsComplete: true },
    });
  }),

  getAllWithEdited: t.procedure
    .input(
      z.object({
        edited: z.boolean().default(false),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.submission.findMany({
        where: { beenEdited: input.edited },
        include: { topics: true, authors: true },
      });
    }),

  submitGraphics: authedProcedure
    .input(
      z.object({
        id: z.string(),
        files: z.array(z.string().max(GRAPHICS_MAX_PER)).max(10),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!(ctx.user.permission === "EXEC" || ctx.user.permission === "ARTIST"))
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Only artists can do that.",
        });

      const doesSubmissionExist = !!(await ctx.prisma.submission.findFirst({
        where: { id: input.id, graphicsComplete: false },
      }));
      if (!doesSubmissionExist)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Submission not found.",
        });

      const done: string[] = [];

      try {
        const urls = await Promise.all(
          input.files.map(async (data) => {
            const url = `art/${nanoid()}.png`;
            await storage.uploadPublic(url, data);
            done.push(url);
            return storage.key(url);
          })
        );
        await ctx.prisma.submission.update({
          where: {
            id: input.id,
          },
          data: { imageUrls: urls, graphicsComplete: true },
        });
      } catch {
        await Promise.all(
          done.map((url) => storage.deleteFile(storage.key(url)))
        );
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
