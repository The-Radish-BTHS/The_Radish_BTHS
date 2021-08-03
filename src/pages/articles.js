import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import Articard from "../components/Cards/Articard.js"

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

export default function Author({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { articles } = data
  return (
    <Layout pageName="Allticles">
      <div className="page-title">
        <h1>Allticles</h1>
        <h2>(All the articles)</h2>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {articles.edges.map(({ node }) => {
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
    </Layout>
  )
}

export const pageQuery = graphql`
  query articles {
    articles: allMarkdownRemark(
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
`
