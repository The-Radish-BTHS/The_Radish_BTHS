import React from "react"
import { Link } from "gatsby"
import "./Cards.css"

const ValidSlug = (collection, name) => `/${collection}/${name.toLowerCase().replace(/[/|\\:*?"<>()]/g, '').replace(/ /g, "-")}`;

export default function Articard(props) {
  return (
    <div className="card">
      <Link to={props.slug}>
        <h2>{props.title}</h2>
        <p>{props.excerpt}</p>
      </Link>
      {props.authors ? props.authors.map(({ author }, index) => {
        return (
          <div className="authors">
            <Link
              to={ValidSlug("authors", author)}
              key={author}
              className="author"
            >
              {author}
            </Link>
          </div>
        )
      }) : ""}
      {props.tags ? props.tags.map(({ tag }, index) => {
        return (
          <div className="tags">
            <Link
              to={ValidSlug("tags", tag)}
              key={tag}
              className="tag"
            >
              {`#${tag}`}
            </Link>
          </div>
        )
      }) : ""}
    </div>
  )
}

// <h4>
//   {frontmatter.tags.map(({ tag }, index) => {
//     return (
//       <Link
//         to={ValidSlug('tags', tag)}
//         key={index}
//         className="tag"
//       >
//         {`#${tag}`}
//       </Link>
//     )
//   })}
// </h4>
