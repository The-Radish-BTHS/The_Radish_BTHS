import React from "react"
import { Link } from "gatsby"
import "./Cards.css"

export default function Articard(props) {
  return (
    <div className="card">
      <Link to={props.slug}>
        <h1>{props.title}</h1>
        <p>{props.excerpt}</p>
      </Link>
    </div>
  )
}
