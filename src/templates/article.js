import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

import { Articard } from "../components/Cards/index"
import { Copy } from "../components/Cards/Icons/index"

const ValidSlug = (collection, name) => `/${collection}/${name.toLowerCase().replace(/[/|\\:*?"<>()]/g, '').replace(/ /g, "-")}`;

export default function Article({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { article, issue_more, all_more } = data
  const { frontmatter, html} = article

  // const isBrowser = typeof window !== "undefined"
  //
  // if (isBrowser) {
  //   // https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites
  //   window.twttr = (function(d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0],
  //       t = window.twttr || {};
  //     if (d.getElementById(id)) return t;
  //     js = d.createElement(s);
  //     js.id = id;
  //     js.src = "https://platform.twitter.com/widgets.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //
  //     t._e = [];
  //     t.ready = function(f) {
  //       t._e.push(f);
  //     };
  //
  //     return t;
  //   }(document, "script", "twitter-wjs"))
  // }

  return (
    <Layout pageName={frontmatter.title}>
      <div className="page-title">
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.description}</p>
        <h4>
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
      <div className="share-btns">
        <a
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=${
            frontmatter.description ? frontmatter.description.replace(/ /g, "%20")
              : "Hey guys check out this wacky new radish article! I think it's quite swell.".replace(/ /g, "%20")
          }`}
        >
          Tweet
        </a>
        <button className="copy-link-btn" onClick={() => navigator.clipboard.writeText(window.location.href)}><Copy />Copy</button>
      </div>
    </div>
    <div className="article">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <h4>
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
      </h4>
      <h2>
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
    </div>
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
    <h2><Link to="/articles" className="color-under-link">More not this</Link></h2>
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
  </Layout>
  )
}

export const pageQuery = graphql`
  query article ($slug: String!, $issue: String!) {
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
