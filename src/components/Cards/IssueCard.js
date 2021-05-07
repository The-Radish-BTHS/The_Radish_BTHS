import React from "react"
import { Link } from "gatsby"
import "./Cards.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
// import { StaticImage } from "gatsby-plugin-image"

export default function Articard(props) {
  const image = getImage(props.cover)

  console.log("--------------------cover--------------------")
  console.log(props.cover)
  console.log(image)
  console.log("--------------------cover--------------------")

  return (
    <div className="card">
      <GatsbyImage image={image} alt={props.title} />
      <Link to={props.slug}>
        <h2>{props.title}</h2>
        <p>{props.excerpt}</p>
      </Link>
    </div>
  )
}
