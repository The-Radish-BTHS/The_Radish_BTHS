import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import Articard from "../components/Cards/Articard.js"
import AuthorCard from "../components/Cards/AuthorCard.js"

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

export default function Author({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { author, articles, authors } = data
  const today = new Date()
  const grad =
    today.getMonth() > 6 && today.getFullYear() >= author.frontmatter.date
  return (
    <Layout pageName={author.frontmatter.title}>
      <div className="page-title">
        <h1>{author.frontmatter.title}</h1>
        <h3>
          <i>{(grad ? "former " : "") + author.frontmatter.position}</i>
        </h3>
        <h3>{grad ? "Graduated "+ author.frontmatter.date : "Graduating " + author.frontmatter.date}</h3>
        <p>{author.frontmatter.description}</p>
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
              tags={node.frontmatter.tags}
              description={node.frontmatter.description}
              date={node.frontmatter.date}
              issue={node.frontmatter.issue}
              // authors={node.frontmatter.authors} // Might be redundant
            />
          )
        })}
      </Masonry>
      <h1 className="page-title"><Link to='/authors/'>{`There are other people`}</Link></h1>
      <div className="card-grid">
        {
          authors.edges.map(({ node }) => {
            return (
              <AuthorCard
                key={node.id}
                slug={node.fields.slug}
                title={node.frontmatter.title}
                position={node.frontmatter.position}
                date={node.frontmatter.date}
                description={node.frontmatter.description}
              />
            )
          })
        }
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query author ($slug: String!, $title: String!) {
    author: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        date(formatString: "YYYY")
        title
        position
        description
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
          excerpt(pruneLength: 100)
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
    authors: allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
      limit: 3
      filter: {fields: {slug: {regex: "^/authors/"}}}
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            position
            date(formatString: "YYYY")
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
