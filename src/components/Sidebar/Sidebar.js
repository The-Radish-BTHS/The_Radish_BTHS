import React from "react"
import { Link } from "gatsby"

import "./Sidebar.css"

export default function Sidebar({ showSidebar }) {
  const sidebarClassName = `sidebar ${!showSidebar ? "sidebarHidden" : ""}`
  return (
    <div className={sidebarClassName}>
      <Link to="/search">[ Search ]</Link>
      <Link to="/authors">Authors</Link>
      <Link to="/issues">Issues</Link>
    </div>
  )
}
