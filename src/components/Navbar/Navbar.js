import React from "react"
import { Link } from "gatsby"
import "./Navbar.css"

import {
  Search,
  Radimir
} from "./NavIcons/index"

export function Hamburger({ showSidebar, setShowSidebar }) {
  const lineClass = !showSidebar ? "" : "closed";
  return (
    <div
      role="button"
      tabIndex={0}
      className="burger"
      onClick={() => setShowSidebar(!showSidebar)}
      onKeyDown={(ev) => ev.keyCode===13 ? setShowSidebar(!showSidebar) : ""}
    >
      <div className={lineClass} />
      <div className={lineClass} />
      <div className={lineClass} />
    </div>
  )
}

// Use Radimir instead of name on small screens
export default function Navbar({ setShowSidebar, showSidebar, setShowModal, showModal }) {
  // Logic for making the navbar change on scroll
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
      <div
        role="button"
        tabIndex={0}
        className=""
        onClick={() => {
          setShowModal(!showModal)
          setShowSidebar(!showSidebar)
        }}
        onKeyDown={(ev) => ev.keyCode===13 ? setShowModal(!showModal) : ""}
      >
        <Search />
      </div>
      {
        // <Link to="/search" id="nav-search">Search</Link>
      }
    </nav>
  )
}
