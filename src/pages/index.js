import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import Articard from "../components/Cards/Articard.js"
import HighlightIssueCard from "../components/Cards/HighlightIssueCard.js"

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

export default function Index({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { issues, articles } = data

  const articleCards = articles.edges.map(({ node }) => {
    return (
      <Articard
        key={node.id}
        slug={node.fields.slug}
        excerpt={node.excerpt}
        title={node.frontmatter.title}
        authors={node.frontmatter.authors}
        tags={node.frontmatter.tags}
        description={node.frontmatter.description}
      />
    )
  })

  /*
  The articles being fed in rn aren't actually the first three in the issue
  */
  const issueCards = issues.edges.map(({ node }) => {
    return (
      <HighlightIssueCard
        key={node.id}
        slug={node.fields.slug}
        date={node.frontmatter.date}
        title={node.frontmatter.title}
        cover={node.fields.rel_cover}
        articles={articleCards.slice(0, 3)}
        description={node.frontmatter.description}
      />
    )
  })

  return (
    <Layout>
      {issueCards}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {articleCards.slice(3, articleCards.length)}
      </Masonry>
    </Layout>
  )
}

export const pageQuery = graphql`
  query index { # Is there a better way to get the most recent one?
    issues: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1
      filter: { fields: { slug: { regex: "^/issues/" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            description
            date(formatString: "MMMM YYYY")
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
      limit: 100
      filter: { fields: { slug: { regex: "^/articles/" } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          frontmatter {
            title
            description
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
