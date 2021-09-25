import React, { useState, useEffect } from "react"
import Navbar from "./Navbar/Navbar"
import ModalSearch from "./ModalSearch/ModalSearch"
import Sidebar from "./Sidebar/Sidebar"
import Footer from "./Footer/Footer"
import { keepTheme } from "./ToggleTheme/themes"
import Seo from "./Seo"

import { ParallaxProvider } from 'react-scroll-parallax';
import "./Layout.css"

export default function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false, "showSidebar")
  const [showModal, setShowModal] = useState(false, "showModal")
  const [togClass, setTogClass] = useState('dark');

  useEffect(() => {
      keepTheme();
  })

  return (
    <ParallaxProvider>
      <div className={togClass} id="theme-switching-element">
        <Seo />
        {
          // <title>{pageName ? `${pageName} | ` : ``}The Radish</title>
        }
        <a className="screen-reader-shortcut" href="#main-content" id='reach-skip-nav'>
          Skip to main content
        </a>
        <Sidebar
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
          togClass={togClass}
          setTogClass={setTogClass}
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
          <Footer
            togClass={togClass}
            setTogClass={setTogClass}
          />
        </div>
      </div>
    </ParallaxProvider>
  )
}
