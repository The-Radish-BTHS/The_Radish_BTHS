import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

export default function Articles() {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        sort: {order: DESC, fields: [frontmatter___date]}
        limit: 1000
      ) {
        edges {
          node {
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

  return data.allMarkdownRemark.edges.map(node => {
    return (
      <div>
        <Link to={node.node.fields.slug}>{node.node.frontmatter.title}</Link>
        <p>{node.node.frontmatter.description}</p>
      </div>
    )
  })
}
