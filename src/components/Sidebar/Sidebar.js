import React from "react"
import { Link } from "gatsby"

import Footer from "../Footer/Footer"
import "./Sidebar.css"

export default function Sidebar({ showSidebar, setShowSidebar }) {
  const close = () => {
    const sidebar = document.getElementById("sidebar")
    sidebar.classList.add("slide-out")
    setTimeout(() => setShowSidebar(false), 300);
  }

  return (
    showSidebar ?
    <div id="sidebar">
      <div className={`sidebar slide-in ${showSidebar ? "" : "sidebarHidden"}`}>
        <Link to="/issues" className="sidebar-link">Issues</Link>
        <Link to="/articles" className="sidebar-link">Articles</Link>
        <Link to="/authors" className="sidebar-link">Authors</Link>
        <Link to="/execs" className="sidebar-link">Executives</Link>
        <Footer />
      </div>
      <div
        role="button"
        tabIndex={0}
        className={`${showSidebar ? "blur" : ""}`}
        onClick={close}
        onKeyDown={(ev) => ev.keyCode===13 ? close : ""}
      >
      </div>
    </div>
    : null
  )
}
