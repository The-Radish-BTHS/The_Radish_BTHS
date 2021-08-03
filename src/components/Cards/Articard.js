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
