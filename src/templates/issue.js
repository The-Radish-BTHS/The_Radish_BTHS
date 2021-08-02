import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Articard from "../components/Cards/Articard.js"

export default function Issue({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const image = getImage(data.issue.fields.rel_cover)

  return (
    <Layout>
      <div className="page-title">
        <h1>{data.issue.frontmatter.title}</h1>
        <div className="cover-container">
          <div className="cover">
            <GatsbyImage
              image={image}
              alt={data.issue.frontmatter.title}
              placeholder="blurred"
            />
          </div>
        </div>
        <h3>{data.issue.frontmatter.date}</h3>
        <a href={data.issue.frontmatter.pdf} target="_blank" rel="noreferrer" className="green-under-link">PDF</a>
      </div>
      <p />
      <div className="card-grid">
        {
          data.articles.edges.map(({node}) => {
            return (
              <Articard
                key={node.id}
                slug={node.fields.slug}
                title={node.frontmatter.title}
                excerpt={node.excerpt}
                authors={node.frontmatter.authors}
                date={node.frontmatter.date}
              />
            )
          })
        }
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query issue ($slug: String!, $title: String!) {
    issue: markdownRemark(fields: {slug: {eq: $slug}}) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        pdf
      }
      fields {
        rel_cover {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
    articles: allMarkdownRemark(
      filter: {frontmatter: { issue: {eq: $title} }, fields: {slug: {regex: "^/articles/"}}}
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
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
