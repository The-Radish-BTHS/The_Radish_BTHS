import slugify from "slugify";

export const prune = (text: string, n: number = 90) =>
  text[n] == " " || text.length < n
    ? text.slice(0, n)
    : text.slice(0, n).slice(0, text.slice(0, n).lastIndexOf(" "));

export const slugsToPaths = (arr: { slug: string }[]) =>
  arr.map((item) => ({ params: item }));

export const excludeSlugs = (arr?: string[]) => {
  if (arr) {
    return arr.map((slug) => ({
      slug,
    }));
  }
  return [];
};

export const articleInclude = {
  include: {
    authors: { select: { name: true, slug: true } },
    issue: { select: { title: true, slug: true } },
    topics: { select: { name: true, slug: true } },
  },
};

export const slugsToConnect = (slugs: string[]) => {
  return {
    connect: slugs?.map((slug) => ({ slug })),
  };
};

export const slugToConnect = (slug: string | null) => {
  return slug
    ? {
        connect: { slug },
      }
    : undefined;
};

export const customSlugify = (value: string) =>
  slugify(value, { lower: true, remove: /"#/g });
