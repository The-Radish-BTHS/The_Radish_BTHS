import React from "react"
import { Link } from "gatsby"
import "./Cards.css"
import { EmployeeStamp } from "./Icons/index"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function AuthorCard(props) {
  const today = new Date()
  const grad = today.getMonth() > 6 && today.getFullYear() >= props.date

  const execs = [
    "President", "Vice President", "CEO (Chief Editing Officer)",
    "Secretary", "Treasurer", "Social Media Manager", "Graphics Organizer",
    "ur mom", "the cheese"
    ]
  const isExec = execs.includes(props.position);

  const image = props.cover ? getImage(props.cover) : null

  return (
    <div className={`card authorCard`}>
      <Link to={props.slug}>
        {image ?
          <GatsbyImage
            image={image}
            alt={props.title}
            placeholder="blurred"
            loading="lazy"
            href={props.slug}
          />
          : null
        }
        <div className="author-card-grid">
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
            <p className="description">{props.description}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
