import React, { useState } from "react"
import { graphql } from 'gatsby';
import "./pages.css"
import { useFlexSearch } from 'react-use-flexsearch';

import SearchBar from "../components/SearchBar/SearchBar.js"
import Layout from "../components/Layout"
import Articard from "../components/Cards/Articard.js"

// Helpful: https://www.emgoto.com/gatsby-search/
export default function Search({
  data : {
    localSearchPages: { index, store },
    allMarkdownRemark: { nodes },
  },
}) {
  const isBrowser = typeof window !== "undefined"; // SSR error
  const { search } = isBrowser ? window.location : '';
  const query = search ? new URLSearchParams(search).get('s') : '';

  const [searchQuery, setSearchQuery] = useState(query || '');

  // could try using posts instead of results but...
  // const posts = searchQuery ? results : nodes // Might have weird behavior I don't wanna deal with rn
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
      <div className="card-grid">
        {results.map(result =>
          <Articard
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
    allMarkdownRemark( # We can default to just returning articles
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
            authors {
              author
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
