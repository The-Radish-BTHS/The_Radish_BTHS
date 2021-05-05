import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  // const { markdownRemark } = data // data.markdownRemark holds your post data
  // const { frontmatter } = markdownRemark
  return (
    <Layout>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <h3>{data.markdownRemark.frontmatter.date}</h3>
      <a href={data.markdownRemark.frontmatter.url}>PDF</a>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($slug: String!, $mindate: Date!, $maxdate: Date!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        url
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {date: { gte: $mindate, lte: $maxdate}}, fields: {slug: {regex: "^/articles/"}}}
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            authors {
              name
              position
            }
          }
        }
      }
    }
  }
`
