import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
// import Masonry from "react-masonry-css"

import IssueCard from "../components/Cards/IssueCard.js"

// const breakpointColumnsObj = {
//   default: 3,
//   1000: 2,
//   600: 1,
// }

export default function Issues({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { issues } = data
  return (
    <Layout pageName="Issues">
      <div className="page-title">
        <h1>We've got issues</h1>
        <h2>Now you've got 'em too</h2>
      </div>
      <div className="card-grid">
        {issues.edges.map(({ node }) => {
          return (
            <IssueCard
              key={node.id}
              slug={node.fields.slug}
              date={node.frontmatter.date}
              title={node.frontmatter.title}
              cover={node.fields.rel_cover}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query issues {
    issues: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 20
      filter: { fields: { slug: { regex: "^/issues/" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM YYYY")
            title
          }
          fields {
            slug
            rel_cover {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`
