import React, {
  useEffect
} from "react"
import { Link } from "gatsby"
import "./Cards.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Arrow } from "./Icons/index"

const scrollContainer = typeof document !== `undefined` ? document.getElementById("preview-articles") : null

export default function HighlightIssueCard(props) {
  const image = getImage(props.cover)

  // Wheel horizontal scrolling
  const handleWheel = (evt) => {
    const innerWidth =  window.innerWidth;
    // When there's horizontal scrolling
    if (innerWidth <= 600) {
      const endOfContainer = (scrollContainer.scrollLeft !== (scrollContainer.scrollWidth - scrollContainer.offsetWidth))
      // if ((scrollContainer.scrollLeft === 0) && (evt.deltaY > 0)){
      //   console.log(evt.deltaY)
      // }
      if (endOfContainer || (evt.deltaY < 0)){
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
      }
    }
  }

  useEffect(() => {
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel)
      }
    }
  })

  return (
    <div className="issue-preview">
      <div className="card issue special">
        <Link to={props.slug}>
          <GatsbyImage
            image={image}
            alt={props.title}
            placeholder="blurred"
            loading="lazy"
            href={props.slug}
          />
        </Link>
        <div className="content">
          {
          // <h4>{props.date}</h4>
          }
          <Link to={props.slug}><h2>{props.title}</h2></Link>
          <p className="description" dangerouslySetInnerHTML={{ __html: props.description }} />
          <p className="read-it"><Link to={props.slug}>read it<Arrow /></Link></p>
        </div>
      </div>
      <div className="preview-articles" id="preview-articles">
        {props.articles}
      </div>
    </div>
  )
}
