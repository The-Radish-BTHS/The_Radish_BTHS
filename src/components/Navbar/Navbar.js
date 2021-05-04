import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import "./Navbar.css"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
      const offset = window.scrollY;
      let navbar = document.getElementById("navbar");
      if(offset > navbar.offsetHeight ){
        setScrolled(true);
      }
      else{
        setScrolled(false);
      }
    }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })

  let navbarClasses = scrolled ? 'sticky' : '';

  return (
    <nav id="navbar" className={ navbarClasses }>
      <Link to="/">The Radish</Link>
    </nav>
  )
}
