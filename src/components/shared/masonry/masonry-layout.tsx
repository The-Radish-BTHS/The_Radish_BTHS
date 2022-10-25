import styles from "./MasonryLayout.module.css";
import Masonry from "react-masonry-css";

const MasonryLayout: React.FC<
  React.PropsWithChildren<{ numItems?: number }>
> = ({ numItems, children }) => {
  const breakpointColumnsObj = {
    default: Math.min(3, numItems || 3),
    990: Math.min(2, numItems || 2),
    767: Math.min(1, numItems || 1),
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles["my-masonry-grid"]}
      columnClassName={styles["my-masonry-grid_column"]}>
      {children}
    </Masonry>
  );
};

export default MasonryLayout;
