import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import "./Articles.css"

export default function Articles() {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        sort: {order: DESC, fields: [frontmatter___date]}
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              description
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
        data.allMarkdownRemark.edges.map(node => {
          return (
            <div className="fp-cell" key={node.node.id}>
              <Link to={node.node.fields.slug}>{node.node.frontmatter.title}</Link>
              <p>{node.node.frontmatter.description}</p>
            </div>
          )
        })
      }
    </div>
  )
}
