import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import Articard from "../components/Cards/Articard.js"
import AuthorCard from "../components/Cards/AuthorCard.js"
import { EmployeeStamp } from "../components/Cards/Icons/index"
// import { useState } from "react"

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

// function ExecStampPopUp({ setPopUp, author, grad }) {
//   return (
//     <div className="EmployeeStampPopUp">
//       <EmployeeStamp size={250} />
//       <svg
//         fill="none"
//         height="24"
//         stroke="currentColor"
//         stroke-linecap="round"
//         stroke-linejoin="round"
//         stroke-width="2"
//         viewBox="0 0 24 24"
//         width="24"
//         xmlns="http://www.w3.org/2000/svg"
//         onClick={() => setPopUp(false)}
//         className="hoverPointer PopUpCloseButton"
//       >
//         <line x1="18" x2="6" y1="6" y2="18" />
//         <line x1="6" x2="18" y1="6" y2="18" />
//       </svg>
//       <h3>
//         This stamp indicates this author is (or was) an executive at The Radish.
//         [more stuff here?]
//       </h3>
//     </div>
//   )
// }

export default function Author({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { author, articles, authors } = data

  const today = new Date()
  const grad =
    today.getMonth() > 6 && today.getFullYear() >= author.frontmatter.date

  // const [popUp, setPopUp] = useState(true)

  const execs = [
    "President", "Vice President", "CEO (Chief Editing Officer)",
    "Secretary", "Treasurer", "Social Media Manager", "Graphics Organizer",
    "ur mom", "the cheese"
    ]

  return (
    <Layout pageName={author.frontmatter.title}>
      {/*popUp && (
        <ExecStampPopUp setPopUp={setPopUp} author={author} grad={grad} />
      )*/}
      <div className="page-content">
        <div className="page-title">
          {execs.includes(author.frontmatter.position) && (
            <EmployeeStamp />
          )}
          <h1>{author.frontmatter.title}</h1>
          <h3>
            <i>
              {(grad || author.frontmatter.former ? "former " : "") +
                author.frontmatter.position}
            </i>
          </h3>
          <h3>
            {grad
              ? "Graduated " + author.frontmatter.date
              : "Graduating " + author.frontmatter.date}
          </h3>
          <p className="description">{author.frontmatter.description}</p>
        </div>
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
                tags={node.frontmatter.tags}
                description={node.frontmatter.description}
                date={node.frontmatter.date}
                issue={node.frontmatter.issue}
                former={node.frontmatter.former}
                // authors={node.frontmatter.authors} // Might be redundant
              />
            )
          })}
        </Masonry>
        <h1 className="page-title">
          <Link to="/authors/">{`There are other people`}</Link>
        </h1>
        <div className="card-grid">
          {authors.edges.map(({ node }) => {
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
                // setPopUp={setPopUp}
              />
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query author($slug: String!, $title: String!) {
    author: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        date(formatString: "YYYY")
        title
        position
        description
        former
      }
    }
    articles: allMarkdownRemark(
      filter: {
        frontmatter: { authors: { elemMatch: { author: { eq: $title } } } }
      }
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
    authors: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 3
      filter: { fields: { slug: { regex: "^/authors/", ne: $slug } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            position
            date(formatString: "YYYY")
            description
            former
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
