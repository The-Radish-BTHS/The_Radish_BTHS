import React, {
  useState,
  // useEffect
} from "react"
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Sidebar/Sidebar"
import Footer from "./Footer/Footer"

import "./Layout.css"

export default function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false, "showSidebar")

  return (
    <>
      <title>The Radish</title>
      <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <div
        role="button"
        tabIndex={0}
        className={`${showSidebar ? "blur" : ""}`}
        onClick={() => setShowSidebar(!showSidebar)}
        onKeyDown={(ev) => ev.keyCode===13 ? setShowSidebar(!showSidebar) : ""}
      >
      </div>
      <Sidebar showSidebar={showSidebar} />
      <div className="rest-of-page">
        <main>{children}</main>
        <Footer showSidebar={showSidebar} />
      </div>
    </>
  )
}
