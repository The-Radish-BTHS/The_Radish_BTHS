import React, { useState, useEffect, useImperativeHandle, forwardRef, useCallback } from "react"
import { createPortal } from 'react-dom'
import { useStaticQuery, graphql, Link } from "gatsby"
import { useFlexSearch } from 'react-use-flexsearch';

import { Hamburger } from "../Navbar/Navbar.js"
import SearchBar from "../SearchBar/SearchBar.js"
import SearchCard from "../Cards/SearchCard.js"
import "./Sidebar.css"

const portalRoot = typeof document !== `undefined` ? document.getElementById('portal') : null

export function Sidebar({ showSidebar, setShowSidebar }, ref) {
  // Search --------------------------------------------------------------------
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

  // Handle modal things -------------------------------------------------------
  const close = useCallback(() => setShowSidebar(false), [])
  useImperativeHandle(ref, () => ({
    open: () => setShowSidebar(true),
    close
  }), [close])

  const handleEscape = useCallback(event => {
    if (event.keyCode === 27) close()
  }, [close])

  useEffect(() => {
    if (showSidebar) document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, showSidebar])

  /* Would slide in the thing */
  /* https://stackoverflow.com/questions/40463173/swipe-effect-in-react-js */

  // const sidebarClassName = `sidebar ${!showSidebar ? "sidebarHidden" : ""}`

  console.log(portalRoot);
  return portalRoot ? createPortal(
    showSidebar ? (
    <>
      <Hamburger
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
        isSidebar={true}
      />
      <div className="sidebar">
        <SearchBar
          searchQuery={sidebarSearchQuery}
          setSearchQuery={setSidebarSearchQuery}
        />
        <div className="side-cards">
          {results.slice(0, 3).map(result =>
            <SearchCard
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
      <div
        role="button"
        tabIndex={0}
        className={`${showSidebar ? "blur" : ""}`}
        onClick={() => setShowSidebar(!showSidebar)}
        onKeyDown={(ev) => ev.keyCode===13 ? setShowSidebar(!showSidebar) : ""}
      >
      </div>
    </>
    ) : null,
    portalRoot
  ) : null
}

export default forwardRef(Sidebar)
