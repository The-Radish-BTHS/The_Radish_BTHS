export const noDate = (obj: any) => ({
  ...obj,
  publishedOn: obj.publishedOn.getTime(),
});

export const noDateArray = (objs: any[]) => objs.map((obj) => noDate(obj));

export const noSubDate = (obj: any) => ({
  ...obj,
  articles: noDateArray(obj.articles),
});

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
