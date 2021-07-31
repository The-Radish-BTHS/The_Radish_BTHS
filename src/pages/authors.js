import React from "react"
import { graphql } from "gatsby"
import "./pages.css"

import Layout from "../components/Layout"
import AuthorCard from "../components/Cards/AuthorCard.js"

export default function Article({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { allMarkdownRemark } = data

  return (
    <Layout>
      <h1>Authors</h1>
      <h2>We exist</h2>
      <div className="card-grid">
        {
          allMarkdownRemark.edges.map(({ node }) => {
            return (
              <AuthorCard
                key={node.id}
                slug={node.fields.slug}
                title={node.frontmatter.title}
                position={node.frontmatter.position}
              />
            )
          })
        }
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query authors {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
      limit: 1000
      filter: {fields: {slug: {regex: "^/authors/"}}}
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            position
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
