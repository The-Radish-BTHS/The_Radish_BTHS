import React from "react"
// import { Link } from "gatsby"
import "./Footer.css"
import Toggle from "../ToggleTheme/Toggle"

import {
  Instagram,
  Twitter,
  Github,
  // Discord,
  Email
} from "../Cards/Icons/index"

function SocialLink({ children, to }) {
  return (
    <a href={to} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

// const isBrowser = typeof window !== "undefined"

// Maybe we could make these staticimages instead
// https://www.gatsbyjs.com/docs/how-to/images-and-media/using-gatsby-plugin-image/#static-images
export default function Footer() {
  // if (isBrowser) {
  //   var theme = window.localStorage.getItem('theme')
  // }
  //
  // useEffect(() => {
  //     if (window.localStorage.getItem('theme') === 'theme-dark') {
  //         setTogClass('dark-theme')
  //     } else if (window.localStorage.getItem('theme') === 'theme-light') {
  //         setTogClass('light-theme')
  //     }
  // }, [theme, togClass, setTogClass])

  return (
    <footer className="footer">
      <div className="footerLinks">
        <SocialLink to="https://twitter.com/theradishbths">
          <Twitter />
        </SocialLink>
        <SocialLink to="https://www.instagram.com/theradishbths/">
          <Instagram />
        </SocialLink>
        <SocialLink to="mailto:theradishbths@gmail.com">
          <Email />
        </SocialLink>
        <SocialLink to="https://github.com/AwareErmine/The_Radish">
          <Github id="github" />
        </SocialLink>
      </div>
      <p className="copyright-note">Content on this site is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a></p>
      <Toggle />
    </footer>
  )
}
