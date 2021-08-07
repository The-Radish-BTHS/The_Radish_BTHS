import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import Articard from "../components/Cards/Articard.js"

const ValidSlug = (collection, name) => `/${collection}/${name.toLowerCase().replace(/[/|\\:*?"<>()]/g, '').replace(/ /g, "-")}`;

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

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
        <h4>
          {`Written by: `}
          {frontmatter.authors.map(({ author }, index) => {
            return (
              <div key={index} className="author">
                {`${index === frontmatter.authors.length - 1 && frontmatter.authors.length !== 1 ? ` and ` : ``}`}
                <Link
                  to={ValidSlug("authors", author)}
                  className="color-under-link"
                >
                  {`${author}`}
                </Link>
                {`${index < frontmatter.authors.length - 1 ? `, ` : ``}`}
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
    </div>
    <div className="article">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
    <h4>
      {frontmatter.tags ?
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
    <h2 className="more">
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
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {more.edges.map(({ node }) => {
        return (
          <Articard
            key={node.id}
            slug={node.fields.slug}
            title={node.frontmatter.title}
            excerpt={node.excerpt}
            tags={node.frontmatter.tags}
            // authors={node.frontmatter.authors} // Might be redundant
          />
        )
      })}
    </Masonry>
  </Layout>
  )
}

export const pageQuery = graphql`
  query article ($slug: String!, $title: String!, $issue: String!) {
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
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
    more: allMarkdownRemark(
      filter: {frontmatter: { issue: {eq: $issue}, title: {ne: $title}}, fields: {slug: {regex: "^/articles/"}}}
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            title
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
