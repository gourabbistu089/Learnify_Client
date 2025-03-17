import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInfoForm from "./CourseInformation/CourseInfoForm";
import CourseBuilderForm from "./CourseBuilderForm/index.jsx";
import CoursePublisherForm from "./CoursePublisherForm/index.jsx";

function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Course Publisher" },
  ];

  return (
    <div className="flex flex-col items-center bg-richblue-800 min-h-screen px-6 py-10">
      {/* Steps Progress */}
      <div className="w-full max-w-4xl">
        <div className="relative flex items-center justify-between">
          {steps.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step > item.id
                      ? "bg-caribbeangreen-500 text-white"
                      : step === item.id
                      ? "bg-yellow-500 text-white"
                      : "bg-richblue-600 text-white"
                  } transition-all`}
                >
                  {step > item.id ? <FaCheck /> : item.id}
                </div>
                <p
                  className={`mt-2 text-sm font-medium ${
                    step >= item.id ? "text-yellow-50" : "text-richblue-300"
                  }`}
                >
                  {item.title}
                </p>
              </div>
              {/* Add dashes */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2  ${
                    step > item.id
                      ? "bg-caribbeangreen-500"
                      : "bg-richblue-600"
                  } transition-all`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Dynamic Form */}
      <div className="w-full max-w-4xl mt-10">
        {step === 1 && <CourseInfoForm />}
        {/* Add components for other steps here */}
        {step === 2 &&  <CourseBuilderForm/>}
        {step === 3 && <CoursePublisherForm />}
      </div>
    </div>
  );
}

export default RenderSteps;
