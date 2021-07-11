import React from "react"
import Layout from "../components/Layout"
import Articles from "../components/Articles/Articles"

export default function Home() {
  return (
    <Layout>
      <title>The Radish</title>
      <Articles />
    </Layout>
  )
}
