import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../services/apiCalls/courseCall';
import CoursesTable from './AddCourse/CourseTable';


function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = React.useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetchInstructorCourses();
      if(response){
        setCourses(response);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div>
      <div>
        <h1 className='text-3xl font-bold text-center'>My Courses</h1>
        <button
        className='bg-gradient-to-r from-richblue-500 to-[#260948] text-white px-3 py-2 rounded-lg transition-colors hover:from-pink-500 hover:to-purple-700 focus:ring-2 focus:ring-richblue-300'
        onClick={()=>navigate("/dashboard/add-course")}>
          Add Course
        </button>
      </div>

      {/* Courses List */}
      {
        courses && <CoursesTable courses={courses} setCourses={setCourses} />
      }
    </div>
  )
}

export default MyCourses

