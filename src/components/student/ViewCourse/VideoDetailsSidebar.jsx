import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { FaChevronLeft, FaVideo } from "react-icons/fa6";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

const VideoDetailsSidebar = () => {
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const [activeStatus, setActiveStatus] = useState(null);
  const [videobarActive, setVideoBarActive] = useState(null);

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData.length) return;

    const currSectionInd = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currSubSectionInd = courseSectionData[
      currSectionInd
    ]?.subSection?.findIndex((subsection) => subsection._id === subSectionId);
    const activeSubsectionInd =
      courseSectionData[currSectionInd]?.subSection[currSubSectionInd]?._id;
    //set current section
    setActiveStatus(courseSectionData[currSectionInd]?._id);
    //set current sub-section
    setVideoBarActive(activeSubsectionInd);
  }, [courseSectionData, sectionId, subSectionId]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="w-80 min-h-screen bg-[#1E1E2C] text-white p-5 border-r border-[#34344A] hidden md:block">
        {/* Heading & Back Button */}
        <div className="mb-5">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex items-center px-4 py-2 bg-[#14253f] hover:bg-[#0d2040] text-white rounded-md w-full mb-3"
          >
            <FaChevronLeft className="mr-2" /> Back to Courses
          </button>
          <h2 className="text-lg font-semibold text-[#FFD700]">
            {courseEntireData?.title}
          </h2>
          <p className="text-sm text-[#B0B3D6]">
            {completedLectures.length} / {totalNoOfLectures} Lectures Completed
          </p>
        </div>

        {/* Sections */}
        <div>
          {courseSectionData.map((section, index) => (
            <div key={index} className="mb-3">
              {/* Section Header */}
              <div
                className="flex justify-between items-center p-3 bg-[#28283D] rounded-lg cursor-pointer hover:bg-[#3B3B58]"
                onClick={() =>
                  setActiveStatus(
                    activeStatus === section._id ? null : section._id
                  )
                }
              >
                <span className="text-white">{section.sectionName}</span>
                {activeStatus === section._id ? (
                  <FiChevronUp className="text-[#FFD700]" />
                ) : (
                  <FiChevronDown className="text-[#FFD700]" />
                )}
              </div>

              {/* Subsection Group */}
              {activeStatus === section._id && (
                <div className="mt-2 bg-[#232339] rounded-lg p-3 shadow-lg border border-[#34344A] flex flex-col gap-2">
                  {section.subSection.map((subsection, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-3 rounded-md cursor-pointer transition-all ${
                        videobarActive === subsection._id
                          ? "bg-[#008080] text-white shadow-md"
                          : "bg-[#34344A] text-[#B0B3D6] hover:bg-[#404060] hover:shadow-md"
                      }`}
                      onClick={() =>
                        navigate(
                          `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subsection._id}`
                        )
                      }
                    >
                      <FaVideo className="text-[#FFD755]" />
                      <span>{subsection.title}</span>
                      {completedLectures.includes(subsection._id) && (
                        <FaCheckCircle className="text-[#FFD700] ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={toggleMobileMenu}
        className="mb-6 p-2 hover:bg-richblack-700 rounded-md transition-all duration-200 fixed top-10 -left-1 z-10 md:hidden"
      >
        <CircleChevronRight size={36} fill="#fff" />
      </button>

      <div
        className={`fixed left-0 top-[3.5rem] min-h-screen bg-[#1E1E2C] text-white p-5 border-r border-[#34344A] 
    ] w-72 transform transition-transform duration-300 ease-in-out z-50 ${
      isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
    }
    
    `}
      >
        {/* Heading & Back Button */}
        <div className="mb-5">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex items-center px-4 py-2 bg-[#14253f] hover:bg-[#0d2040] text-white rounded-md w-full mb-3"
          >
            <FaChevronLeft className="mr-2" /> Back to Courses
          </button>
          <h2 className="text-lg font-semibold text-[#FFD700]">
            {courseEntireData?.title}
          </h2>
          <p className="text-sm text-[#B0B3D6]">
            {completedLectures.length} / {totalNoOfLectures} Lectures Completed
          </p>
        </div>

        {/* Sections */}
        <div>
          {courseSectionData.map((section, index) => (
            <div key={index} className="mb-3">
              {/* Section Header */}
              <div
                className="flex justify-between items-center p-3 bg-[#28283D] rounded-lg cursor-pointer hover:bg-[#3B3B58]"
                onClick={() =>
                  setActiveStatus(
                    activeStatus === section._id ? null : section._id
                  )
                }
              >
                <span className="text-white">{section.sectionName}</span>
                {activeStatus === section._id ? (
                  <FiChevronUp className="text-[#FFD700]" />
                ) : (
                  <FiChevronDown className="text-[#FFD700]" />
                )}
              </div>

              {/* Subsection Group */}
              {activeStatus === section._id && (
                <div className="mt-2 bg-[#232339] rounded-lg p-3 shadow-lg border border-[#34344A] flex flex-col gap-2">
                  {section.subSection.map((subsection, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-3 rounded-md cursor-pointer transition-all ${
                        videobarActive === subsection._id
                          ? "bg-[#008080] text-white shadow-md"
                          : "bg-[#34344A] text-[#B0B3D6] hover:bg-[#404060] hover:shadow-md"
                      }`}
                      onClick={() =>
                        navigate(
                          `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subsection._id}`
                        )
                      }
                    >
                      <FaVideo className="text-[#FFD755]" />
                      <span>{subsection.title}</span>
                      {completedLectures.includes(subsection._id) && (
                        <FaCheckCircle className="text-[#FFD700] ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div
            onClick={closeMobileMenu}
            className="p-2 hover:bg-richblack-700 rounded-md transition-all duration-200 relative"
          >
            <CircleChevronLeft className=" absolute right-0" size={30} />
          </div>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default VideoDetailsSidebar;
