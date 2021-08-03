import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import AuthorCard from "../components/Cards/AuthorCard.js"

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

export default function Article({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { allMarkdownRemark } = data

  return (
    <Layout>
      <div className="page-title">
        <h1>Authors</h1>
        <h2>We exist</h2>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {
          allMarkdownRemark.edges.map(({ node }) => {
            return (
              <AuthorCard
                key={node.id}
                slug={node.fields.slug}
                title={node.frontmatter.title}
                position={node.frontmatter.position}
                date={node.frontmatter.date}
              />
            )
          })
        }
      </Masonry>
    </Layout>
  )
}

export const pageQuery = graphql`
  query authors {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
      limit: 1000
      filter: {fields: {slug: {regex: "^/authors/"}}}
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            position
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
