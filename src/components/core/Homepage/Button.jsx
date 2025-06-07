import React from 'react'
import { Link } from 'react-router-dom'

function Button({children , active, linkTo}) {
  return (
    <Link to={linkTo}>
        <div className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
      active
        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg hover:shadow-cyan-500/25'
        : 'bg-transparent border-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400'
    }`}>
            {children}
        </div>
    </Link>
  )
}

export default Button
/*
 className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
      active
        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg hover:shadow-cyan-500/25'
        : 'bg-transparent border-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400'
    }`}
    */