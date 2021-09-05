import React from "react"
import { Link } from "gatsby"
import "./Cards.css"

const ValidSlug = (collection, name) => `/${collection}/${name.toLowerCase().replace(/[/|\\:*?"<>()]/g, '').replace(/ /g, "-")}`;

export default function Articard(props) {
  return (
    <div className="card">
      <Link to={props.slug}>
        {
          // props.date ? <h4>{props.date}</h4> : null
        }
        <h2>{props.title}</h2>
        <p className="description">{props.description ? props.description : props.excerpt}</p>
      </Link>
      <div className="tags">
        {props.issue ? <Link to={ValidSlug("issues", props.issue)} className="issue-tag">{props.issue}</Link> : null}
        {props.authors ? props.authors.map(({ author }, index) => {
          return (
            <Link
              to={ValidSlug("authors", author)}
              className="author"
              key={`${author}#${index}`}
            >
              {author}
            </Link>
          )
        }) : null}
        {props.tags ? props.tags.map(({ tag }, index) => {
          return (
            <Link
              to={ValidSlug("tags", tag)}
              className="tag"
              key={`${tag}#${index}`}
            >
              {`#${tag}`}
            </Link>
          )
        }) : null}
      </div>
    </div>
  )
}
