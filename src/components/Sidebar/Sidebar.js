import React, { useEffect, useCallback } from "react"
import { Link } from "gatsby"

import Footer from "../Footer/Footer"
import "./Sidebar.css"

export default function Sidebar({ showSidebar, setShowSidebar }) {
  const isBrowser = typeof window !== "undefined"; // SSR error

  const close = useCallback(() => {
    const sidebar = document.getElementById("sidebar")
    sidebar.classList.add("slide-out")
    setTimeout(() => setShowSidebar(false), 300);
  }, [setShowSidebar])

  const handleKeydown = useCallback(event => {
    if (event.keyCode === 27) close()

    let isTabPressed = event.key === 'Tab' || event.keyCode === 9;
    if (!isTabPressed) {
      return;
    }

    // https://uxdesign.cc/how-to-trap-focus-inside-modal-to-make-it-ada-compliant-6a50f9a70700
    const  focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const sidebar = isBrowser ? document.getElementById('sidebar') : null;
    const firstFocusableElement = sidebar ? sidebar.querySelectorAll(focusableElements)[0] : null;
    const focusableContent = sidebar ? sidebar.querySelectorAll(focusableElements) : [];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    if (event.shiftKey) { // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        event.preventDefault();
      }
    } else { // if tab key is pressed
      if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus(); // add focus for the first focusable element
        event.preventDefault();
      }
    }
  }, [close, isBrowser])

  useEffect(() => {
    if (showSidebar) {
      document.addEventListener('keydown', handleKeydown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [handleKeydown, showSidebar])

  return (
    showSidebar ?
      <div id="sidebar">
        <div className={`sidebar slide-in ${showSidebar ? "" : "sidebarHidden"}`}>
          <Link to="/articles" className="sidebar-link">Articles</Link>
          <Link to="/issues" className="sidebar-link">Issues</Link>
          <Link to="/authors" className="sidebar-link">Authors</Link>
          <Link to="/execs" className="sidebar-link">Execs</Link>
          <Link to="/about" className="sidebar-link">About</Link>
          <Footer />
        </div>
        <div
          role="button"
          tabIndex={0}
          className={`${showSidebar ? "blur" : ""}`}
          onClick={close}
          onKeyDown={(ev) => ev.keyCode===13 ? close : ""}
        >
        </div>
      </div>
    : null
  )
}
