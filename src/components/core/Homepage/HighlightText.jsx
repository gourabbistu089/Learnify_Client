import React from 'react'

function HighlightText({text}) {
  return (
    <span className=' bg-gradient-to-b from-[#1783d0] via-[#12D8FA] to-[#64ffa4] text-transparent bg-clip-text font-bold'>
      {" "}  {text}
    </span>
  )
}

export default HighlightText
