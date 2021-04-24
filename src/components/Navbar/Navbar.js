import React from "react"
import { Link } from "gatsby"
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav>
      <Link to="/">The Radish</Link>
      <Link to="/articles">articles</Link>
    </nav>
  )
}
