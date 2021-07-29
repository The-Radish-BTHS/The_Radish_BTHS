import React from "react"
import "./Footer.css"

import {
  Instagram,
  Twitter,
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

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerSocialsLinks">
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
        <SocialLink to="mailto:theradishbths@gmail.com">
          <Email />
        </SocialLink>
      </div>
    </footer>
  )
}
