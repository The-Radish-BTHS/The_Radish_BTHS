import React, { useState, useEffect } from "react"
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Sidebar/Sidebar"

import "./Layout.css"

function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key)
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

export default function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useStickyState(false, showSidebar)
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
