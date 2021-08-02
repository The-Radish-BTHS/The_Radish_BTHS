import React, { useState } from "react"
import { graphql, Link } from 'gatsby';
import "./pages.css"
import { useFlexSearch } from 'react-use-flexsearch';

import SearchBar from "../components/SearchBar/SearchBar.js"
import Layout from "../components/Layout"
import SearchCard from "../components/Cards/SearchCard.js"

// Helpful: https://www.emgoto.com/gatsby-search/
export default function Search({
  data : {
    localSearchPages: { index, store },
    allMarkdownRemark: { edges },
  },
}) {
  const isBrowser = typeof window !== "undefined"; // SSR error
  const { search } = isBrowser ? window.location : '';
  const query = search ? new URLSearchParams(search).get('s') : '';
  const [searchQuery, setSearchQuery] = useState(query || '');
  const results = useFlexSearch(searchQuery, index, store);

  return (
    <Layout>
      <div className="page-title">
        <h1>Search for your heart's desire.</h1>
        <h2>Or Radish articles.</h2>
      </div>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="tags">
        {edges.map(({ node }) =>
          <Link
            to={node.fields.slug}
            key={node.id}
            className="tag"
          >
            {`#${node.frontmatter.title}`}
          </Link>
        )}
      </div>
      <div className="card-grid">
        {results.map(result =>
          <SearchCard
            key={result.id}
            slug={result.slug}
            title={result.title}
            excerpt={result.excerpt}
            date={result.date}
          />
        )}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Searching {
    localSearchPages {
      index
      store
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
      filter: { fields: { slug: { regex: "^/tags/" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
