import React from 'react'
import { Link } from 'react-router-dom'

function Button({children , active, linkTo}) {
  return (
    <Link to={linkTo}>
        <div className={` px-6 py-3  rounded-md text-[14px] md:text-[13px] font-bold ${active ? "bg-yellow-50 text-richblack-900" : "bg-richblack-800 text-white"} hover:scale-95 transition-all duration-200 `}>
            {children}
        </div>
    </Link>
  )
}

export default Button