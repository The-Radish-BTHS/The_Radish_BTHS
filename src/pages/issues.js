import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

import { ParallaxBanner } from 'react-scroll-parallax';
import { IssueCard } from "../components/Cards/index"

// Infinite scrolling
import { GlobalStateContext } from "../components/InfiniteScroll/GlobalState.js"
import InfiniteGrid from "../components/InfiniteScroll/InfiniteGrid.js"

export default function Issues({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { issues } = data
  return (
    <Layout pageName="Issues">
      <ParallaxBanner
        className="parallax-banner"
        layers={[
            {
                image: "/pug_banner.png",
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
        <GlobalStateContext.Consumer>
          {g => <InfiniteGrid Card={IssueCard} globalState={g} items={issues} collection={"issues"} />}
        </GlobalStateContext.Consumer>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query issues {
    issues: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
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
