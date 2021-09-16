import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

import { ParallaxBanner } from 'react-scroll-parallax';

export default function About({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const {
    // abouts,
    main
  } = data
  const { html} = main

  return (
    <Layout pageName="About">
      <ParallaxBanner
        className="parallax-banner"
        layers={[
            {
                image: "https://picsum.photos/id/292/3852/2556",
                amount: 0.3,
            },
            {
                children:
                  <div id='banner-children'>
                    <h1>We're The Radish</h1>
                    <h3>Jacob is presingden</h3>
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
        <div className="article">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query about {
    abouts: allMarkdownRemark(
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
    main: markdownRemark(fields: { slug: { eq: "/about/main/" } }) {
      html
    }
  }
`
