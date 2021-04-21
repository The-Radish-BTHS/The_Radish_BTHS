import React from "react"
import Navbar from "./Navbar/Navbar"
import "./Layout.css"

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}
