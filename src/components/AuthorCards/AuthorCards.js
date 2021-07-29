import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import AuthorCard from "../Cards/AuthorCard.js"

export default function AuthorCards() {
  const data = useStaticQuery(graphql`
    {
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
  `)

  return (
    <div className="frontpage">
      {
        data.allMarkdownRemark.edges.map(({ node }) => {
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
  )
}
