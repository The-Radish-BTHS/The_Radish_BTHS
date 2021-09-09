import React from "react"
import { Link } from "gatsby"

import { Arrow } from "../components/Cards/Icons/index"
import Layout from "../components/Layout"
import Banner from '../components/Banner/Banner.js';

export default function ErrorPage() {
  return (
    <Layout pageName="404">
      <title>The Radish | 404</title>
      <div className='error-page'>
        <Banner
          bg="../grass.jpg"
        >
          <h1>Whoops</h1>
          <h2>It seems to me there are no radishes here</h2>
          <br />
          <h3 className="home-action"><Link to='/'>{`Time to go home`}<Arrow /></Link></h3>
          <h3 className="error-code">404</h3>
          <div className="iframe-container">
            <div>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ic_iClOg34A"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </Banner>
      </div>
    </Layout>
  )
}
