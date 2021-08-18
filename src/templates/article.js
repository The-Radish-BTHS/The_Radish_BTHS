import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

import Articard from "../components/Cards/Articard.js"

const ValidSlug = (collection, name) => `/${collection}/${name.toLowerCase().replace(/[/|\\:*?"<>()]/g, '').replace(/ /g, "-")}`;

export default function Article({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { article, more } = data
  const { frontmatter, html} = article

  return (
    <Layout pageName={frontmatter.title}>
      <div className="page-title">
        <h1>{frontmatter.title}</h1>
        <h4>{frontmatter.date}</h4>
        <p>{frontmatter.description}</p>
        <h4>
          {`Written by: `}
          {frontmatter.authors.map(({ author }, index) => {
            return (
              <div key={index} className="author">
                {`${index === frontmatter.authors.length - 1 && frontmatter.authors.length !== 1 ? `and ` : ``}`}
                <Link
                  to={ValidSlug("authors", author)}
                  className="color-under-link"
                >
                  {`${author}`}
                </Link>
                {`${(index < frontmatter.authors.length - 1) && (frontmatter.authors.length !== 2) ? `, ` : ` `}`}
              </div>
            )
          })}
          {`for `}
          <Link
            to={ValidSlug("issues", frontmatter.issue)}
            className="color-under-link"
          >
            {`${frontmatter.issue}`}
          </Link>
      </h4>
    </div>
    <div className="article">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <h4>
        {frontmatter.tags && frontmatter.tags.length ?
          <>
            {`Tags: `}
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
          </>
          : null
        }
      </h4>
      <h2>
        {more.edges.length ?
          <>
            {`More from `}
            <Link
              to={ValidSlug("issues", frontmatter.issue)}
              className="color-under-link"
            >
              {`${frontmatter.issue}`}
            </Link>
          </>
          : null
        }
      </h2>
    </div>
    <div className="card-grid">
      {more.edges.map(({ node }) => {
        return (
          <Articard
            key={node.id}
            slug={node.fields.slug}
            title={node.frontmatter.title}
            excerpt={node.excerpt}
            tags={node.frontmatter.tags}
            authors={node.frontmatter.authors}
            description={node.frontmatter.description}
            date={node.frontmatter.date}
            issue={node.frontmatter.issue}
          />
        )
      })}
    </div>
  </Layout>
  )
}

export const pageQuery = graphql`
  query article ($slug: String!, $issue: String!) {
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        issue
        description
        authors {
          author
        }
        tags {
          tag
        }
      }
    }
    more: allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
      limit: 3
      filter: {frontmatter: { issue: {eq: $issue}}, fields: {slug: {regex: "^/articles/", ne: $slug}}}
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            title
            description
            issue
            date(formatString: "MMMM YYYY")
            authors {
              author
            }
            tags {
              tag
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
