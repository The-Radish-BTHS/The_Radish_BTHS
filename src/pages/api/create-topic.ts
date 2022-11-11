import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma.server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  const result = await prisma.topic.create({
    data,
  });

  try {
    await res.revalidate(`/topics/${data.slug}`, data);
    console.log("revalidated");
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }

  res.json(result);
}
