import React from "react"
// import { Link } from "gatsby"
import "./Footer.css"

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

// Maybe we could make these staticimages instead
// https://www.gatsbyjs.com/docs/how-to/images-and-media/using-gatsby-plugin-image/#static-images
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerLinks">
        { // Actually wait maybe we don't want a raid
          // <SocialLink to="https://discord.gg/MBw8T37">
          //   <Discord />
          // </SocialLink>
        }
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
    </footer>
  )
}
