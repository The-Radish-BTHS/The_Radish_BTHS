import React, { useState, useEffect } from "react"
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Sidebar/Sidebar"

import "./Layout.css"

const isBrowser = typeof window !== "undefined"

function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    if (isBrowser) {
      const stickyValue = window.localStorage.getItem(key)
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
    }
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

export default function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useStickyState(false, "showSidebar")

  // const [
  //   sidebarScrollPosition,
  //   setSidebarScrollPosition,
  // ] = /*useStickyState*/ useState(0, "sidebarScrollPosition")

  // useEffect(() => {
  //   window.scrollTo(0, sidebarScrollPosition)

  //   const handleScroll = () => {
  //     setSidebarScrollPosition(window.pageYOffset)
  //   }

  //   window.addEventListener("scroll", handleScroll, { passive: true })

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll)
  //   }
  // }, [sidebarScrollPosition])

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
