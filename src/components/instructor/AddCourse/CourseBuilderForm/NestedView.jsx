import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import { MdEdit, MdPlayArrow } from "react-icons/md";
import { RiDeleteBackFill, RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import {IoMdSchool } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import SubSectionModal from "./SubSectionModal";
import { deleteSection,deleteSubSection } from "../../../../services/apiCalls/courseCall";
import { setCourse } from "../../../../redux/slices/courseSlice";
import { FaEye } from "react-icons/fa";

function NestedView({ handleChangeSectionName }) {
    
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModalData, setConfirmationModalData] = useState(null);


  const handleDeleteSection = async(sectionId) => {
    const result = await deleteSection({sectionId, courseId:course._id});
    if(result){
      dispatch(setCourse(result?.data?.data));
      toast.success("Section deleted successfully");
    }
    setConfirmationModalData(null);
  }

  const handleDeleteSubSection = async(subSectionId) => {
    const result = await deleteSubSection({subSectionId, sectionId:confirmationModalData._id});
    if(result){
      dispatch(setCourse(result?.data?.data));
      toast.success("SubSection deleted successfully");
    }
    setConfirmationModalData(null);
  }



  return (
    <div>
    <div className="mt-10 bg-richblack-700 rounded-lg shadow-lg p-6">
  {course?.courseContent?.map((section) => (
    <details
      key={section._id}
      className="bg-richblack-800 rounded-lg shadow-md mb-4 overflow-hidden"
    >
      <summary className="flex items-center justify-between gap-x-3 py-4 px-6 bg-richblack-600 hover:bg-richblack-500 cursor-pointer rounded-t-lg">
        <div className="flex items-center gap-x-3">
          <IoMdSchool className="text-2xl text-caribbeangreen-300" />
          <p className="text-base font-medium text-white">
            {section.sectionName}
          </p>
        </div>
        <div className="flex items-center gap-x-4 text-white">
          <button
            className="text-caribbeangreen-300 hover:text-caribbeangreen-500"
            onClick={()=>{
              handleChangeSectionName(
                section._id,
                section.sectionName
              )
            }}
          >
            <MdEdit className="text-lg" />
          </button>
          <button
            className="text-pink-500 hover:text-pink-700"
            onClick={() => setConfirmationModalData(true)}
          >
            <RiDeleteBin6Line className="text-lg" />
          </button>
          <span className="text-gray-500">|</span>
          <button>
            <BiSolidDownArrow className="text-caribbeangreen-300 hover:text-caribbeangreen-500" />
          </button>
        </div>
      </summary>
      <div className="px-6 py-4 bg-richblack-700">
        {section?.subSection?.map((data) => (
          <div
            key={data._id}
            className="flex items-center justify-between py-3 border-b border-richblack-600"
          >
            <div className="flex items-center gap-x-3">
              <p className="text-sm text-white">{data.title}</p>
            </div>
            <div className="flex items-center gap-x-4 text-white">
              <button
            onClick={() => setViewSubSection(data)}
            className="text-blue-300 hover:text-blue-500" 
          >
            <FaEye className="text-lg" />
              </button>
              <button
                className="text-caribbeangreen-300 hover:text-caribbeangreen-500"
                onClick={() => setEditSubSection({ ...data, sectionId: data._id })}
              >
                <MdEdit className="text-lg" />
              </button>
              <button
                className="text-pink-500 hover:text-pink-700"
                onClick={() => setConfirmationModalData(data)}
              >
                <RiDeleteBackFill className="text-lg" />
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() => setAddSubSection(section._id)}
          className="mt-4 flex items-center gap-x-3 py-3 px-4 bg-richblack-600 hover:bg-caribbeangreen-600 text-white rounded-md shadow-sm transition-all duration-300"
        >
          <AiOutlinePlus className="text-lg" />
          <p>Add Lecture</p>
        </button>
      </div>
    </details>
  ))}
</div>


      {
        addSubSection ? (<SubSectionModal 
        modalData={addSubSection}
        setModalData={setAddSubSection}
        add={true}
        />) : viewSubSection ? <SubSectionModal
        modalData={viewSubSection}
        setModalData={setViewSubSection}
        view={true}
        /> : editSubSection ? <SubSectionModal
        modalData={editSubSection}
        setModalData={setEditSubSection}
        edit={true}
        /> : null
      }
    </div>
  );
}

export default NestedView;
