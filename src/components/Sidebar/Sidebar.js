import React from "react"
import { Link } from "gatsby"

import "./Sidebar.css"

export default function Sidebar({ showSidebar }) {
  // const handleResize = () => {
  //     const offset = window.scrollY;
  //     let navbar = document.getElementById("navbar");
  //     if(offset > navbar.offsetHeight ){
  //       setScrolled(true);
  //     }
  //     else{
  //       setScrolled(false);
  //     }
  //   }
  //
  // useEffect(() => {
  //   window.addEventListener('resize', handleResize)
  // })
  const sidebarClassName = `sidebar ${!showSidebar ? "sidebarHidden" : ""}`
  return (
    <div className={sidebarClassName}>
      <Link to="/search">Search</Link>
      <Link to="/authors">Authors</Link>
      <Link to="/issues">Issues</Link>
    </div>
  )
}
