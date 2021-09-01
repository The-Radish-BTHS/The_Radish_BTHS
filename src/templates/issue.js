import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

// import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Articard from "../components/Cards/Articard.js"
import IssueCard from "../components/Cards/IssueCard.js"
import Banner from "../components/Banner/Banner.js"

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

export default function Issue({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { issue, articles, more } = data

  // const image = getImage(issue.fields.rel_cover)

  return (
    <Layout pageName={issue.frontmatter.title}>
      {
      // <div className="page-title">
      //   <h1>{issue.frontmatter.title}</h1>
      //   <h3>{issue.frontmatter.date}</h3>
      //   <p>{issue.frontmatter.description}</p>
      //   <a
      //     href={issue.frontmatter.pdf}
      //     target="_blank"
      //     rel="noreferrer"
      //     className="color-under-link"
      //   >
      //     <b>Read the PDF</b>
      //   </a>
      //   <p />
      //   <div className="cover-container">
      //     <div className="cover">
      //       <GatsbyImage
      //         image={image}
      //         alt={issue.frontmatter.title}
      //         placeholder="blurred"
      //       />
      //     </div>
      //   </div>
      // </div>
      }
      <Banner
        bg={issue.frontmatter.cover}
      >
        <h1>{issue.frontmatter.title}</h1>
        <h3>{issue.frontmatter.date}</h3>
        <a
          href={issue.frontmatter.pdf}
          target="_blank"
          rel="noreferrer"
        >
          <b>Read the PDF</b>
        </a>
      </Banner>
      <div className="page-title issue-description">
        <p>{issue.frontmatter.description}</p>
      </div>
      <p />
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
            />
          )
        })}
      </Masonry>
      <h1 className="page-title">
        <Link to="/issues/">{`More issues`}</Link>
      </h1>
      <div className="card-grid">
        {more.edges.map(({ node }) => {
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
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query issue($slug: String!, $title: String!) {
    issue: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        description
        date(formatString: "MMMM YYYY")
        title
        pdf
        cover
      }
      #fields {
      #  rel_cover {
      #    childImageSharp {
      #      gatsbyImageData(placeholder: BLURRED)
      #    }
      #  }
      #}
    }
    articles: allMarkdownRemark(
      filter: {
        frontmatter: { issue: { eq: $title } }
        fields: { slug: { regex: "^/articles/" } }
      }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          frontmatter {
            title
            description
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
    more: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 3
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
