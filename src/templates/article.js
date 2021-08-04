import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

const ValidSlug = (collection, name) => `/${collection}/${name.toLowerCase().replace(/[/|\\:*?"<>()]/g, '').replace(/ /g, "-")}`;

export default function Article({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data
  const { frontmatter, html} = markdownRemark

  return (
    <Layout pageName={frontmatter.title}>
      <div className="page-title">
        <h1>{frontmatter.title}</h1>
        <h4>{frontmatter.date}</h4>
        <h4>
          {`Written by: `}
          {frontmatter.authors.map(({ author }, index) => {
            return (
              <div key={index}>
                {`${index === frontmatter.authors.length - 1 && frontmatter.authors.length !== 1 ? " and " : ""}`}
                <Link
                  to={ValidSlug("authors", author)}
                  className="color-under-link"
                >
                  {`${author}`}
                </Link>
                {`${index < frontmatter.authors.length - 1 ? ", " : ""}`}
              </div>
            )
          })}
          {` for `}
          <Link
            to={ValidSlug("issues", frontmatter.issue)}
            className="color-under-link"
          >
            {`${frontmatter.issue}`}
          </Link>
      </h4>
      <h4>
        {frontmatter.tags.map(({ tag }, index) => {
          return (
            <Link
              to={ValidSlug('tags', tag)}
              key={index}
              className="tag"
            >
              {`#${tag}`}
            </Link>
          )
        })}
      </h4>
    </div>
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
        issue
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
