// src\pages\{MarkdownRemark.fields__slug}.js

import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import "./article.css"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <h3>{frontmatter.date}</h3>
      <h4>
        {frontmatter.authors.map((author, index) => (
          <Link
            to={`/authors/${author.author.toLowerCase()}`}
            key={index}
            className="AuthorLink"
          >
            {`${author.author}${
              index < frontmatter.authors.length - 1 ? ", " : ""
            }`}
          </Link>
        ))}
      </h4>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        authors {
          author
        }
      }
    }
  }
`
