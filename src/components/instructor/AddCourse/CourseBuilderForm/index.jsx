import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiArrowRight, FiPlusCircle } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { setCourse, setEditCourse, setStep } from '../../../../redux/slices/courseSlice'
import toast from 'react-hot-toast'
import NestedView from './NestedView'
import { createSection, updateSection } from '../../../../services/apiCalls/courseCall'
function index() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [editSectionName, setEditSectionName] = React.useState(false)
  const {course,editCourse} = useSelector((state)=>state.course)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  
  const goToBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))

  }
  const goToNext = () => {
    if(course?.courseContent?.length === 0){
      toast.error("Please add at least one section to your course.");
      return;
    }
    if(course?.courseContent?.some((section) => section.subSection?.length === 0)){
      toast.error("Please add at least one Lecture to each section.");
      return;
    }
    // all is good
    dispatch(setStep(3))
  }
  console.log("editSectionName", editSectionName);
  const onSubmit = async (data) => {
    setLoading(true);
    let result = null;
    if(editSectionName){
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id
      })
    }
    else{
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id
      })
    }

    // update course
    if(result){
      dispatch(setCourse(result?.data?.data))
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    setLoading(false)

  }

  const handleChangeSectionName = (sectionId,sectionName) => {
    console.log("sectionId", sectionId);
    console.log("sectionName", sectionName);
    if(editSectionName === sectionId){
     setEditSectionName(false);
     setValue("sectionName", "");
     return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div className="bg-richblack-900 shadow-lg p-4 max-w-7xl mx-auto rounded-xl">
      <h1 className="text-3xl font-bold text-white mb-6">Course Builder Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="sectionName" className="block mb-2 text-sm font-medium text-white">Section Name <sup className="text-pink-500">*</sup></label>
          <input type="text" placeholder="Enter section name" name="sectionName" className="bg-richblack-800 border border-white rounded-lg block w-full p-2.5 text-sm text-white"
          {...register('sectionName', { required: true })}
          />
          {errors.sectionName && <p className="text-red-500 text-xs italic">This field is required</p>}
        </div>

        <div className=' mt-4 flex items-center gap-4'>
          <button type="submit" className="bg-yellow-300 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
           {editSectionName ? 'Edit Section' : 'Create Section'}
            <FiPlusCircle className="text-white font-semibold text-lg" />
          </button>
          {
            editSectionName && (
            <button className=' underline text-yellow-300 '
            onClick={()=>{
              setEditSectionName(false);
              setValue("sectionName", "");
            }}
            type='button'
            >
              Cancel Edit
            </button>
            )
          }
        </div>
      </form>
      
      {
        course?.courseContent?.length > 0  &&
        <NestedView  
        handleChangeSectionName={handleChangeSectionName}
        />
      }

      <div className=' flex items-center gap-4 mt-4 justify-end'>
        <button 
        onClick={goToBack}
        className=' bg-richblack-800 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2'>Back</button>
        <button 
        onClick={goToNext}
        className=' bg-yellow-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2'>
          <span>Next</span>
        <FiArrowRight className="text-white font-semibold text-lg" />
        </button>

      </div>



    </div>
  )
}

export default index