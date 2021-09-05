import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

export default function AboutPage({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { article } = data
  const { frontmatter, html} = article

  return (
    <Layout pageName={frontmatter.title}>
      <div className="article">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query aboutPage ($slug: String!) {
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
