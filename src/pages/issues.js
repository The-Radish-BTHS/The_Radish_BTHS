import React from "react"
import { graphql } from "gatsby"
import "./pages.css"

import Layout from "../components/Layout"
import IssueCard from "../components/Cards/IssueCard.js"

export default function Issues({
  data, // this prop will be injected by the GraphQL query below.
}) {
  // const { markdownRemark } = data // data.markdownRemark holds your post data
  // const { frontmatter, html } = markdownRemark
  const { issues } = data
  return (
    <Layout>
      <h1>We've got issues</h1>
      <h2>Now you've got 'em too</h2>
      <div className="card-grid">
        {issues.edges.map(({ node }) => {
          return (
            <IssueCard
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
            date(formatString: "MMMM DD, YYYY")
            title
            url
            #cover {
            #  childImageSharp {
            #    gatsbyImageData(placeholder: BLURRED)
            #  }
            #}
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
