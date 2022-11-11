import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma.server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  console.log(req.query);

  const result = await prisma.topic.create({
    data,
  });

  try {
    await res.revalidate(`/`, data);

    (
      await prisma.topic.findMany({
        select: { slug: true },
      })
    ).map(async ({ slug }) => {
      await res.revalidate(`/topics/${slug}`, data);
      console.log(`Revalidated /topics/${slug}`);
    });

    console.log("revalidated");
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }

  res.json(result);
}
