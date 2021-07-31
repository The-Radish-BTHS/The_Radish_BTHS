import React from "react"
import Layout from "../components/Layout"
import "./templates.css"
import { graphql, Link } from "gatsby"

const ValidSlug = (collection, name) => `/${collection}/${name.toLowerCase().replace(/[/|\\:*?"<>()]/g, '').replace(/ /g, "-")}`;

export default function Article({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <h4>{frontmatter.date}</h4>
      <h4>
        {frontmatter.tags.map(({ tag }, index) => {
          return (
            <Link
              to={ValidSlug('tags', tag)}
              key={index}
              className="green-under-link"
            >
              {`${tag}${index < frontmatter.tags.length - 1 ? ", " : ""}`}
            </Link>
          )
        })}
      </h4>
      <h4>
        {`Written by: `}
        {frontmatter.authors.map(({ author }, index) => {
          return (
            <Link
              to={ValidSlug("authors", author)}
              key={index}
              className="green-under-link"
            >
              {`${author}${index < frontmatter.authors.length - 1 ? ", " : ""}`}
            </Link>
          )
        })}
    </h4>
    <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query article ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        authors {
          author
        }
        tags {
          tag
        }
      }
    }
  }
`
