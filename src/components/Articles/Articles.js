import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Masonry from "react-masonry-css"

import Articard from "../Cards/Articard.js"
import "./Articles.css"

export default function Articles() {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
        filter: { fields: { slug: { regex: "^/articles/" } } }
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 100)
            frontmatter {
              title
              authors {
                author
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const breakpointColumnsObj = {
    default: 3,
    1000: 2,
    600: 1,
  }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {data.allMarkdownRemark.edges.map(({ node }) => {
        // console.log("-----------------------------------------------")
        // console.log(JSON.stringify(node.frontmatter.authors, null, 5))
        // console.log("-----------------------------------------------")
        return (
          <Articard
            key={node.id}
            slug={node.fields.slug}
            title={node.frontmatter.title}
            excerpt={node.excerpt}
            authors={node.frontmatter.authors}
          />
        )
      })}
    </Masonry>
  )
}
