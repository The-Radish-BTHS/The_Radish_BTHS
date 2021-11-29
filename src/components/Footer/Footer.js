import React from "react"
import "./Footer.css"
import Toggle from "../ToggleTheme/Toggle"

import {
  Instagram,
  Twitter,
  Github,
  Email,
} from "../Cards/Icons/index"

function SocialLink({ children, to }) {
  return (
    <a href={to} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

export default function Footer() {
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
        <SocialLink to="https://github.com/The-Radish-BTHS/The_Radish_BTHS">
          <Github id="github" />
        </SocialLink>
      </div>
      <p className="copyright-note">Content on this site is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a></p>
      <center><Toggle /></center>
    </footer>
  )
}
