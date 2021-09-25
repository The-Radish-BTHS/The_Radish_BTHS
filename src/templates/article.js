import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

import Seo from "../components/Seo"
import website from '../../config/website'

import Share from "../components/Share/Share.js"
import { Articard } from "../components/Cards"
import { Arrow } from "../components/Cards/Icons"

const ValidSlug = (collection, name) => `/${collection}/${name.toLowerCase().replace(/[/|\\:*?"<>()]/g, '').replace(/ /g, "-")}`;

export default function Article({
  location,
  data, 
}) {
  const { article, issue_more, all_more } = data
  const { frontmatter, html, excerpt } = article

  return (
    <Layout>
      <Seo
        title={`${frontmatter.title} | ${website.titleAlt}`}
        pathname={location.pathname}
        desc={frontmatter.description ? frontmatter.description : excerpt}
        node={frontmatter}
        collection
      />

      <div className="page-content">
        <div className="page-title">
          <br />
          <br />
          <h1>{frontmatter.title}</h1>
          <p className="description">{frontmatter.description}</p>
          <h4>
            {frontmatter.authors && frontmatter.authors.length ?
              <>
                {`by `}
                {frontmatter.authors.map(({ author }, index) => {
                  return (
                    <div key={index} className="author">
                      {`${index === frontmatter.authors.length - 1 && frontmatter.authors.length !== 1 ? `and ` : ``}`}
                      <Link
                        to={ValidSlug("authors", author)}
                        className="color-under-link"
                      >
                        {`${author}`}
                      </Link>
                      {`${(index < frontmatter.authors.length - 1) && (frontmatter.authors.length !== 2) ? `, ` : ` `}`}
                    </div>
                  )
                })}
                {`for `}
              </>
              : null
            }
            <Link
              to={ValidSlug("issues", frontmatter.issue)}
              className="color-under-link"
            >
              {`${frontmatter.issue}`}
            </Link>
            {` • ${frontmatter.date}`}
        </h4>
        <p className="small-tags">
          {frontmatter.tags && frontmatter.tags.length ?
            <>
              {frontmatter.tags.map(({ tag }, index) => {
                return (
                  <Link
                    to={ValidSlug('tags', tag)}
                    key={index}
                    className="tag"
                  >
                    {`#${tag}`}
                  </Link>
                )
              })}
            </>
            : null
          }
        </p>
        <Share
          description={frontmatter.description}
          url={website.url + location.pathname}
        />

        <br />
        <br />
      </div>

      <div className="article">
        <article dangerouslySetInnerHTML={{ __html: html }} />
        <Share
          description={frontmatter.description}
          url={website.url + location.pathname}
        />
        <p className="small-tags">
          {frontmatter.tags && frontmatter.tags.length ?
            <>
              {`Tags: `}
              {frontmatter.tags.map(({ tag }, index) => {
                return (
                  <Link
                    to={ValidSlug('tags', tag)}
                    key={index}
                    className="tag"
                  >
                    {`#${tag}`}
                  </Link>
                )
              })}
            </>
            : null
          }
        </p>
      </div>
      <h2 className="page-title">
        {issue_more.edges.length ?
          <Link
            to={ValidSlug("issues", frontmatter.issue)}
            className="color-under-link"
          >
            {`More from ${frontmatter.issue}`}
          </Link>
          : null
        }
      </h2>
      <div className="card-grid">
        {issue_more.edges.map(({ node }) => {
          return (
            <Articard
              key={node.id}
              slug={node.fields.slug}
              title={node.frontmatter.title}
              excerpt={node.excerpt}
              tags={node.frontmatter.tags}
              authors={node.frontmatter.authors}
              description={node.frontmatter.description}
              date={node.frontmatter.date}
              issue={node.frontmatter.issue}
            />
          )
        })}
      </div>
      <h3 className="home-action">
        <Link to={ValidSlug("issues", frontmatter.issue)}>{frontmatter.issue}<Arrow /></Link>
      </h3>

      <h2 className="page-title">
        <Link to="/articles" className="color-under-link">More not this</Link>
      </h2>
      <div className="card-grid">
        {all_more.edges.map(({ node }) => {
          return (
            <Articard
              key={node.id}
              slug={node.fields.slug}
              title={node.frontmatter.title}
              excerpt={node.excerpt}
              tags={node.frontmatter.tags}
              authors={node.frontmatter.authors}
              description={node.frontmatter.description}
              date={node.frontmatter.date}
              issue={node.frontmatter.issue}
            />
          )
        })}
      </div>
      <h3 className="home-action"><Link to='/articles'>{`All articles`}<Arrow /></Link></h3>
    </div>
  </Layout>
  )
}

export const pageQuery = graphql`
  query article ($slug: String!, $issue: String!) {
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 100)
      frontmatter {
        title
        issue
        description
        date(formatString: "MMMM DD, YYYY")
        authors {
          author
        }
        tags {
          tag
        }
      }
    }
    issue_more: allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
      limit: 3
      filter: {frontmatter: { issue: {eq: $issue}}, fields: {slug: {regex: "^/articles/", ne: $slug}}}
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
    all_more: allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
      limit: 3
      filter: {frontmatter: { issue: {ne: $issue}}, fields: {slug: {regex: "^/articles/", ne: $slug}}}
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
