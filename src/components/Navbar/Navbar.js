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
        defaultChecked={!showSidebar}
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
      <Link to="/authors">Authors</Link>
      <Link to="/" id="name">
        <Radamir /> The Radish
      </Link>
      <Link to="/">A search bar here?</Link>
    </nav>
  )
}
