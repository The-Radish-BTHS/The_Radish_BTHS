import React from "react"
import { graphql } from "gatsby"
import "./pages.css"

import Layout from "../components/Layout"
import Articard from "../components/Cards/Articard.js"

export default function Author({
  data, // this prop will be injected by the GraphQL query below.
}) {
  // const { markdownRemark } = data // data.markdownRemark holds your post data
  // const { frontmatter, html } = markdownRemark
  const {
    // issues, // Add in later; map every third element in articles to an issue instead
    articles
  } = data
  return (
    <Layout>
      <div className="card-grid">
        {articles.edges.map(({ node }) => {
          return (
            <Articard
              key={node.id}
              slug={node.fields.slug}
              excerpt={node.excerpt}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              authors={node.frontmatter.authors}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query index {
    issues: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 20
      filter: { fields: { slug: { regex: "^/issues/" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            url
            #cover {
            #  childImageSharp {
            #    gatsbyImageData(placeholder: BLURRED)
            #  }
            #}
          }
          fields {
            slug
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
            date(formatString: "MMMM DD, YYYY")
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
