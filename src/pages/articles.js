import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import Banner from "../components/Banner/Banner.js"
import Articard from "../components/Cards/Articard.js"

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

const Shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return (arr)
}

export default function Articles({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { newestFirstArticles } = data
  const [articles, setArticles] = useState(newestFirstArticles.edges.slice(0, newestFirstArticles.edges.length))
  const [oldestFirst, setOldestFirst] = useState(false)
  const [randomOrder, setRandomOrder] = useState(false)

  useEffect(() => {
    if (oldestFirst) {
      setArticles(newestFirstArticles.edges.slice(0, newestFirstArticles.edges.length).reverse())
    }
    else {
      setArticles(newestFirstArticles.edges.slice(0, newestFirstArticles.edges.length))
    }
  }, [newestFirstArticles, setArticles, oldestFirst])
  useEffect(() => {
    if (randomOrder) {
      setArticles(Shuffle(newestFirstArticles.edges.slice(0, newestFirstArticles.edges.length)))
      setRandomOrder(false)
    }
  }, [setArticles, newestFirstArticles, randomOrder])

  return (
    <Layout pageName="Allticles">
      <Banner
        bg="/banner.jpg"
        header="Allticles"
        txt="All the articles"
      />
      <div className="page-title">
        <input
          type="checkbox"
          onChange={ (evt) => setOldestFirst(evt.target.checked) }
          id="oldest-first"
        />
        <label htmlFor="oldest-first">Oldest first</label>
        <button className="shuffle-btn" onClick={ (evt) => setRandomOrder(true)}>Shuffle</button>
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
