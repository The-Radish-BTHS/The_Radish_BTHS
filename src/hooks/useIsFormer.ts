export const useIsFormer = () => {
  const isFormer = (year: number | undefined) => {
    const today = new Date();
    if (!year) return false;
    const former =
      today.getFullYear() > year ||
      (today.getFullYear() === year && today.getMonth() > 6);

    return former;
  };

  return { isFormer };
};
