import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import "./Navbar.css"

import {
  Search,
  Radimir
} from "../Cards/Icons/index"

export function Hamburger({ showSidebar, setShowSidebar }) {
  const lineClass = !showSidebar ? "" : "closed";

  const toggle = () => {
    const sidebar = document.getElementById("sidebar")
    // const burger = document.getElementById("burger").children
    // if (burger) {
    //   for (let i = 0; i <= burger.length - 1; i++) {
    //     burger[i].classList.add("closed")
    //   }
    // }
    if (sidebar) {
      sidebar.classList.add("slide-out")
    }
    setTimeout(() => setShowSidebar(!showSidebar), 300)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className="burger"
      // id="burger"
      onClick={toggle}
      onKeyDown={(ev) => ev.keyCode===13 ? toggle() : ""}
    >
      <div className={lineClass} />
      <div className={lineClass} />
      <div className={lineClass} />
    </div>
  )
}

const calcShowName = () => {
  const isBrowser = typeof window !== "undefined"
  return (isBrowser ? !(window.innerWidth <= 300) : true)
}

export default function Navbar({ setShowSidebar, showSidebar, setShowModal, showModal }) {
  const [scrollPos, setScrollPos] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(false);

  const [showName, setShowName] = useState(calcShowName());

  const handleResize = () => {
    setShowName(calcShowName())
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
      if (offset > scrollPos && !showSidebar && !showModal) {
        setScrollingDown(true)
      }
      else if (offset < scrollPos || showSidebar || showModal) {
        setScrollingDown(false)
      }
      setScrollPos(offset <= 0 ? 0 : offset)
    }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('resize', handleResize)
      document.removeEventListener('scroll', handleScroll)
    }
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
