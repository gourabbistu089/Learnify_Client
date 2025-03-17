import React from 'react'
import Instructor from '../../../assets/Images/Instructor2.png'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'
function InstructorSection() {
  return (
    <div className=' mt-16'>

    <div className=' flex  flex-col md:flex-row gap-20 items-center'>

        <div className=' md:w-[50%]'>
            <img src={Instructor} className=' shadow-md shadow-white' alt="" />

        </div>

        <div className=' md:w-[50%] gap-6  md:gap-10  flex-col flex'>
            <div className=' text-5xl md:text-4xl font-semibold'>
                Become an 
                <br />
                <HighlightText text={" Instructor"} />
            </div>
            <p className=' text-base font-medium text-richblack-200 md:w-[80%]'>
            Instructor from Coding Master can help you to create and teach coding courses, tutorials, and resources for others to learn and master programming languages, frameworks, and tools.
            </p>

         <div className=' w-fit'>
         <CTAButton active={true} linkTo={"/signup"}>
            <div className=' flex gap-2 flex-row items-center'>
                Join as Instructor
                <FaArrowRight />
            </div>
            </CTAButton>
         </div>

        </div>

    </div>
    </div>

  )
}

export default InstructorSection