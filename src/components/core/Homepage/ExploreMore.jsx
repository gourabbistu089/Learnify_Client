import React, { useState } from "react";
import HighlightText from "./HighlightText";

import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
const tabName = [
  "Free",
  "New to Coding",
  "Most popular",
  "Skill paths",
  "Career paths",
];

function ExploreMore() {
  const [currTab, setCurrTab] = useState(0);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currCard, setCurrCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCard = (index) => {
    setCurrTab(index);
    const result = HomePageExplore[index].courses;
    setCourses(result);
    setCurrCard(result[0].heading);
  };

  return (
    <div className=" relative">
      <div className=" text-2xl lg:text-4xl font-semibold text-center">
        Unlock the
        <HighlightText text={" Power of Coding"} />
      </div>
      <p className="lg:text-base lg:text-center text-richblack-300 mt-3  lg:mx-auto">
        Learn any skill from the hands-on projects, and personalized guidance
        from coding masters in the Coding Master community.
      </p>

      <div className=" flex sm:flex-row  gap-1 items-center lg:justify-center mt-10 lg:flex-nowrap flex-wrap ">
        {tabName.map((ele, i) => {
          return (
            <div
              key={i}
              className={`px-3 lg:px-6 py-2 rounded-full cursor-pointer
                    transition-all duration-200
                    hover:bg-richblack-900 hover:text-white
                    ${
                      currTab === i
                        ? "bg-richblack-900 text-white"
                        : "bg-richblack-700 text-richblack-200"
                    } `}
                    onClick={() => setMyCard(i)}
            >
              <p className={`text-base font-medium `}>{ele}</p>
            </div>
          );
        })}
      </div>

        <div className=" lg:h-[150px]"></div>

        <div className="  flex gap-9 w-full justify-center mt-5  lg:absolute right-0 left-0 top-40  lg:flex-row flex-col">
            {
                courses.map((ele, i) => {
                    return (
                     <CourseCard
                     key={i}
                     cardData={ele}
                     currCard={currCard}
                     setCurrCard={setCurrCard}
                     />
                    )
                })
            }
        </div>
    </div>
  );
}

export default ExploreMore;
