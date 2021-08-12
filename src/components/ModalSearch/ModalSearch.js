import React, { useState, useEffect, useImperativeHandle, forwardRef, useCallback } from "react"
import { createPortal } from 'react-dom'
import { useStaticQuery, graphql } from "gatsby"
import { useFlexSearch } from 'react-use-flexsearch';

import SearchBar from "../SearchBar/SearchBar.js"
import SearchCard from "../Cards/SearchCard.js"
import "./ModalSearch.css"

const portalRoot = typeof document !== `undefined` ? document.getElementById('portal') : null

export function Modal({ showModal, setShowModal }, ref) {
  // Search --------------------------------------------------------------------
  const data = useStaticQuery(graphql`
    query SearchIndexes {
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
  const [ModalSearchQuery, setModalSearchQuery] = useState(query || "");
  const results = useFlexSearch(ModalSearchQuery, index, store);

  // Modal things --------------------------------------------------------------
  const close = useCallback(() => {
    const _modal = document.getElementById("modal")
    const _blur = document.getElementById("modalSearch-blurry-bg")
    _blur.classList.remove("blur")
    _modal.classList.add("fade-out")
    setTimeout(() => setShowModal(false), 200);
  }, [setShowModal])
  useImperativeHandle(ref, () => ({
    open: () => setShowModal(true),
    close
  }), [close, setShowModal])

  const handleKeydown = useCallback(event => {
    if (event.keyCode === 27) close()

    let isTabPressed = event.key === 'Tab' || event.keyCode === 9;

    // Lock focus to the modal -------------------------------------------------
    // https://uxdesign.cc/how-to-trap-focus-inside-modal-to-make-it-ada-compliant-6a50f9a70700
    const  focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = isBrowser ? document.getElementById('modal') : null;
    const firstFocusableElement = modal ? modal.querySelectorAll(focusableElements)[0] : null;
    const focusableContent = modal ? modal.querySelectorAll(focusableElements) : [];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    if (!isTabPressed) {
      return;
    }

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

  return portalRoot ? createPortal(
    showModal ? (
    <>
      <div className="modal fade" id="modal">
        <SearchBar
          searchQuery={ModalSearchQuery}
          setSearchQuery={setModalSearchQuery}
        />
          <div className="side-cards">
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
            {results.length ? <button type="submit" form="search-form">More</button> : null}
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
    ) : null,
    portalRoot
  ) : null
}

export default forwardRef(Modal)
