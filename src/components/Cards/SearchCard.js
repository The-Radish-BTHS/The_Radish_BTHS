import React from "react"
import { Link } from "gatsby"
import "./Cards.css"

export default function SearchCard(props) {
  const collection = props.slug.includes('/authors/') ? "Author"
    : props.slug.includes('/issues/') ? "Issue"
    : props.slug.includes('/articles/') ? "Article"
    : "tag";
  return (
    <div className="card">
      <Link to={props.slug}>
        <h4>{collection === "author" ? `Graduating ${props.date.slice(-4)}` : props.date}</h4>
        <h2 className={collection}>{`${collection === "tag" ? "#" : ""}${props.title}`}</h2>
        <p className="description">{props.description ? props.description : props.excerpt}</p>
        <p className="collection-tag">{`${collection}`}</p>
      </Link>
    </div>
  )
}
