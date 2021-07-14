import { Link } from "gatsby"
import React from "react"
import "./Footer.css"

import { Instagram, Twitter, Discord, Email } from "./socialsIcons/index"

function SocialLink({ children, to }) {
  return (
    <Link to={to} target="_blank">
      {children}
    </Link>
  )
}

export default function Footer({ showSidebar }) {
  return (
    <footer className={`footer ${!showSidebar && "footerAccountForSidebar"}`}>
      <h1>Does the email link work?</h1>
      <div className="footerSocialsLinks">
        <SocialLink to="https://discord.gg/MBw8T37">
          <Discord />
        </SocialLink>
        <SocialLink to="https://www.instagram.com/theradishbths/">
          <Instagram />
        </SocialLink>
        <SocialLink to="https://twitter.com/theradishbths">
          <Twitter />
        </SocialLink>
        <SocialLink to="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSKjRJcbBCXWqtmfthDsZxXkhPkJZCbscwKVhbZmHPQQLRgzmZpJrNzswVvmhgjbdKjwvmxJ">
          <Email />
        </SocialLink>
      </div>
    </footer>
  )
}
