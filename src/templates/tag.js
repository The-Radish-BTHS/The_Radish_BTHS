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
  const { tag, articles } = data
  return (
    <Layout pageName={`#${tag.frontmatter.title}`}>
      <div className="page-title">
        <h1 className="tag">{`#${tag.frontmatter.title}`}</h1>
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
              tags={node.frontmatter.tags}
            />
          )
        })}
      </Masonry>
    </Layout>
  )
}

export const pageQuery = graphql`
  query tag ($title: String!) {
    tag: markdownRemark(frontmatter: { title: { eq: $title } }) {
      frontmatter {
        title
      }
    }
    articles: allMarkdownRemark(
      filter: {
        frontmatter: { tags: { elemMatch: { tag: { eq: $title } } } }
      }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            title
            authors {
              author
            }
            tags {
              tag
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
