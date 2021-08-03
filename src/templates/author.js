import React from "react"
import { graphql } from "gatsby"
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
  const { author, articles } = data
  const today = new Date()
  const grad =
    today.getMonth() > 5 && today.getFullYear() >= author.frontmatter.date
  return (
    <Layout pageName={author.frontmatter.title}>
      <div className="page-title">
        <h1>{author.frontmatter.title}</h1>
        <h3>
          <i>{(grad ? "former " : "") + author.frontmatter.position}</i>
        </h3>
        <h3>{grad ? "Graduated "+ author.frontmatter.date : "Graduating " + author.frontmatter.date}</h3>
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
              // authors={node.frontmatter.authors} // redundant 
            />
          )
        })}
      </Masonry>
    </Layout>
  )
}

export const pageQuery = graphql`
  query author ($slug: String!, $title: String!) {
    author: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        date
        title
        position
      }
    }
    articles: allMarkdownRemark(
      filter: {
        frontmatter: { authors: { elemMatch: { author: { eq: $title } } } }
      }
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
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
