import React from "react";
import CTRButton from "../Homepage/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
function CodeBlocks({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) {
  return (
    <div className={` flex ${position} my-20 justify-between gap-10 `}>
      {/* section 1 */}
      <div className=" lg:w-[50%]  flex flex-col gap-8">
        {heading}
        <div className=" text-lg text-richblack-300 font-bold">
          {subheading}
        </div>

        <div className=" flex gap-7 mt-7">
          <CTRButton linkTo={ctabtn1.linkTo} active={ctabtn1.active}>
            <div className=" flex gap-2 items-center">
              {ctabtn1.text}
              <FaArrowRight />
            </div>
          </CTRButton>

          <CTRButton linkTo={ctabtn2.linkTo} active={ctabtn2.active}>
            {ctabtn2.text}
          </CTRButton>
        </div>
      </div>

      {/* section 2 */}
      <div className=' h-fit  flex flex-row text-10[px] w-[100%] py-3 lg:w-[500px] shadow-sm shadow-richblack-700'> 
        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
        </div>

        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 relative`}>
            <div className={`${backgroundGradient}`}></div>
           <TypeAnimation
            sequence={[codeblock, 4000, ""]}
            repeat={Infinity}
            cursor={true}
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                    overflowX:"hidden",
                    fontSize:"16px",
                }
            }
            omitDeletionAnimation={true}
           />
        </div>

     </div>
    </div>
  );
}

export default CodeBlocks;
