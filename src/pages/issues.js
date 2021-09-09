import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import { ParallaxBanner } from 'react-scroll-parallax';
// import Banner from "../components/Banner/Banner.js"
import { IssueCard } from "../components/Cards/index"

const breakpointColumnsObj = {
  default: 4,
  1500: 3,
  1000: 2,
  600: 1,
}

export default function Issues({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { issues } = data
  return (
    <Layout pageName="Issues">
      {
      // <Banner
      //   bg="/banner.jpg"
      //   header="We've got issues"
      //   txt="Now you've got 'em too"
      // />
      }

      <ParallaxBanner
        className="parallax-banner"
        layers={[
            {
                image: "/banner.jpg",
                amount: 0.3,
            },
            {
                children:
                  <div id='banner-children'>
                    <h1>We've got issues</h1>
                    <h2>Now you've got 'em too</h2>
                  </div>
                ,
                amount: 0,
            }
        ]}
        style={{
            height: 'max(400px, 50vh)',
        }}
      />

      <div className="page-content">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {issues.edges.map(({ node }) => {
            return (
              <IssueCard
                key={node.id}
                slug={node.fields.slug}
                date={node.frontmatter.date}
                title={node.frontmatter.title}
                cover={node.fields.rel_cover}
                description={node.frontmatter.description}
              />
            )
          })}
        </Masonry>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query issues {
    issues: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 20
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
  }
`
