import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"

// Same layout as homepage
import Articard from "../components/Cards/Articard.js"
import "../pages/pages.css"

export default function Issue({
  data, // this prop will be injected by the GraphQL query below.
}) {
  return (
    <Layout>
      <h1>{data.issue.frontmatter.title}</h1>
      <h3>{data.issue.frontmatter.date}</h3>
      <a href={data.issue.frontmatter.url}>PDF</a>
      <p />
      <div className="card-grid">
        {
          data.articles.edges.map(({node}) => {
            return (
              <Articard
                key={node.id}
                slug={node.fields.slug}
                title={node.frontmatter.title}
                excerpt={node.excerpt}
                authors={node.frontmatter.authors}
                date={node.frontmatter.date}
              />
            )
          })
        }
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($slug: String!, $mindate: Date!, $maxdate: Date!) {
    issue: markdownRemark(fields: {slug: {eq: $slug}}) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        url
      }
    }
    articles: allMarkdownRemark(
      filter: {frontmatter: {date: { gte: $mindate, lt: $maxdate}}, fields: {slug: {regex: "^/articles/"}}}
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
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
`
