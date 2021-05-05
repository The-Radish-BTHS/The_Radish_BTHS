import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Articard from "../Cards/Articard.js"
import "./Articles.css"

export default function Articles() {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        sort: {order: DESC, fields: [frontmatter___date]}
        limit: 1000
        filter: {fields: {slug: {regex: "^/articles/"}}}
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 200)
            frontmatter {
              title
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
        data.allMarkdownRemark.edges.map(({node}) => {
          return (
            <Articard
              key={node.id}
              slug={node.fields.slug}
              title={node.frontmatter.title}
              excerpt={node.excerpt}
            />
          )
        })
      }
    </div>
  )
}
