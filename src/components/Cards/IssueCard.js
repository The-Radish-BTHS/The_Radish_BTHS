import React from "react"
import { Link } from "gatsby"
import "./Cards.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Arrow } from "./Icons/index"

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
        <Link to={props.slug}><h2>{props.title}</h2></Link>
        <p className="description" dangerouslySetInnerHTML={{ __html: props.description }} />
        <p className="read-it"><Link to={props.slug}>read it<Arrow /></Link></p>
      </div>
    </div>
  )
}
