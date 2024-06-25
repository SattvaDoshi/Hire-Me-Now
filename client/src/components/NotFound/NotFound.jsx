import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
<section className="bg-gray-100 min-h-screen flex items-center justify-center">
  <div className="max-w-md mx-auto text-center">
    <img
      src="/notfound.png"
      alt="Not Found"
      className="mx-auto mb-8 max-w-full"
    />
    <h1 className="text-3xl font-bold text-gray-800 mb-4">
      Oops! Page Not Found
    </h1>
    <p className="text-gray-600 mb-8">
      The page you are looking for does not exist.
    </p>
    <Link
      to="/"
      className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
    >
      Return to Home Page
    </Link>
  </div>
</section>    </>
  )
}

export default NotFound
