import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createCourse, fetchCourseCategories ,editCourseDetails } from "../../../../services/apiCalls/courseCall"; // Adjust the import path as necessary
import toast from "react-hot-toast";
import { FiImage, FiTag, FiEdit, FiDollarSign } from "react-icons/fi"; // Importing icons from react-icons
import { useDispatch, useSelector } from "react-redux";
import { setStep, setCourse, setEditCourse } from "../../../../redux/slices/courseSlice";
import FileUpload from "./FileUpload";
import ChipInput from "./ChipInput";
import { FaIndianRupeeSign } from "react-icons/fa6";

const CourseInformation = () => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {course, editCourse} = useSelector((state)=>state.course);

  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const fetchedCategories = await fetchCourseCategories();
        if(fetchedCategories)
          setCategories(fetchedCategories);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load categories.");
        setLoading(false);
      }
    };

    if(editCourse){
      console.log("Edit course", course);
      setValue("title", course.title)
      setValue("CourseTags", course.tag)
      setValue("description", course.description)
      setValue("whatYouWillLearn", course.whatYouWillLearn)
      setValue("price", course.price)
      setValue("category", course.category)
      setValue("image", course.image)
    }

    getCategories();
  }, []);


  const isFormUpdate = () => {
    const currentValues = getValues();
    if(currentValues.title !== course.title || currentValues.CourseTags.toString() !== course.tag.toString() || currentValues.description !== course.description || currentValues.whatYouWillLearn !== course.whatYouWillLearn || currentValues.price !== course.price || currentValues.category !== course.category || currentValues.image !== course.image) {
      return true;
    }
    return false;
  }

  // Form submission handler
  const onSubmit = async (formData) => {

    if(editCourse){
      if(isFormUpdate()){
        const currentValues = getValues();
        const data = new FormData();
        data.append("courseId", course._id);
        if(currentValues.title !== course.title) {
          data.append("title", formData.title);
        }
        if(currentValues.CourseTags.toString() !== course.tag.toString()) {
          data.append("tag", JSON.stringify(formData.CourseTags));
        }
        if(currentValues.description !== course.description) {
          data.append("description", formData.description);
        }
        if(currentValues.whatYouWillLearn !== course.whatYouWillLearn) {
          data.append("whatYouWillLearn", formData.whatYouWillLearn);
        }
        if(currentValues.price !== course.price) {
          data.append("price", formData.price);
        }
        if(currentValues.category !== course.category) {
          data.append("category", formData.category);
        }
        if(currentValues.image !== course.image) {
          data.append("image", formData.image);
        }
        try {
          setLoading(true);
          const response = await editCourseDetails(data);
          if(response){
          dispatch(setStep(2));
          dispatch(setEditCourse(false));
          dispatch(setCourse(response?.data?.data));
        }
          console.log("PRINTING response", response?.data?.data);
        } catch (error) {
          console.log("Error in creating course", error);
          toast.error("An error occurred while creating the course.");
        }finally{
          setLoading(false);
        }

      }
      else{
        toast.error("No changes made so far.");
      }
      return 
    }
    // create a new course
    const data = new FormData();
    data.append("title", formData.title);
    data.append("tag", JSON.stringify(formData.CourseTags));
    data.append("description", formData.description);
    data.append("whatYouWillLearn", formData.whatYouWillLearn);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("image", formData.image);

    try {
      setLoading(true);
      const response = await createCourse(data);
      dispatch(setStep(2));
      console.log("PRINTING response", response?.data?.course);
      dispatch(setCourse(response?.data?.course));
    } catch (error) {
      console.log("Error in creating course", error);
      toast.error("An error occurred while creating the course.");
    }finally{
      setLoading(false);
    }

  };
  if(loading){
      return <div className="flex flex-col justify-center items-center my-40">
        <div className="w-16 h-16  border-t-4 border-[#17b8ca] border-solid rounded-full animate-spin"></div>
      </div>
    
  }
console.log(loading)
  return (
    <div className="bg-richblack-900 shadow-lg p-8 max-w-3xl mx-auto rounded-xl">
      <h2 className="text-4xl font-semibold text-white mb-8 text-center">{editCourse ? "Edit Course" : "Create New Course"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Course Title */}
        <div className="flex items-center space-x-2">
          <FiEdit className="text-richblue-300 text-xl" />
          <label className="block text-richblack-50">Course Title</label>
        </div>
        <input
          type="text"
          className="w-full mt-2 p-3 bg-richblack-800 text-white border border-richblue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-richblue-300 transition-all duration-300"
          placeholder="Enter the course title"
          {...register("title", { required: "Course Title is required" })}
        />
        {errors.title && <p className="text-pink-500 text-sm mt-1">{errors.title.message}</p>}

        {/* Tags Section */}
        <div className="flex items-center space-x-2">
          <FiTag className="text-caribbeangreen-500 text-xl" />
          <label className="block text-richblack-50">Tags</label>
        </div>
          {/* Display selected tags */}
          <ChipInput
          label="Tags"
          name="CourseTags"
          placeholder="Press , or Enter to add a tag"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          />

        {/* Description */}
        <div className="flex items-center space-x-2">
          <FiEdit className="text-richblue-300 text-xl" />
          <label className="block text-richblack-50">Description</label>
        </div>
        <textarea
          className="w-full mt-2 p-3 bg-richblack-800 text-white border border-richblue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-richblue-300 transition-all duration-300"
          placeholder="Describe what the course is about"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <p className="text-pink-500 text-sm mt-1">{errors.description.message}</p>}

        {/* What You Will Learn */}
        <div className="flex items-center space-x-2">
          <FiEdit className="text-richblue-300 text-xl" />
          <label className="block text-richblack-50">What You Will Learn</label>
        </div>
        <textarea
          className="w-full mt-2 p-3 bg-richblack-800 text-white border border-richblue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-richblue-300 transition-all duration-300"
          placeholder="What you will learn in this course"
          {...register("whatYouWillLearn", { required: "What you will learn is required" })}
        />
        {errors.whatYouWillLearn && <p className="text-pink-500 text-sm mt-1">{errors.whatYouWillLearn.message}</p>}

        {/* Price */}
        <div className="flex items-center space-x-2">
          <FaIndianRupeeSign className="text-richblue-400 text-xl font-normal" />
          <label className="block text-richblack-50">Price</label>
        </div>
        <input
          type="number"
          className="w-full mt-2 p-3 bg-richblack-800 text-white border border-richblue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-richblue-300 transition-all duration-300"
          placeholder="Set the price for the course"
          {...register("price", { required: "Price is required" })}
        />
        {errors.price && <p className="text-pink-500 text-sm mt-1">{errors.price.message}</p>}

        {/* Category */}
        <div className="flex items-center space-x-2">
          <FiEdit className="text-richblue-300 text-xl" />
          <label htmlFor="category" className="block text-richblack-50">Category</label>
        </div>
        <select
          className="w-full mt-2 p-3 bg-richblack-800 text-white border border-richblue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-richblue-300 transition-all duration-300"
          {...register("category", { required: "Category is required" })}
          id="category"
          defaultValue=""
          disabled={loading}
        >
          <option value="" disabled>Select a Category</option>
          {loading ? (
            <option>Loading categories...</option>
          ) : (
            categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))
          )}
        </select>
        {errors.category && <p className="text-pink-500 text-sm mt-1">{errors.category.message}</p>}

        {/* Image (Thumbnail) */}
        <FileUpload 
         name="image"
         label="Thumbnail Image"
         register={register}
         errors={errors}
         setValue={setValue}
        />

        {/* Submit Button */}
       <div className=" flex justify-end gap-x-2">
        {
          editCourse && (
            <button
              type="button"
              className=" mt-6  text-white px-3 py-2 rounded-lg transition-colors bg-richblack-700 hover:bg-richblack-800 border-yellow-200 border-1"
              onClick={()=>dispatch(setStep(2))}
              >
              Continue Without Saving
              </button>
          ) 
        }

            <button
              type="submit"
              className=" mt-6 bg-gradient-to-r from-caribbeangreen-500 to-[#065646] text-white px-3 py-2 rounded-lg transition-colors hover:from-richblue-500 hover:to-[#361061] focus:ring-2 focus:ring-caribbeangreen-300"
            >
              {editCourse ? "Save Changes" : "Create Course"}
            </button>
          
        
       </div>
      </form>
    </div>
  );
};

export default CourseInformation;
