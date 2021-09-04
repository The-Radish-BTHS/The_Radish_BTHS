import React, { useState } from "react"
import Navbar from "./Navbar/Navbar"
import ModalSearch from "./ModalSearch/ModalSearch"
import Sidebar from "./Sidebar/Sidebar"
import Footer from "./Footer/Footer"

import { ParallaxProvider } from 'react-scroll-parallax';

import "./Layout.css"

export default function Layout({ children, pageName }) {
  const [showSidebar, setShowSidebar] = useState(false, "showSidebar")
  const [showModal, setShowModal] = useState(false, "showModal")
  // const modal = useRef(null)

  // Add the twitter api
  // const isBrowser = typeof document !== "undefined" && typeof window !== "undefined"
  // if (isBrowser) {
  //   // https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites
  //   window.twttr = (function(d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0],
  //       t = window.twttr || {};
  //     if (d.getElementById(id)) return t;
  //     js = d.createElement(s);
  //     js.id = id;
  //     js.src = "https://platform.twitter.com/widgets.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //
  //     t._e = [];
  //     t.ready = function(f) {
  //       t._e.push(f);
  //     };
  //
  //     return t;
  //   }(document, "script", "twitter-wjs"))
  // }

  return (
    <ParallaxProvider>
      <div className="light-theme">
        <title>{pageName ? `${pageName} | ` : ``}The Radish</title>
        <a className="screen-reader-shortcut" href="#main-content">
          Skip to main content
        </a>
        <Sidebar
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
        />
        <Navbar
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
          setShowModal={setShowModal}
          showModal={showModal}
        />
        <ModalSearch
          setShowModal={setShowModal}
          showModal={showModal}
          // ref={modal}
        />
        <div className="rest-of-page">
          <main id="main-content">{children}</main>
          <Footer />
        </div>
      </div>
    </ParallaxProvider>
  )
}
