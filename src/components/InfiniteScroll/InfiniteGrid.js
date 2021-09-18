import React from "react"
import Masonry from "react-masonry-css"
import { InfiniteScroll } from "./InfiniteScroll";

const breakpointColumnsObj = {
  default: 3,
  1200: 2,
  600: 1,
}

export default function InfiniteGrid({ Card, globalState, items, collection }) {
  const numPages = Math.ceil(items.edges.length / 5)
  const hasMore = globalState.hasMore(numPages)

  if (globalState.collection !== collection) {
    globalState.updateState({
      collection: collection,
      items: items.edges.slice(0, 5),
      cursor: 2
    })
  }

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
      collection={collection}
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {globalState.items.map(({ node }) => {
          return (
            <Card
              key={node.id}
              slug={node.fields.slug}
              title={node.frontmatter.title}
              excerpt={node.excerpt}
              authors={node.frontmatter.authors}
              tags={node.frontmatter.tags}
              description={node.frontmatter.description}
              date={node.frontmatter.date}
              issue={node.frontmatter.issue}
              position={node.frontmatter.position}
              former={node.frontmatter.former}
              cover={node.fields.rel_cover}
              fileAbsolutePath={node.fileAbsolutePath}
            />
          )
        })}
      </Masonry>
    </InfiniteScroll>
  )
}
