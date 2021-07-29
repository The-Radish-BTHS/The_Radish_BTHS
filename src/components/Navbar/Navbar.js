import React from "react"
import { Link } from "gatsby"
import "./Navbar.css"

// import Radimir from "./Radimir"

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

// <Radimir /> // Use Radimir instead of name on small screens

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
    <nav id="navbar">
      <Hamburger
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />
      <Link to="/authors">Authors</Link>
      <Link to="/" id="name" className="NavbarHomeLink">The Radish</Link>
      <Link to="/search">Search</Link>
    </nav>
  )
}
