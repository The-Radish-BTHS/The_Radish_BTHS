import React from "react"
import { Link } from "gatsby"
import "./Cards.css"

export default function AuthorCard(props) {
  const today = new Date()
  const grad =
    today.getMonth() > 6 && today.getFullYear() >= props.date
  return (
    <div className="card">
      <Link to={props.slug}>
        <h4>
          <i>{(grad ? "former " : "") + props.position}</i>
        </h4>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </Link>
    </div>
  )
}
