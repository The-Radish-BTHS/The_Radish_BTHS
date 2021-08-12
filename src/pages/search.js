import React, { useState } from "react"
import { graphql, Link } from 'gatsby';
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import { useFlexSearch } from 'react-use-flexsearch';
import SearchBar from "../components/SearchBar/SearchBar.js"
import SearchCard from "../components/Cards/SearchCard.js"

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1,
}

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
    <Layout pageName="Search">
      <div className="page-title">
        <h1>Search for your heart's desire.</h1>
        <h2>Or Radish articles.</h2>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {searchQuery && !results.length ? <h3>No results for <span className="query">{searchQuery}</span></h3>
          : null
        }
        {searchQuery && results.length ? <h1>Results for <span className="query">{searchQuery}</span>:</h1>
          : null
        }
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {results.map(result =>
          <SearchCard
            key={result.id}
            slug={result.slug}
            title={result.title}
            excerpt={result.excerpt}
            date={result.date}
            description={result.description}
          />
        )}
      </Masonry>
      <div className="page-title">
        <h1>Filter by tag:</h1>
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
