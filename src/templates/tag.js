import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Articard from "../components/Cards/Articard.js"
import "../pages/pages.css"

export default function Author({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { tag, articles } = data
  return (
    <Layout>
      <div className="page-title">
        <h1>{tag.frontmatter.title}</h1>
      </div>
      <div className="card-grid">
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
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query tag ($slug: String!, $title: String!) {
    tag: markdownRemark(fields: { slug: { eq: $slug } }) {
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
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
