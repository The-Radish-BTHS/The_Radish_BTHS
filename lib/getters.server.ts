import prisma from "./prisma.server";

export const getArticles = async () => {
  const articles = await prisma.article.findMany({
    where: { published: true },
    include: {
      issue: {
        select: { time: true, slug: true },
      },
      authors: {
        select: { name: true, slug: true },
      },
      topics: {
        select: { name: true, slug: true },
      },
    },
  });

  const noDateArticles = articles.slice(0, 6).map((i) => ({
    ...i,
    publishedOn: i.publishedOn.getTime(),
  }));

  return noDateArticles;
};
