import React from "react"
import { Link } from "gatsby"
import "./Cards.css"

export default function Articard(props) {
  return (
    <div className="card">
      <Link to={props.slug}>
        <h4>{props.date}</h4>
        <h2>{props.title}</h2>
        <p>{props.excerpt}</p>
      </Link>
    </div>
  )
}
