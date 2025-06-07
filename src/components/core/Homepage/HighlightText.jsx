import React from 'react'

function HighlightText({text}) {
  return (
    <span className=' bg-gradient-to-b from-cyan-300 to-purple-400 text-transparent bg-clip-text font-black'>
      {" "}  {text}
    </span>
  )
}

export default HighlightText
