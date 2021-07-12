import React from "react"
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Sidebar/Sidebar"

import "./Layout.css"

export default function Layout({ children }) {
  return (
    <>
      <title>The Radish</title>
      <Navbar />
      <Sidebar />
      <main>{children}</main>
    </>
  )
}
