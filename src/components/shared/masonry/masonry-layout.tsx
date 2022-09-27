import styles from "./MasonryLayout.module.css";
import Masonry from "react-masonry-css";

const MasonryLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
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
