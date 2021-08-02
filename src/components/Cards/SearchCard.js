import React from "react"
import { Link } from "gatsby"
import "./Cards.css"

export default function SearchCard(props) {
  const collection = props.slug.includes('/authors/') ? "author"
    : props.slug.includes('/issues/') ? "issue"
    : props.slug.includes('/articles/') ? "article"
    : "tag";

  return (
    <div className="card">
      <Link to={props.slug}>
        <h4>{props.date}</h4>
        <h2 className={collection}>{`${collection === "tag" ? "#" : ""}${props.title}`}</h2>
        <p>{props.excerpt ? props.excerpt : <i>{`the ${collection}`}</i>}</p>
      </Link>
    </div>
  )
}
