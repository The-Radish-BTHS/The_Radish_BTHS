import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma.server";
import { prune, slugsToConnect, slugToConnect } from "@lib/helpers.server";
import markdownToTxt from "markdown-to-txt";
import {
  getIssue,
  getPerson,
  getTopic,
} from "@lib/getters/unique-getters.server";
import { ArticleStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import {
  revalidateArticles,
  revalidateIssues,
  revalidatePeople,
  revalidateTopics,
} from "./revalidate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { body: data, query } = req;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (query.secret !== process.env.SECRET && !session) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (typeof data === "string") {
    data = JSON.parse(data);
  }

  let pathsToRevalidate;
  let result;

  if (query.type === "topic") {
    result = await prisma.topic.create({
      data,
    });

    pathsToRevalidate = await revalidateTopics();
  } else if (query.type === "issue") {
    result = await prisma.issue.create({
      data,
    });

    pathsToRevalidate = await revalidateIssues();
  } else if (query.type === "person") {
    result = await prisma.person.create({
      data,
    });

    pathsToRevalidate = await revalidatePeople(data.isExec);
  } else if (query.type === "article") {
    pathsToRevalidate = await revalidateArticles(
      data.issue,
      data.topics,
      data.authors
    );

    // Format data and create article
    const excerpt =
      data.published === ArticleStatus.PUBLISHED
        ? prune(markdownToTxt(req.body.content))
        : "";
    data = {
      ...data,
      excerpt,
      issue: slugToConnect(data.issue),
      topics: slugsToConnect(data.topics),
      authors: slugsToConnect(data.authors),
    };

    result = await prisma.article.create({
      data,
    });
  } else {
    return res.status(404).json({ message: "Invalid type" });
  }

  try {
    pathsToRevalidate.forEach(async (path) => {
      await res.revalidate(path, data);
    });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }

  res.json(result);
}
