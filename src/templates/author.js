import React from "react"
import Layout from "../components/Layout"
import "../components/Articles/Articles.css"
import { graphql } from "gatsby"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <h3>{"Graduating "+frontmatter.grad}</h3>
      {
        // <div className="frontpage">
        //   {
        //      Gotta somehow return the articles written by an author too
        //   }
        // </div
      }
    </Layout>
  )
}

export const pageQuery = graphql`
  query authors ($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        grad
        title
        position
      }
    }
  }
`
