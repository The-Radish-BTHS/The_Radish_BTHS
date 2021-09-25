import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

import Seo from "../components/Seo"
import website from '../../config/website'

export default function AboutPage({
  location,
  data, 
}) {
  const { article } = data
  const { frontmatter, html, excerpt } = article

  return (
    <Layout pageName={frontmatter.title}>
      <Seo
        title={`${frontmatter.title} | ${website.titleAlt}`}
        pathname={location.pathname}
        desc={frontmatter.description ? frontmatter.description : excerpt}
        node={frontmatter}
        collection
      />

      <div className="article">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query aboutPage ($slug: String!) {
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 100)
      html
      frontmatter {
        title
      }
    }
  }
`
