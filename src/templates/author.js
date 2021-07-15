import React from "react"
import Layout from "../components/Layout"
import "../components/Articles/Articles.css"
import { graphql } from "gatsby"

// Same layout as homepage
import Articard from "../components/Cards/Articard.js"
import "../components/Articles/Articles.css"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  // const { markdownRemark } = data // data.markdownRemark holds your post data
  // const { frontmatter, html } = markdownRemark
  const { author, articles } = data
  const today = new Date()
  const grad =
    today.getMonth() > 5 && today.getFullYear() >= author.frontmatter.date
  return (
    <Layout>
      <h1>{author.frontmatter.title}</h1>
      <h3>
        <i>{(grad ? "former " : "") + author.frontmatter.position}</i>
      </h3>
      <h3>{grad ? "Graduated" : "Graduating " + author.frontmatter.date}</h3>
      <div className="frontpage">
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
  query author_content($slug: String!, $name: String!) {
    author: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date
        title
        position
      }
    }
    articles: allMarkdownRemark(
      filter: {
        frontmatter: { authors: { elemMatch: { author: { eq: $name } } } }
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
