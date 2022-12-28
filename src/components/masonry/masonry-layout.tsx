import styles from "./MasonryLayout.module.css";
import Masonry from "react-masonry-css";

const catchMins = (obj: any, min: number | undefined) => {
  for (const keyIdx in Object.keys(obj)) {
    const key = Object.keys(obj)[keyIdx];
    const val = obj[key];
    obj[key] = Math.min(val, min || val);
  }
  return obj;
};

const MasonryLayout: React.FC<
  React.PropsWithChildren<{
    numItems?: number;
    breakpoints?: any;
  }>
> = ({ numItems, breakpoints = { default: 3, 990: 2, 767: 1 }, children }) => {
  const breakpointColumnsObj = catchMins(breakpoints, numItems);
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles["my-masonry-grid"]}
      columnClassName={styles["static-masonry-grid_column"]}>
      {children}
    </Masonry>
  );
};

export default MasonryLayout;
