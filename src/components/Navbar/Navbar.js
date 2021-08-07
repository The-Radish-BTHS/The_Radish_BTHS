import React, { useState, useEffect } from "react"
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

export default function Navbar({ setShowSidebar, showSidebar, setShowModal, showModal }) {
  const [scrollPos, setScrollPos] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(false);

  const [showName, setShowName] = useState(true);

  const handleResize = () => {
      const innerWidth =  window.innerWidth;

      // Make name disappear if someone has a super tiny screen
      if (innerWidth <= 300) {
        setShowName(false)
      }
      else {
        setShowName(true)
      }
    }

    const handleScroll = () => {
        const offset = window.pageYOffset || document.documentElement.scrollTop;
        // If we were changing when the header detaches from the top
        // let navbar = document.getElementById("navbar");
        // if (offset > navbar.offsetHeight ){
        //   setScrolled(true);
        // }
        // else{
        //   setScrolled(false);
        // }

        // For some reason it only seems to work when we check for showSidebar in both statements??
        if (offset > scrollPos && !showSidebar) {
          setScrollingDown(true)
        }
        else if (offset < scrollPos || showSidebar) {
          setScrollingDown(false)
        }
        setScrollPos(offset <= 0 ? 0 : offset)
      }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
  })

  return (
    <nav className={`navbar ${scrollingDown ? "nobar" : ""}`}>
      <Hamburger
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />
      <Link to="/" id="name"><Radimir />{`${showName ? "The Radish" : ""}`}</Link>
      <div
        role="button"
        tabIndex={0}
        className=""
        onClick={() => {
          setShowModal(!showModal)
          setShowSidebar(false)
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
