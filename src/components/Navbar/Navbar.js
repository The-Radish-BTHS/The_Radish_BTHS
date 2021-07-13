import React from "react"
import { Link } from "gatsby"
import "./Navbar.css"

import Radamir from "./Radamir"

function CloseHamburger({ showSidebar, setShowSidebar }) {
  return (
    <div className="closeBurger">
      <input
        type="checkbox"
        id="toggle"
        checked={showSidebar}
        onClick={() => setShowSidebar(!showSidebar)}
      ></input>
      <label htmlFor="toggle" />
    </div>
  )
}

export default function Navbar({ setShowSidebar, showSidebar }) {
  return (
    <nav id="navbar">
      <CloseHamburger
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />
      <Link to="/">
        <Radamir /> The Radish
      </Link>
    </nav>
  )
}
