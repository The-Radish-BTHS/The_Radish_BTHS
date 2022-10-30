import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma.server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  const result = await prisma.article.create({
    data,
  });

  console.log(res.json(result));

  res.json(result);
}
