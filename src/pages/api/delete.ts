import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma.server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { query } = req;

  if (query.secret !== process.env.SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (query.type === "topic") {
    await prisma.topic.deleteMany();
  } else if (query.type === "issue") {
    await prisma.issue.deleteMany();
  } else if (query.type === "person") {
    await prisma.person.deleteMany();
  } else if (query.type === "article") {
    await prisma.article.deleteMany();
  } else {
    return res.status(404).json({ message: "Invalid type" });
  }

  res.status(200).json("Succesfully deleted all values of type " + query.type);
}
