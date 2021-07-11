import React from "react"
import { Link } from "gatsby"
import "./Cards.css"

export default function Articard(props) {
  return (
    <div className="card articleCard">
      <Link to={props.slug}>
        <h2>{props.title}</h2>
        <p>{props.excerpt}</p>
      </Link>
    </div>
  )
}
