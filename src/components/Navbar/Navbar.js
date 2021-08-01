import React from "react"
import { Link } from "gatsby"
import "./Navbar.css"

import Radimir from "./Radimir"

function Hamburger({ showSidebar, setShowSidebar }) {
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

// Use Radimir instead of name on small screens
export default function Navbar({ setShowSidebar, showSidebar }) {
  // Logic for making the navbar change on scroll (could make it shrink or smth)
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

  return (
    <nav className="navbar">
      <Hamburger
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />
      <Link to="/" id="name"><Radimir />The Radish</Link>
      {
        // <Link to="/search" id="nav-search">Search</Link>
      }
    </nav>
  )
}
