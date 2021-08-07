import React, { useState, useEffect, useImperativeHandle, forwardRef, useCallback } from "react"
import { createPortal } from 'react-dom'
import { useStaticQuery, graphql, Link } from "gatsby"
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
  const { search } = isBrowser ? window.location : '';
  const query = search ? new URLSearchParams(search).get('s') : '';
  const [ModalSearchQuery, setModalSearchQuery] = useState(query || '');
  const results = useFlexSearch(ModalSearchQuery, index, store);

  // Modal things -------------------------------------------------------
  const close = useCallback(() => {
    const _modal = document.getElementById("modal")
    const _blur = document.getElementById("modalSearch-blurry-bg")
    _blur.classList.remove("blur")
    _modal.classList.add("fade-out")
    setTimeout(() => setShowModal(false), 200);
  }, [])
  useImperativeHandle(ref, () => ({
    open: () => setShowModal(true),
    close
  }), [close])

  const handleEscape = useCallback(event => {
    if (event.keyCode === 27) close()
  }, [close])

  useEffect(() => {
    if (showModal) document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, showModal])

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
            />
          )}
          {results.length ? <button type="submit" form="search-form">More</button> : ""}
        </div>
        <Link to="/issues" className="modal-link">Issues</Link>
        <Link to="/articles" className="modal-link">Articles</Link>
        <Link to="/authors" className="modal-link">Authors</Link>
      </div>
      <div
        role="button"
        tabIndex={0}
        className={`${showModal ? "blur" : ""}`}
        id="modalSearch-blurry-bg"
        onClick={close}
        onKeyDown={(ev) => ev.keyCode===13 ? setShowModal(!showModal) : ""}
      >
      </div>
    </>
    ) : null,
    portalRoot
  ) : null
}

export default forwardRef(Modal)
