// src\pages\{MarkdownRemark.fields__slug}.js

import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import AuthorCard from "../components/Cards/AuthorCard.js"

import "./pages.css"

export default function Article({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { allMarkdownRemark } = data

  return (
    <Layout>

      <h1>Authors</h1>
      <h2>We exist</h2>
      <div className="frontpage">
        {
          allMarkdownRemark.edges.map(({ node }) => {
            // console.log("-----------------------------------------------")
            // console.log(JSON.stringify(node.frontmatter.authors, null, 5))
            // console.log("-----------------------------------------------")
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
