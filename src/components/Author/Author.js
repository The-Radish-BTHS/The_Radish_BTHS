import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/Layout"

import "./Author.css"

export default function Articles({ data }) {
  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <h3>{frontmatter.date}</h3>
    </Layout>
  )
}
