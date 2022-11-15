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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { body: data, query } = req;

  if (query.secret !== process.env.SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const pathsToRevalidate: string[] = ["/"];
  let result;

  if (query.type === "topic") {
    result = await prisma.topic.create({
      data,
    });

    (
      await prisma.topic.findMany({
        select: { slug: true },
      })
    ).forEach(async ({ slug }) => {
      pathsToRevalidate.push(`/topics/${slug}`);
    });
  } else if (query.type === "issue") {
    result = await prisma.issue.create({
      data,
    });

    pathsToRevalidate.push("/issues");

    (
      await prisma.issue.findMany({
        select: { slug: true },
      })
    ).forEach(async ({ slug }) => {
      pathsToRevalidate.push(`/issues/${slug}`);
    });
  } else if (
    query.type === "person" &&
    data.published === ArticleStatus.PUBLISHED
  ) {
    result = await prisma.person.create({
      data,
    });

    pathsToRevalidate.push(data.isExec ? "/execs" : "/people");

    (
      await prisma.person.findMany({
        select: { slug: true },
      })
    ).forEach(async ({ slug }) => {
      pathsToRevalidate.push(`/people/${slug}`);
    });
  } else if (query.type === "article") {
    // Revalidate /articles and slug paths
    pathsToRevalidate.push("/articles");
    (
      await prisma.article.findMany({
        select: { slug: true },
      })
    ).forEach(async ({ slug }) => {
      pathsToRevalidate.push(`/articles/${slug}`);
    });

    // Revalidate realation fields
    pathsToRevalidate.push(`issues/${getIssue(data.issue)}`);
    data.topics.forEach((slug: string) =>
      pathsToRevalidate.push(`topics/${getTopic(slug)}`)
    );
    data.authors.forEach((slug: string) =>
      pathsToRevalidate.push(`people/${getPerson(slug)}`)
    );

    // Format data and create article
    const excerpt = prune(markdownToTxt(req.body.content));
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
