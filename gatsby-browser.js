/*
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 * https://github.com/baobabKoodaa/gatsby-starter-infinite-scroll/blob/master/gatsby-browser.js
*/

import React from "react"

import { GlobalState } from "./src/components/InfiniteScroll/GlobalState.js"

export const wrapRootElement = ({ element }) => {
    return (
        <GlobalState>
            {element}
        </GlobalState>
    )
}
