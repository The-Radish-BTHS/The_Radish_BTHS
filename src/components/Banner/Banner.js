import React from "react"
import "./Banner.css"

// https://dev.to/billraymond/creating-a-pure-responsive-css-grid-hero-image-or-banner-image-2pej
export default function Banner({ children, bg }) {
  return (
    <section className={`top-banner-section`}>
      <div>
        <img className="banner-image" src={bg} alt="Banner" />
      </div>
      <div className="banner-overlay-div"></div>
      <div className="banner-text-div">
        <span className="banner-text">
          <div>{children}</div>
        </span>
      </div>
    </section>
  )
}
