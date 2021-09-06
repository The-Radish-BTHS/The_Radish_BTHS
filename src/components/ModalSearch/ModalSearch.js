import React, { useState, useEffect, useCallback } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useFlexSearch } from 'react-use-flexsearch';

import AllTags from "../AllTags/AllTags.js"
import SearchBar from "../SearchBar/SearchBar.js"

import { SearchCard } from "../Cards/index"
import { Arrow } from "../Cards/Icons/index"

import "./ModalSearch.css"

export default function Modal({ showModal, setShowModal }, ref) {
  // Search --------------------------------------------------------------------
  const data = useStaticQuery(graphql`
    query ModalSearch {
      localSearchPages {
        index
        store
      }
    }
  `)
  const { localSearchPages } = data;
  const { index, store } = localSearchPages;
  const isBrowser = typeof window !== "undefined"; // SSR error
  const { search } = isBrowser ? window.location : "";
  const query = search ? new URLSearchParams(search).get('s') : "";
  const [modalSearchQuery, setModalSearchQuery] = useState(query || "");
  const results = useFlexSearch(modalSearchQuery, index, store);

  // Modal things --------------------------------------------------------------
  const close = useCallback(() => {
    const _modal = document.getElementById("modal")
    const _blur = document.getElementById("modalSearch-blurry-bg")
    _blur.classList.remove("blur")
    _modal.classList.add("fade-out")
    setTimeout(() => setShowModal(false), 200);
  }, [setShowModal])

  // useImperativeHandle(ref, () => ({
  //   open: () => setShowModal(true),
  //   close
  // }), [close, setShowModal])

  const handleKeydown = useCallback(event => {
    if (event.keyCode === 27) close()

    let isTabPressed = event.key === 'Tab' || event.keyCode === 9;
    if (!isTabPressed) {
      return;
    }

    // Lock focus to the modal -------------------------------------------------
    // https://uxdesign.cc/how-to-trap-focus-inside-modal-to-make-it-ada-compliant-6a50f9a70700
    const  focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = isBrowser ? document.getElementById('modal') : null;
    const firstFocusableElement = modal ? modal.querySelectorAll(focusableElements)[0] : null;
    const focusableContent = modal ? modal.querySelectorAll(focusableElements) : [];
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
    if (showModal) {
      document.addEventListener('keydown', handleKeydown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [handleKeydown, showModal])

  return showModal ? (
    <>
      <div className="modal fade" id="modal">
        <SearchBar
          // searchQuery={ModalSearchQuery}
          setSearchQuery={setModalSearchQuery}
        />
          <div className="side-cards">
            <AllTags />
            {results.slice(0, 3).map(result =>
              <SearchCard
                key={result.id}
                slug={result.slug}
                title={result.title}
                excerpt={result.excerpt}
                date={result.date}
                description={result.description}
              />
            )}
            {modalSearchQuery && !results.length ? <h3>No results for <span className="query">{modalSearchQuery}</span></h3>
              : null
            }
            {results.length ? <button type="submit" form="search-form">More<Arrow /></button> : null}
          </div>
      </div>
      <div
        role="button"
        tabIndex={0}
        className={`${showModal ? "blur" : ""}`}
        id="modalSearch-blurry-bg"
        onClick={close}
        onKeyDown={(ev) => ev.keyCode===13 ? setShowModal(false) : ""}
      >
      </div>
    </>
  ) : null
}
