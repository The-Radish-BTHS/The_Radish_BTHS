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
            excerpt(pruneLength: 100)
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
  `)



  return (
    <div className="frontpage">
      {
        data.allMarkdownRemark.edges.map(({node}) => {
          // console.log("-----------------------------------------------")
          // console.log(JSON.stringify(node.frontmatter.authors, null, 5))
          // console.log("-----------------------------------------------")
          return (
            <Articard
              key={node.id}
              slug={node.fields.slug}
              title={node.frontmatter.title}
              excerpt={node.excerpt}
              authors={node.frontmatter.authors}
            />
          )
        })
      }
    </div>
  )
}
