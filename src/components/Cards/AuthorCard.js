import React from "react"
import { Link } from "gatsby"
import "./Cards.css"
import EmployeeStamp from "./EmployeeStamp"

export default function AuthorCard(props) {
  const today = new Date()
  const grad = today.getMonth() > 6 && today.getFullYear() >= props.date
  const execs = ["Ur mom", "CEO (Chief Editing Officer)"]
  return (
    <div className="card">
      {execs.includes(props.position) && (
        <EmployeeStamp popUp={true} setPopUp={props.setPopUp} />
      )}

      <Link to={props.slug}>
        <h4>
          <i>{(grad || props.former ? "former " : "") + props.position}</i>
        </h4>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </Link>
    </div>
  )
}
