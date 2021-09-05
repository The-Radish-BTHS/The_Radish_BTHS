import React, { useState, useEffect } from "react"
import "./Share.css"

import { Copy, Twitter, Check } from "../Cards/Icons/index"

export default function Share({ description, url }) {
  // site.siteMetadata.mainUrlNameChangedBcFckGatsby + location.pathname
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsCopied(false), 5000)
  }, [isCopied, setIsCopied])

  return (
    <div className="share-btns">
      <a
        className="share-link-btn"
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/intent/tweet?text=${
          description ? description.replace(/ /g, "%20")
            : "Hey guys check out this wacky new radish! I think it's rather swell.".replace(/ /g, "%20")
        }%0A${ url }`}
      >
        <Twitter />
        Tweet
      </a>

      <button
        className={`share-link-btn ${isCopied ? "copied" : ""}`}
        onClick={() => {
          navigator.clipboard.writeText(url)
          setIsCopied(true)
        }}
      >
        {isCopied ? <Check /> : <Copy /> }{`${isCopied ? 'Link copied!' : 'Copy link'}`}
      </button>
    </div>
  )
}
