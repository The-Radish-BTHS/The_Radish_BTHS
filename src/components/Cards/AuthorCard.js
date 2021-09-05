import React from "react"
import { Link } from "gatsby"
import "./Cards.css"
import { EmployeeStamp } from "./Icons/index"

export default function AuthorCard(props) {
  const today = new Date()
  const grad = today.getMonth() > 6 && today.getFullYear() >= props.date

  const execs = [
    "President", "Vice President", "CEO (Chief Editing Officer)",
    "Secretary", "Treasurer", "Social Media Manager", "Graphics Organizer",
    "ur mom", "the cheese"
    ]
  const isExec = execs.includes(props.position);

  return (
    <div className={`card authorCard`}>
      <Link to={props.slug}>
        {
          isExec && (
          <EmployeeStamp former={props.former} id={props.id} />
        )
        }
        <div className="author-card-text">
          <h4>
            <i>{(grad || props.former ? "former " : "") + props.position}</i>
          </h4>
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
      </Link>
    </div>
  )
}
