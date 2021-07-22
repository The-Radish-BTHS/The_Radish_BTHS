import React from "react"
import { Link } from "gatsby"
import "./Cards.css"

export default function Articard(props) {
  const date = new Date(props.date)
  const dateString = `${date.toLocaleString("default", {
    month: "short",
  })} ${date.getFullYear()}`
  return (
    <div className="card articleCard">
      <Link to={props.slug}>
        <h2>{props.title}</h2>
        <h5>{dateString}</h5>
        <p>{props.excerpt}</p>
      </Link>
    </div>
  )
}
