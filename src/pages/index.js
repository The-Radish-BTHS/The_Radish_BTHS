import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import Articard from "../components/Cards/Articard.js"
import IssueCard from "../components/Cards/IssueCard.js"

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

export default function Index({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { issue, articles } = data
  return (
    <Layout>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {issue.edges.map(({ node }) => {
          return (
            <IssueCard
              key={node.id}
              slug={node.fields.slug}
              date={node.frontmatter.date}
              title={node.frontmatter.title}
              cover={node.fields.rel_cover}
            />
          )
        })}
        {articles.edges.map(({ node }) => {
          return (
            <Articard
              key={node.id}
              slug={node.fields.slug}
              excerpt={node.excerpt}
              title={node.frontmatter.title}
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
  query index { # Is there a better way to get the most recent one?
    issue: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1
      filter: { fields: { slug: { regex: "^/issues/" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
          fields {
            slug
            rel_cover {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
    articles: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 50
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
