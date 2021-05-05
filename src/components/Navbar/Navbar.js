import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav id="navbar">
      <Link to="/">The Radish</Link>
    </nav>
  )
}
