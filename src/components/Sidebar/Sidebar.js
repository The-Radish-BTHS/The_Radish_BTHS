import React from "react"
import { Link } from "gatsby"

import "./Sidebar.css"

export default function Sidebar({ showSidebar }) {
  const sidebarClassName = `sidebar ${!showSidebar ? "sidebarHidden" : ""}`
  return (
    <div className={sidebarClassName}>
      <Link to="/search" className="sidebar-link">[ Search ]</Link>
      <Link to="/authors" className="sidebar-link">Authors</Link>
      <Link to="/issues" className="sidebar-link">Issues</Link>
      <Link to="/articles" className="sidebar-link">Articles</Link>
    </div>
  )
}
