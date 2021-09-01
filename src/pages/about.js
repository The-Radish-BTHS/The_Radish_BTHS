import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

import { ParallaxBanner } from 'react-scroll-parallax';

export default function About({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { allMarkdownRemark } = data

  return (
    <Layout pageName="About">
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
                    <h1>Who are we</h1>
                    <h3>Good question</h3>
                  </div>
                ,
                amount: 0,
            }
        ]}
        style={{
            height: 'max(400px, 40vh)',
        }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query about {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
      limit: 1000
      filter: { fields: { slug: { regex: "^/about/" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
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