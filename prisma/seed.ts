import { PrismaClient } from "@prisma/client";
import markdownToTxt from "markdown-to-txt";
import articles from "./seed-data/articles.json";
import issues from "./seed-data/issues.json";
import people from "./seed-data/people.json";
import topics from "./seed-data/topics.json";

const prisma = new PrismaClient();

const createIssues = () =>
  issues.map((issue) =>
    prisma.issue.create({
      data: {
        coverUrl: issue.cover,
        title: issue.title,
        slug: issue.slug,
        description: issue.description,
        published: issue.published,
        publishedOn: new Date(issue.publishedOn),
        pdf: issue.pdf,
      },
    })
  );

const createPeople = () =>
  people.map((person) =>
    prisma.person.create({
      data: {
        name: person.name,
        description: person.description,
        gradYear: person.gradYear,
        position: person.position,
        image: person.image,
        slug: person.slug,
        isExec: person.isExec,
      },
    })
  );

const createArticles = () =>
  articles.map((article) =>
    prisma.article.create({
      data: {
        title: article.title,
        content: article.content,
        slug: article.slug,
        published: article.published === "PUBLISHED",
        publishedOn: new Date(article.publishedOn),
        issue: {
          connect: {
            slug: article.issue,
          },
        },
        excerpt: markdownToTxt(article.content).substring(0, 100),
        authors: {
          connect: article.authors.map((author) => ({
            slug: author,
          })),
        },
        topics: {
          connect: article.topics.map((topic) => ({
            slug: topic,
          })),
        },
      },
    })
  );

const createTopics = () =>
  topics.map((topic) =>
    prisma.topic.create({
      data: {
        name: topic.name,
        slug: topic.slug,
        description: topic.description,
      },
    })
  );

export const seed = async () => {
  await prisma.$transaction([
    ...createPeople(),
    ...createTopics(),
    ...createIssues(),
    ...createArticles(),
  ]);
};

seed().catch((err) => console.error(err));
