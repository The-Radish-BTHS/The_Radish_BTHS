import React, { useState } from "react"
import { graphql } from 'gatsby';
import Layout from "../components/Layout"
import Masonry from "react-masonry-css"

import { useFlexSearch } from 'react-use-flexsearch';
import SearchBar from "../components/SearchBar/SearchBar.js"
import { SearchCard } from "../components/Cards/index"
import AllTags from "../components/AllTags/AllTags.js"

const breakpointColumnsObj = {
  default: 3,
  1300: 2,
  600: 1,
}

// Helpful: https://www.emgoto.com/gatsby-search/
export default function Search({
  data : {
    localSearchPages: { index, store },
  },
}) {
  const isBrowser = typeof window !== "undefined"; // SSR error
  const { search } = isBrowser ? window.location : '';
  const query = search ? new URLSearchParams(search).get('s') : '';
  const [searchQuery, setSearchQuery] = useState(query || '');
  const results = useFlexSearch(searchQuery, index, store);

  return (
    <Layout pageName="Search">
      <div className="page-content">
        <div className="page-title">
          <br />
          <br />
          <h1>Search for your heart's desire.</h1>
          <h2>Or Radish articles.</h2>
          <SearchBar
            // searchQuery={searchQuery}
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
          <AllTags />
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
  }
`
