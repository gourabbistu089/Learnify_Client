import React, { useEffect, useState } from 'react'
import HighlightText from './HighlightText'
import { FaRupeeSign, FaUserPen } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaTimes } from 'react-icons/fa';
import { getAllCourses } from '../../../services/apiCalls/courseCall';
import RatingStars from '../../common/RatingStars';
import GetAvgRating from '../../../utils/avgRating';
import { motion } from 'framer-motion';

function LearningSection() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    
      async function fetchAllCourses() {
        const response = await getAllCourses();
        if (response) {
          setCourses(response.slice(0, 4));
        }
      }
    
      useEffect(() => {
        fetchAllCourses();
      }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className=' mt-20'
    >
        <div className=' flex flex-col  gap-5 '>
            <div className=' text-4xl font-semibold md:text-center'>
                <HighlightText text={"Learn from the best"} />
            </div>
            <div className=' text-base font-medium text-richblack-400  md:text-center md:w-[70%] mx-auto'>
                Using a simple and intuitive interface, you can access a wide range of coding courses, tutorials, and resources to help you learn and master programming languages, frameworks, and tools.
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 w-full"
            >
        {courses.length > 0 ? courses.map((course) => (
          <motion.div
            key={course._id}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#F9F9F9] rounded-xl shadow-lg hover:shadow-md border-none hover:border border-gray-200"
          >
            <div className="mb-4">
              <img
                src={course.thumbnail}
                alt="Course Thumbnail"
                className="h-[250px] w-full object-cover rounded-t-xl"
              />
            </div>
            <div className="px-4 py-3">
              <p className="text-[#222222] text-xl font-semibold mb-1 truncate">
                {course.title || "Course Title"}
              </p>
              <p className="text-[#555555] text-sm mb-1 flex items-center gap-2">
                <FaUserPen className="text-[#27AE60]" />
                <span>{course.instructor?.firstName} {course.instructor?.lastName}</span>
              </p>
              <div className="flex items-center gap-x-3 text-[#FFD700] mb-2">
                <span className="text-[#222222] text-sm font-medium">
                  {GetAvgRating(course.ratingAndReview) || 0}
                </span>
                <RatingStars Review_Count={GetAvgRating(course.ratingAndReview)} />
                <span className="text-[#777777] text-sm">
                  ({course.ratingAndReview?.length || 0} Reviews)
                </span>
              </div>
              <p className="text-[#222222] text-lg font-bold flex items-center gap-x-1">
                <FaRupeeSign className="text-[#27AE60]" /> {course.price || "0"}
              </p>
            </div>
          </motion.div>
        
        )) : (
          <p className="text-[#FFFFFF] text-lg">No courses found.</p>
        )}
      </motion.div>
           <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className=' flex items-center justify-center'
           >
           <button
            onClick={() => navigate('/courses')}
            className='px-6 py-3 bg-[#F5EFFF] hover:bg-[#c8bceb] text-[#1d1818] hover:text-white rounded-md border border-[#2a2341] w-fit text-lg font-medium flex items-center gap-2 transition-all duration-300 ease-in-out mb-6'
            >

                Show All Courses
            </button>
           </motion.div>
        </div>
    </motion.div>
  )
}

export default LearningSection
