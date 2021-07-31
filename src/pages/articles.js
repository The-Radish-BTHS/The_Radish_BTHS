import React from "react"
import { graphql } from "gatsby"
import "./pages.css"

import Layout from "../components/Layout"
import Articard from "../components/Cards/Articard.js"

export default function Author({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { articles } = data
  return (
    <Layout>
      <h1>Allticles</h1>
      <h2>(All the articles)</h2>
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
