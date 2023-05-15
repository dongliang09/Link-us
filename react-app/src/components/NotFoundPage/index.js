import React from "react";
import { Link } from "react-router-dom"

function NotFoundPage() {
  return (
    <div className="txt-ali-center">
      <h1>Page Not Found</h1>
      <Link to="/">return to Home Page</Link>
    </div>
  )
}

export default NotFoundPage;
