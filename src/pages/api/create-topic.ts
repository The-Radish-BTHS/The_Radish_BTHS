import { NextApiRequest, NextApiResponse } from "next";
import { Topic } from "@prisma/client";
import prisma from "lib/prisma.server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  const result = await prisma.topic.create({
    data,
  });

  res.json(result);
}
