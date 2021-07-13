import React from "react"
import { Link } from "gatsby"
import "./Navbar.css"

import Radamir from "./Radamir"

export default function Navbar() {
  return (
    <nav id="navbar">
      <Link to="/authors">Authors</Link>
      <Link to="/">
        <Radamir /> The Radish
      </Link>
      <Link to='/'>A search bar here?</Link>
    </nav>
  )
}
