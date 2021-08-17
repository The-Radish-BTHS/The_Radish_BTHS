import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import Articard from "../components/Cards/Articard.js"

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

export default function Author({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { tag, articles, tags } = data
  return (
    <Layout pageName={`#${tag.frontmatter.title}`}>
      <div className="page-title">
        <h1 className="tag">{`#${tag.frontmatter.title}`}</h1>
        <p>{tag.frontmatter.description}</p>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {articles.edges.map(({ node }) => {
          return (
            <Articard
              key={node.id}
              slug={node.fields.slug}
              title={node.frontmatter.title}
              excerpt={node.excerpt}
              authors={node.frontmatter.authors}
              tags={node.frontmatter.tags}
              description={node.frontmatter.description}
            />
          )
        })}
      </Masonry>
      <div className="tags">
        {tags.edges.map(({ node }) =>
            <Link
              to={node.fields.slug}
              key={node.id}
              className="tag"
            >
              {`#${node.frontmatter.title}`}
            </Link>
          )}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query tag ($slug: String!, $title: String!) {
    tag: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
      }
    }
    articles: allMarkdownRemark(
      filter: {
        frontmatter: { tags: { elemMatch: { tag: { eq: $title } } } }
      }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          frontmatter {
            title
            description
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
    tags: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
      filter: { fields: { slug: { ne: $slug, regex: "^/tags/" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
