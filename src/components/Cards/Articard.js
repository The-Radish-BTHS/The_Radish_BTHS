import React from "react"
import { Link } from "gatsby"
import "./Cards.css"

export default function Articard(props) {
  return (
    <div className="card">
      <Link to={props.slug}>
        <h2>{props.title}</h2>
        <p>{props.excerpt}</p>
      </Link>

      <div className="authors">
        {
          props.authors.map((author) => {
            return <div>{author.name}</div>
          })
        }
      </div>
    </div>
  )
}
