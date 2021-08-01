import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { useFlexSearch } from 'react-use-flexsearch';

import SearchBar from "../SearchBar/SearchBar.js"
import Articard from "../Cards/Articard.js"
import "./Sidebar.css"

export default function Sidebar({ showSidebar }) {
  const data = useStaticQuery(graphql`
    query SearchIndexes {
      localSearchPages {
        index
        store
      }
    }
  `)
  const { localSearchPages } = data;
  const { index, store } = localSearchPages;

  const isBrowser = typeof window !== "undefined"; // SSR error
  const { search } = isBrowser ? window.location : '';
  const query = search ? new URLSearchParams(search).get('s') : '';
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState(query || '');
  const results = useFlexSearch(sidebarSearchQuery, index, store);

  const sidebarClassName = `sidebar ${!showSidebar ? "sidebarHidden" : ""}`
  return (
    <div className={sidebarClassName}>
      <SearchBar
        searchQuery={sidebarSearchQuery}
        setSearchQuery={setSidebarSearchQuery}
      />
      <div className="side-cards">
        {results.slice(0, 3).map(result =>
          <Articard
            key={result.id}
            slug={result.slug}
            title={result.title}
            excerpt={result.excerpt}
            date={result.date}
          />
        )}
        {results.length ? <button type="submit" form="search-form">More 🠖</button> : ""}
      </div>
      <Link to="/issues" className="sidebar-link">Issues</Link>
      <Link to="/articles" className="sidebar-link">Articles</Link>
      <Link to="/authors" className="sidebar-link">Authors</Link>
    </div>
  )
}
