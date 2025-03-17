
import  GetAvgRating  from "../utils/avgRating";
import { Link } from "react-router-dom";
import RatingStars from "../components/common/RatingStars";
import { FaRupeeSign } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";

import { useState } from "react";
import { useEffect } from "react";

const CourseCard = ({ course }) => {
    const [avgRaingCount, setAvgRatingCount] = useState(0);
    useEffect(() => {
      const count = GetAvgRating(course?.ratingAndReview);
      setAvgRatingCount(count);
    }, [course]);
    return (
      <div className=" bg-richblack-800 p-4 rounded-xl shadow-lg hover:shadow-xl duration-300 ease-in-out">
      <Link to={`/courses/${course?._id}`} className="no-underline">
        <div>
          <div className="mb-4">
            <img
              src={course?.thumbnail}
              alt="Course Thumbnail"
              className="h-[250px] w-full rounded-xl object-cover"
            />
          </div>
          <div className="px-2">
            <p className="text-[#FFFFFF] text-xl font-semibold mb-2 truncate">
              {course?.title || "Course Title"}
            </p>
            <p className="text-[#BBBBBB] text-sm mb-3 flex items-center gap-2">
            <FaUserPen />
              <span>{course?.instructor?.firstName} {course?.instructor?.lastName}</span>
            </p>
            <div className="flex items-center gap-x-3 text-[#FFD700] mb-3">
              <span className="text-[#FFFFFF] text-sm font-medium">{avgRaingCount || 0}</span>
              <RatingStars Review_Count={avgRaingCount} />
              <span className="text-[#888888] text-sm">({course?.ratingAndReview?.length || 0} Reviews)</span>
            </div>
            <p className="text-[#FFFFFF] text-lg font-bold flex items-center">
              <FaRupeeSign className="text-[#27AE60]" /> {course?.price || "0"}
            </p>
          </div>
        </div>
      </Link>
    </div>
    );
  };
  
  export default CourseCard;