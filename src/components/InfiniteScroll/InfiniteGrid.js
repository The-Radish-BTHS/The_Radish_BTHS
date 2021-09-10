import React from "react"
import Masonry from "react-masonry-css"
import { InfiniteScroll } from "./InfiniteScroll";
import { Articard } from "../Cards/index"

const breakpointColumnsObj = {
  default: 3,
  1300: 2,
  600: 1,
}

export default function InfiniteGrid({globalState, items, Card}) {
  const numPages = Math.ceil(items.edges.length / 5)
  const hasMore = globalState.hasMore(numPages)

  if (globalState.isInitializing() || !globalState.useInfiniteScroll) {
    globalState.updateState({
      items: items.edges.slice(0, 5),
      cursor: globalState.cursor+1
    })
  }

  // const map_items = (globalState.isInitializing() ? items : globalState.items)

  return(
    <InfiniteScroll
      throttle={300}
      threshold={600}
      isLoading={globalState.isLoading}
      hasMore={hasMore}
      onLoadMore={globalState.loadMore}
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {globalState.items.map(({ node }) => {
          return (
            <Articard
              key={node.id}
              slug={node.fields.slug}
              title={node.frontmatter.title}
              excerpt={node.excerpt}
              authors={node.frontmatter.authors}
              tags={node.frontmatter.tags}
              description={node.frontmatter.description}
              date={node.frontmatter.date}
              issue={node.frontmatter.issue}
            />
          )
        })}
      </Masonry>
    </InfiniteScroll>
  )
}
