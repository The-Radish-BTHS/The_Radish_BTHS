import React from "react"
import { Link } from "gatsby"
import "./Footer.css"

import {
  Instagram,
  Twitter,
  Github,
  // Discord,
  Email
} from "./socialsIcons/index"

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
        <SocialLink to="https://www.instagram.com/theradishbths/">
          <Instagram />
        </SocialLink>
        <SocialLink to="https://twitter.com/theradishbths">
          <Twitter />
        </SocialLink>
        <SocialLink to="https://github.com/AwareErmine/The_Radish">
          <Github id="github" />
        </SocialLink>
        <SocialLink to="mailto:theradishbths@gmail.com">
          <Email />
        </SocialLink>
      </div>
    </footer>
  )
}
