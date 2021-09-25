import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import Seo from "../components/Seo"
import website from '../../config/website'

import { ParallaxBanner } from 'react-scroll-parallax';
// import Banner from "../components/Banner/Banner.js"
import { AuthorCard } from "../components/Cards/index"

const breakpointColumnsObj = {
  default: 3,
  1300: 2,
  600: 1,
}

export default function Authors({
  location,
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { allMarkdownRemark } = data

  return (
    <Layout pageName="Execs">
      {
      // <Banner
      //   bg="/banner.jpg"
      //   header="The Hall Of Execs"
      // >
      //   Holier than <Link to="/authors">thou</Link>
      // </Banner>
      }
      <Seo
        title={`Execs | ${website.titleAlt}`}
        pathname={location.pathname}
        desc="Our holy leaders (and those lost)"
      />

      <ParallaxBanner
        className="parallax-banner"
        layers={[
            {
                image: "/meet-the-execs.png",
                amount: 0.3,
            },
            {
                children:
                  <div id='banner-children'>
                    <h1>The Hall of Execs</h1>
                    <h2>Holier than <Link to="/authors">thou</Link></h2>
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
          {
            allMarkdownRemark.edges.map(({ node }) => {
              return (
                <AuthorCard
                  key={node.id}
                  id={node.id}
                  slug={node.fields.slug}
                  title={node.frontmatter.title}
                  position={node.frontmatter.position}
                  date={node.frontmatter.date}
                  description={node.frontmatter.description}
                  former={node.frontmatter.former}
                  cover={node.fields.rel_cover}
                />
              )
            })
          }
        </Masonry>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query execs {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
      limit: 1000
      filter: {fields: {slug: {regex: "^/authors/"}}, frontmatter: {position: {in:
        [
          "President", "Vice President", "CEO (Chief Editing Officer)",
          "Secretary", "Treasurer", "Social Media Manager", "Graphics Organizer",
          "ur mom", "the cheese"
        ]
      }}}
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
