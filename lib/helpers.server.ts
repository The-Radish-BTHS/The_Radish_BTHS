export const noDate = (obj: any) => ({
  ...obj,
  publishedOn: obj.publishedOn.getTime(),
});

export const noDateArray = (objs: any[]) => objs.map((obj) => noDate(obj));

export const noSubDate = (obj: any) => ({
  ...obj,
  articles: noDateArray(obj.articles),
});
