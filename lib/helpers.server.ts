export const slugsToPaths = (arr: { slug: string }[]) =>
  arr.map((item) => ({ params: item }));
