
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setStep } from '../../../../redux/slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../services/apiCalls/courseCall';

function index() {
  const { course } = useSelector((state) => state.course);
  const {register, handleSubmit, formState: { errors }, setValue, getValues} = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(course?.status === "published"){
      setValue("public", true);
    }
  },[])


  const goBack = () => {
    dispatch(setStep(2));
  }

  const goToCourses = () => {
    // console.log(" Go to courses");
    // dispatch(setStep(1));
    navigate("/dashboard/my-courses");
    // course = null;
  }

  const handleCoursePublish = async () => {
    if(course?.status === "published" && getValues("public")===true || (course?.status !== "draft" && getValues("public")===false)){
        // no update in form
        // no need to make  api call
        goToCourses();
        setLoading(false);
        dispatch(setStep(1));
        dispatch(setEditCourse(null));
        return;
    }
    // form is updated
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public") === true ? "published" : "draft";
    formData.append("status", courseStatus);
    setLoading(true);
    console.log("form data ", [...formData]);
    const result = await editCourseDetails(formData);
    if(result){
       
        goToCourses();
    }
    setLoading(false);

  }
  const onSubmit = async (data) => {
    handleCoursePublish();
  }  
  return (
    <div className=' rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 '>
        <p>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="public">
                <input 
                type='checkbox' 
                name="public"
                id='public'
                {...register("public")}
                className=' rounded h-4 w-4 border-[1px] border-richblack-700 text-white'
                />
                <span className=' ml-3 text-sm text-richblack-100'>Publish Course</span>
                </label>
            </div>
            <div className=' flex justify-end  gap-x-3'>
                <button
                disabled={loading}
                type="button"
                className=" mt-6 bg-gradient-to-r from-richblue-500 to-[#260948] text-white px-3 py-2 rounded-lg transition-colors hover:from-pink-500 hover:to-purple-700 focus:ring-2 focus:ring-richblue-300"
                onClick={goBack}
                >
                Back
                </button>

                <button
                disabled={loading}
                type="submit"
                className=" mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-caribbeangreen-500 to-[#065646] text-white px-3 py-2 rounded-lg transition-colors hover:from-richblue-500 hover:to-[#361061] focus:ring-2 focus:ring-caribbeangreen-300"
                >
                Save Changes
                </button>
            </div>
        </form>
       
    </div>
  )
}

export default index