import React from "react"
import { Link } from "gatsby"
import "./Navbar.css"

import Radamir from "./Radamir"

function CloseHamburger({ showSidebar, setShowSidebar }) {
  //checked is in the X position
  console.log(showSidebar)
  return (
    <div className="closeBurger">
      <label htmlFor="toggle" className="closeBurgerLabel">
        <input
          type="checkbox"
          id="toggle"
          defaultChecked={showSidebar}
          onClick={() => setShowSidebar(!showSidebar)}
          className="closeBurgerInput"
        ></input>
      </label>
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
      <Link to="/" id="name" className="NavbarHomeLink">
        <Radamir /> The Radish
      </Link>
      <Link to="/">A search bar here?</Link>
    </nav>
  )
}
