import React from "react"
import { Link } from "gatsby"

import "./Sidebar.css"

export default function Sidebar({ showSidebar, setShowSidebar }) {
  return (
    <>
      <div className={`sidebar ${showSidebar ? "" : "sidebarHidden"}`}>
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
  )
}
