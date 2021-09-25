import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"
import { ParallaxBanner } from 'react-scroll-parallax';
// import Banner from "../components/Banner/Banner.js"

import { Articard, HighlightIssueCard } from "../components/Cards/index"
import { Arrow } from "../components/Cards/Icons/index"

import AllTags from "../components/AllTags/AllTags.js"

const breakpointColumnsObj = {
  default: 3,
  1600: 2,
  600: 1,
}

export default function Index({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { issues, articles } = data

  const articleCards = articles.edges.map(({ node }) => {
    return (
      <Articard
        key={node.id}
        slug={node.fields.slug}
        excerpt={node.excerpt}
        title={node.frontmatter.title}
        authors={node.frontmatter.authors}
        tags={node.frontmatter.tags}
        description={node.frontmatter.description}
        date={node.frontmatter.date}
        issue={node.frontmatter.issue}
      />
    )
  })

  const issueCards = issues.edges.map(({ node }) => {
    return (
      <HighlightIssueCard
        key={node.id}
        slug={node.fields.slug}
        date={node.frontmatter.date}
        title={node.frontmatter.title}
        cover={node.fields.rel_cover}
        articles={articleCards.slice(0, 3)}
        description={node.frontmatter.description}
      />
    )
  })

  return (
    <Layout>
      {
      // <Banner
      //   bg="/banner.jpg"
      //   header="The Radish"
      //   txt="Brooklyn Tech's first, worst, and only"
      // />
      }

      <ParallaxBanner
        className="parallax-banner"
        layers={[
            {
                image: "/home_banner.png",
                amount: 0.3,
            },
            {
                children:
                  <div id='banner-children'>
                    <h1>The Radish</h1>
                    <h2>Brooklyn Tech's first, worst, and only club</h2>
                  </div>
                ,
                amount: 0,
            }
        ]}
        style={{
            height: 'max(400px, 50vh)',
        }}
      />
      <br/>
      <div className="page-content">
        <h1 className="page-title"><Link to={issues.edges[0].node.fields.slug}>Latest issue</Link></h1>
        {issueCards}
        <h3 className="page-title home-action"><Link to='/issues'>{`All issues`}<Arrow /></Link></h3>
        <h1 className="page-title"><Link to='/articles'>{`Latest articles`}</Link></h1>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {articleCards.slice(3, articleCards.length)}
        </Masonry>
        <br />
        <h3 className="page-title home-action"><Link to='/articles'>{`All articles`}<Arrow /></Link></h3>
        <h1 className="page-title"><Link to="/search">Filter</Link></h1>
        <AllTags />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query index { # Is there a better way to get the most recent one?
    issues: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1
      filter: { fields: { slug: { regex: "^/issues/" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            description
            date(formatString: "MMMM YYYY")
            title
          }
          fields {
            slug
            rel_cover {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
    articles: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 9
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
