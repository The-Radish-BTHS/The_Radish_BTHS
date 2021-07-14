import React, { useState } from "react"
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Sidebar/Sidebar"

import "./Layout.css"

export default function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(true)
  return (
    <>
      <title>The Radish</title>
      <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <Sidebar showSidebar={showSidebar} />
      <main className={!showSidebar && "mainAccountForSidebar"}>
        {children}
      </main>
    </>
  )
}
