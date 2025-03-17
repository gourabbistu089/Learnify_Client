import React from "react";

import logo1 from "../../../assets/TimeLineLogo/logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/logo4.svg";
import TimeLineImage from "../../../assets/Images/TimeLineImage.png";

const timeLine = [
  {
    logo: logo1,
    heading: "Leadership",
    description:
      "Learn Leadership on your own terms and become an effective leader.",
  },
  {
    logo: logo2,
    heading: "Time Management",
    description:
      "Learn how to manage your time more effectively and prioritize your tasks.",
  },
  {
    logo: logo3,
    heading: "Communication",
    description:
      "Improve your communication skills and learn how to express more effectively.",
  },
  {
    logo: logo4,
    heading: "Problem Solving",
    description:
      "Learn how to approach problems and find solutions quickly and easily.",
  },
];

function TimeLineSection() {
  return (
    <div>
      <div className=" flex  flex-col md:flex-row gap-16 items-center ">
        {/* left Box */}
        <div className=" md:w-[45%] flex flex-col">
          {timeLine.map((logo, ind) => {
            return (
              <div className=" flex flex-row gap-6" key={ind}>
                <div className=" w-[50px] h-[50px] flex items-center justify-center">
                  <img src={logo.logo} alt="" />
                </div>
                <div className="">
                  <h2 className=" font-semibold text-[18px]">{logo.heading}</h2>
                  <p className="text-base">{logo.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* right box */}
        <div className=" md:w-[45%] relative timelineImg">
          <img src={TimeLineImage} alt="" />
          <div className=" absolute bg-caribbeangreen-700 flex-row text-white uppercase py-7 flex left-[50%] -translate-x-[50%] -translate-y-[60%]  ">
            <div className=" flex flex-row gap-5 items-center  border-r border-caribbeangreen-400 px-6">
                <p className=" text-3xl font-bold ">10</p>
                <p className=" text-caribbeangreen-300 text-sm">Years Of Experience</p>
            </div>
            <div className=" flex flex-row gap-5 items-center px-6">
                <p className=" text-3xl font-bold ">250</p>
                <p className=" text-caribbeangreen-300 text-sm">Type of Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeLineSection;
