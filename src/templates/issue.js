import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Articard from "../components/Cards/Articard.js"

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

export default function Issue({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { issue, articles } = data

  const image = getImage(data.issue.fields.rel_cover)

  return (
    <Layout pageName={issue.frontmatter.title}>
      <div className="page-title">
        <h1>{issue.frontmatter.title}</h1>
        <div className="cover-container">
          <div className="cover">
            <GatsbyImage
              image={image}
              alt={data.issue.frontmatter.title}
              placeholder="blurred"
            />
          </div>
        </div>
        <h3>{issue.frontmatter.date}</h3>
        <a href={issue.frontmatter.pdf} target="_blank" rel="noreferrer" className="color-under-link">PDF</a>
      </div>
      <p />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {
          articles.edges.map(({node}) => {
            return (
              <Articard
                key={node.id}
                slug={node.fields.slug}
                title={node.frontmatter.title}
                excerpt={node.excerpt}
                authors={node.frontmatter.authors}
                tags={node.frontmatter.tags}
              />
            )
          })
        }
      </Masonry>
    </Layout>
  )
}

export const pageQuery = graphql`
  query issue ($title: String!) {
    issue: markdownRemark(frontmatter: {title: {eq: $title}}) {
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
