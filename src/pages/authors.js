import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

import Seo from "../components/Seo"
import website from '../../config/website'

import { ParallaxBanner } from 'react-scroll-parallax';
// import Banner from "../components/Banner/Banner.js"
import { AuthorCard } from "../components/Cards/index"

// Infinite scrolling
import { GlobalStateContext } from "../components/InfiniteScroll/GlobalState.js"
import InfiniteGrid from "../components/InfiniteScroll/InfiniteGrid.js"

export default function Authors({
  location,
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { allMarkdownRemark } = data

  return (
    <Layout>
      {
      //   <Banner
      //   bg="/banner.jpg"
      //   header="Authors"
      //   txt="We exist"
      // >
      //   <h4>Also check out <Link to="/execs">the special ones</Link></h4>
      // </Banner>
      }
      <Seo
        title={`Authors | ${website.titleAlt}`}
        pathname={location.pathname}
        desc="Those owned by the great sky Radish"
      />

      <ParallaxBanner
        className="parallax-banner"
        layers={[
            {
                image: "https://picsum.photos/id/22/4434/3729",
                amount: 0.3,
            },
            {
                children:
                  <div id='banner-children'>
                    <h1>Authors</h1>
                    <h2>Also check out <Link to="/execs">the special ones</Link></h2>
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
          {g => <InfiniteGrid Card={AuthorCard} globalState={g} items={allMarkdownRemark} collection={"authors"} />}
        </GlobalStateContext.Consumer>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query authors {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
      limit: 1000
      filter: {fields: {slug: {regex: "^/authors/"}}}
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            position
            former
            date(formatString: "YYYY")
            description
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
