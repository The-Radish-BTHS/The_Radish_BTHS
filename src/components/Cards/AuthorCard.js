import React from "react"
import { Link } from "gatsby"
import "./Cards.css"

export default function AuthorCard(props) {
  return (
    <div className="card articleCard">
      <Link to={props.slug}>
        <h2>{props.title}</h2>
        <h2>{props.position}</h2>
      </Link>
    </div>
  )
}
