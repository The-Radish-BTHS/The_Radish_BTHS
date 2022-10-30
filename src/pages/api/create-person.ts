import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma.server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  const result = await prisma.person.create({
    data,
  });

  res.json(result);
}
