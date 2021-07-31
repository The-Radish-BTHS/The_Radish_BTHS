import React from "react"
import { Link } from "gatsby"
import "./Cards.css"

export default function AuthorCard(props) {
  return (
    <div className="card">
      <Link to={props.slug}>
        <h2>{props.title}</h2>
        <h4><i>{props.position}</i></h4>
      </Link>
    </div>
  )
}
