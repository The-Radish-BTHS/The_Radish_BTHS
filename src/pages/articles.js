import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

import Seo from "../components/Seo"
import website from '../../config/website'

import { ParallaxBanner } from 'react-scroll-parallax';
import { Articard } from "../components/Cards/index"

import { GlobalStateContext } from "../components/InfiniteScroll/GlobalState.js"
import InfiniteGrid from "../components/InfiniteScroll/InfiniteGrid.js"

export default function Articles({
  location,
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { articles } = data
  return (
    <Layout>
      <Seo
        title={`Articles | ${website.titleAlt}`}
        pathname={location.pathname}
        desc="All articles made by BTHS's first and worst club"
      />

      <ParallaxBanner
        className="parallax-banner"
        layers={[
            {
                image: "https://picsum.photos/id/1073/5472/3648",
                amount: 0.3,
            },
            {
                children:
                  <div id='banner-children'>
                    <h1>Allticles</h1>
                    <h2>All the articles</h2>
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
          {g => <InfiniteGrid Card={Articard} globalState={g} items={articles} collection={"articles"} />}
        </GlobalStateContext.Consumer>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query articles {
    articles: allMarkdownRemark(
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
