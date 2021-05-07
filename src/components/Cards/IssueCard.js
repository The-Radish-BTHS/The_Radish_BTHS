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
      <Link to={props.slug}>
        <GatsbyImage
          image={image}
          alt={props.title}
          placeholder="blurred"
        />
        <h2>{props.title}</h2>
        <p>{props.excerpt}</p>
      </Link>
    </div>
  )
}
