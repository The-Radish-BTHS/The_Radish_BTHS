import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
// import Masonry from "react-masonry-css"

import { ParallaxBanner } from 'react-scroll-parallax';
// import Banner from "../components/Banner/Banner.js"
// import { Articard } from "../components/Cards/index"

// Infinite scrolling
import { GlobalStateContext } from "../components/InfiniteScroll/GlobalState.js"
// import { InfiniteScroll } from "../components/InfiniteScroll/InfiniteScroll.tsx"
import InfiniteGrid from "../components/InfiniteScroll/InfiniteGrid.js"

// const breakpointColumnsObj = {
//   default: 3,
//   1300: 2,
//   600: 1,
// }

// const Shuffle = (arr) => {
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * i)
//     const temp = arr[i]
//     arr[i] = arr[j]
//     arr[j] = temp
//   }
//   return (arr)
// }

export default function Articles({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { articles } = data
  return (
    <Layout pageName="Allticles">
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
          {g => <InfiniteGrid globalState={g} items={articles} />}
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
