import React, { useState } from "react"
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Sidebar/Sidebar"

import "./Layout.css"

export default function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false)
  return (
    <>
      <title>The Radish</title>
      <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      {showSidebar && <Sidebar />}
      <main className={showSidebar && "mainAccountForSidebar"}>{children}</main>
    </>
  )
}
