import React from "react"
// import { StaticImage } from "gatsby-plugin-image"
import "./Banner.css"

// https://dev.to/billraymond/creating-a-pure-responsive-css-grid-hero-image-or-banner-image-2pej
export default function Banner({ children, bg, header, txt }) {
  return (
    <section className="top-banner-section">
      <div>
        <img className="banner-image" src={bg} alt="Banner" />
      </div>
      <div className="banner-overlay-div"></div>
      <div className="banner-text-div">
        <span className="banner-text">
          <h1 className="banner-h1-text">{header}</h1>
          <h2 className="banner-body-text">{txt}</h2>
          <h2>{children}</h2>
        </span>
      </div>
    </section>
  )
}
