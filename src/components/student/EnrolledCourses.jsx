import React, { useEffect, useState } from 'react'
import { getUserEnrolledCoures } from '../../services/apiCalls/profileCall'
import ProgressBar from '@ramonak/react-progress-bar'
import { formatDate } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'

function EnrolledCourses() {

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const [progressData, setProgressData] = useState(undefined);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const getEnrolledCourses = async () => {
    setLoading(true)
    try {
      const response = await getUserEnrolledCoures()
      console.log("response", response)
      setEnrolledCourses(response.courses)
      setProgressData(response.courseProgress)
    } catch (error) {
      console.log("Error in getting enrolled courses", error)
    } finally {
      setLoading(false)
    }
  }

  const totalNoOfLectures = (course)=>{
    let total = 0;
    course.courseContent.forEach((section) => {
        total += section.subSection.length;
    });
    return total;
  }

  useEffect(() => {
    getEnrolledCourses()
  }, [])


  if (loading) {
    return (
       <div className="min-h-screen p-6 md:p-10">
        { Array(3).fill().map((_, index) => (
          <ShimmerCourseCard key={index} />
        ))}
       </div>
    )
  }
console.log("enrolled courses", enrolledCourses)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
       {
        enrolledCourses &&
         <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1783d0] to-[#64ffa4] bg-clip-text text-transparent">
         Enrolled Courses
       </h1>
       }
      </div>

      {!enrolledCourses ? (
        <p className="text-pure-greys-200 italic">No courses enrolled yet</p>
      ) : (
        <div className="space-y-6">
          {/* Course Cards */}
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="group relative rounded-xl p-5 transition-all duration-300 hover:bg-gray-750 border border-pure-greys-300/30 hover:border-pure-greys-300"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start"
              onClick={()=>{
                navigate(`/view-course/${course._id}/section/${course?.courseContent[0]?._id}/sub-section/${course?.courseContent[0]?.subSection[0]?._id}`)
              }}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden rounded-lg w-full md:w-48 flex-shrink-0">
                  <img
                    src={course.thumbnail}
                    alt="Course thumbnail"
                    className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pure-greys-700/60 to-transparent" />
                </div>

                {/* Course Info */}
                <div className="flex-1 w-full space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold ">{course.title}</h3>
                    <p className="text-pure-greys-400 mt-1 text-sm line-clamp-2">{course.description}</p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* updated at */}
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-emerald-400 font-medium text-pure-greys-100">{formatDate(course?.updatedAt)}</span>
                    </div>

                    {/* Progress */}
                    <div className="w-full md:w-64 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-pure-greys-400">Progress</span>
                        {
                                        progressData?.map((progress,index)=> {
                                            //show 0 progress if no progress data is available
                                            if(progress?.courseId === course?._id) {
                                                return (
                                                    <div key={index}>
                                                        <p>Completed: {progress?.completedVideos?.length} / {totalNoOfLectures(course)}</p>
                                                        <ProgressBar
                                                            completed={progress?.completedVideos?.length/totalNoOfLectures(course)*100}
                                                            total={progress?.total}
                                                            height="8px"
                                                            isLabelVisible={false}
                                                            isAnimated={true}
                                                            baseColor="#374151"
                                                            bgColor="#8b5cf6"
                                                            className="rounded-full"
                                                            />
                                                    </div>
                                                )
                                            }
                                            return null;
                                        }
                                        )
                                    }
                      </div>
                      {/* <ProgressBar 
                        completed={course?.progressPercentage || 0}
                        height="8px"
                        isLabelVisible={false}
                        isAnimated={true}
                        baseColor="#374151"
                        bgColor="#8b5cf6"
                        className="rounded-full"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600/20 to-emerald-600/20 rounded-xl blur-sm" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EnrolledCourses


const ShimmerCourseCard = () => {
  return (
    <div className="group relative bg-gray-800 rounded-xl p-5 border border-richblack-700 animate-pulse">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Thumbnail */}
        <div className="relative overflow-hidden rounded-lg w-full md:w-48 flex-shrink-0 bg-richblack-700 h-40"></div>

        {/* Course Info */}
        <div className="flex-1 w-full space-y-4">
          <div>
            <div className="h-6 bg-richblack-700 rounded w-3/4"></div>
            <div className="h-4 bg-richblack-700 rounded w-5/6 mt-2"></div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Duration */}
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-richblack-700 rounded-full"></div>
              <div className="h-4 bg-richblack-700 rounded w-16"></div>
            </div>

            {/* Progress */}
            <div className="w-full md:w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <div className="h-4 bg-richblack-700 rounded w-16"></div>
                <div className="h-4 bg-richblack-700 rounded w-12"></div>
              </div>
              <div className="h-2 bg-richblack-700 rounded-full w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

