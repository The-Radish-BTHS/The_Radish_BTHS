import React from "react"
import { Link } from 'gatsby'

export default function Home() {
  return (
    <>
      <h1>Welcome</h1>
      <Link to="/articles">articles</Link>
    </>
  )
}
