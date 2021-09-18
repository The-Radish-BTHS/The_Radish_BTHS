import React from "react"
import { Link } from "gatsby"
import "./Cards.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function IssueCard(props) {
  const image = getImage(props.cover)
  return (
    <div className={`card issue ${props.cover ? "" : "make-up-for-no-image"}`}>
      <Link to={props.slug}>
        <GatsbyImage
          image={image}
          alt={props.title}
          placeholder="blurred"
          loading="lazy"
          href={props.slug}
        />
      </Link>
      <div className="content">
        {
        // <h4>{props.date}</h4>
        }
        <Link to={props.slug}>
          <h2>{props.title}</h2>
          <p className="description" dangerouslySetInnerHTML={{ __html: props.description }} />
        </Link>
      </div>
    </div>
  )
}
