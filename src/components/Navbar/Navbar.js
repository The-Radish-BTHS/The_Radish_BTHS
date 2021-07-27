import React from "react"
import { Link } from "gatsby"
import "./Navbar.css"

import Radimir from "./Radimir"

function Hamburger({ showSidebar, setShowSidebar }) {
  //checked is in the X position
  // console.log(showSidebar)
  return (
    <div
      role="button"
      tabIndex={0}
      className="burger"
      onClick={() => setShowSidebar(!showSidebar)}
      onKeyDown={(ev) => ev.keyCode===13 ? setShowSidebar(!showSidebar) : ""}
    >
      <div className={`${showSidebar ? "closed" : ""}`} />
      <div className={`${showSidebar ? "closed" : ""}`} />
      <div className={`${showSidebar ? "closed" : ""}`} />
    </div>
  )
}

export default function Navbar({ setShowSidebar, showSidebar }) {
  return (
    <nav id="navbar">
      <Hamburger
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />
      <Link to="/authors">Authors</Link>
      <Link to="/" id="name" className="NavbarHomeLink"><Radimir />The Radish</Link>
      <Link to="/">?</Link>
    </nav>
  )
}
