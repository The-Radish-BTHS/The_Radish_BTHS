import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import Articard from "../components/Cards/Articard.js"

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

export default function Articles({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { newestFirstArticles } = data
  const [articles, setArticles] = useState(newestFirstArticles.edges)
  const [oldestFirst, setOldestFirst] = useState(false)

  useEffect(() => {
    setArticles(articles.reverse())
  }, [articles, setArticles, oldestFirst])

  return (
    <Layout pageName="Allticles">
      <div className="page-title">
        <h1>Allticles</h1>
        <h2>(All the articles)</h2>
        <div className="container">
          <input
            type="checkbox"
            onChange={ (evt) => setOldestFirst(evt.target.checked) }
            id="oldest-first"
          />
          <label for="oldest-first">Oldest first</label>
        </div>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {articles.map(({ node }) => {
          return (
            <Articard
              key={node.id}
              slug={node.fields.slug}
              title={node.frontmatter.title}
              excerpt={node.excerpt}
              authors={node.frontmatter.authors}
              tags={node.frontmatter.tags}
              description={node.frontmatter.description}
              date={node.frontmatter.date}
              issue={node.frontmatter.issue}
            />
          )
        })}
      </Masonry>
    </Layout>
  )
}

export const pageQuery = graphql`
  query articles {
    newestFirstArticles: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
      filter: { fields: { slug: { regex: "^/articles/" } } }
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
  }
`
