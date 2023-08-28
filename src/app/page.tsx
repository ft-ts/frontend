'use client'
import Link from "next/link";

export default function Root() {
  return (
    <div id="root">
      <h1>Root</h1>
      <Link className="button" href="/login">Login</Link>
      <Link className="button" href="/main">Main</Link>
    </div>
  )
}

