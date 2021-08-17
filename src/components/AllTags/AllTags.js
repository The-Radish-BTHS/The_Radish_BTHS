import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import "./AllTags.css";

export default function AllTags() {
  const data = useStaticQuery(graphql`
    query AllTags {
      tags: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
        filter: { fields: { slug: { regex: "^/tags/" } } }
      ) {
        edges {
          node {
            id
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
  const { tags } = data;
  return (
    <div className="tags">
      {tags.edges.map(({ node }) =>
          <Link
            to={node.fields.slug}
            key={node.id}
            className="tag"
          >
            {`#${node.frontmatter.title}`}
          </Link>
        )}
    </div>
  )
}
