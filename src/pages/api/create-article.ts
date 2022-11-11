import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma.server";
import { prune } from "@lib/helpers.server";
import markdownToTxt from "markdown-to-txt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = { ...req.body, excerpt: prune(markdownToTxt(req.body.content)) };

  const result = await prisma.article.create({
    data,
  });

  res.json(result);
}
