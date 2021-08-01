import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Articard from "../components/Cards/Articard.js"
import "../pages/pages.css"

export default function Author({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { author, articles } = data
  const today = new Date()
  const grad =
    today.getMonth() > 5 && today.getFullYear() >= author.frontmatter.date
  return (
    <Layout>
      <div className="page-title">
        <h1>{author.frontmatter.title}</h1>
        <h3>
          <i>{(grad ? "former " : "") + author.frontmatter.position}</i>
        </h3>
        <h3>{grad ? "Graduated "+ author.frontmatter.date : "Graduating " + author.frontmatter.date}</h3>
      </div>
      <div className="card-grid">
        {articles.edges.map(({ node }) => {
          return (
            <Articard
              key={node.id}
              slug={node.fields.slug}
              title={node.frontmatter.title}
              excerpt={node.excerpt}
              authors={node.frontmatter.authors}
            />
          )
        })}
      </div>
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
