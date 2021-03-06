import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import Seo from "../components/Seo"
import website from '../../config/website'

import { Articard } from "../components/Cards/index"
import AllTags from "../components/AllTags/AllTags.js"

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

export default function Tag({
  location,
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { tag, articles } = data
  return (
    <Layout pageName={`#${tag.frontmatter.title}`}>
      <Seo
        title={`${tag.frontmatter.title} | ${website.titleAlt}`}
        pathname={location.pathname}
        desc={tag.frontmatter.description ? tag.frontmatter.description : tag.excerpt}
        node={tag.frontmatter}
        collection
      />

      <div className="page-content">
        <div className="page-title">
          <h1 className="tag">{`#${tag.frontmatter.title}`}</h1>
          {tag.frontmatter.description ? <p className="description">{tag.frontmatter.description}</p> : null}
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
                date={node.frontmatter.date}
                issue={node.frontmatter.issue}
              />
            )
          })}
        </Masonry>
        <AllTags />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query tag ($slug: String!, $title: String!) {
    tag: markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 100)
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
