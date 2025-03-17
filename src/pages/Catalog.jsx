import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCatalogsPageData } from "../services/apiCalls/courseCall";
import RatingStars from "../components/common/RatingStars";
import GetAvgRating from "../utils/avgRating";
import { FaRupeeSign } from "react-icons/fa";
import { FaHome, FaBook, FaClock, FaStar } from "react-icons/fa";
import CourseSlicer from "./CourseSlicer";
import CourseCard from "./CourseCard";
import HighlightText from "../components/core/Homepage/HighlightText";



function Catalog() {
  const { catalogName, categoryId } = useParams();
  const [catalogs, setCatalogs] = useState(null);

  useEffect(() => {
    const fetchCatalogs = async () => {
      const response = await getCatalogsPageData({ categoryId });
      if (response) {
        setCatalogs(response);
      }
    };
    fetchCatalogs();
  }, [categoryId]);

  if (!catalogs) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-richblack-800 text-richblue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-caribbeangreen-200"></div>
      </div>
    );
  }

  return (
    <div className="bg-richblack-900 text-richblue-50 min-h-screen px-6 md:px-10">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm gap-2 py-4">
        <FaHome className="text-caribbeangreen-300" />
        <span>/</span>
        <span>Catalog</span>
        <span>/</span>
        <span className="text-caribbeangreen-100">{catalogName}</span>
      </div>

      {/* Catalog Information */}
      <div className="py-6">
        <h1 className="text-2xl md:text-3xl font-edu-sa mb-2">
          <HighlightText text={catalogs?.selectedCourses[0]?.title}/>
        </h1>
        <p className="text-pure-greys-300 text-sm md:text-base leading-6 mb-4">
          {catalogs?.selectedCourses[0]?.description}
        </p>
      </div>

      {/* Section 1 - Starter Courses */}
      <div className="my-10">
        <div className="text-lg font-inter mb-4 text-caribbeangreen-100">
          Courses to Get You Started
        </div>
        <div className="flex justify-start gap-4 mb-4">
          <button className="bg-caribbeangreen-400 text-black py-2 px-4 rounded-lg hover:bg-caribbeangreen-500">
            Most Popular
          </button>
          <button className="bg-richblack-700 text-richblue-50 py-2 px-4 rounded-lg hover:bg-richblue-800">
            New
          </button>
        </div>
        <CourseSlicer Courses={catalogs?.selectedCourses} />
      </div>

      {/* Section 2 - Top Courses */}
      <div className="my-10">
        <h2 className="text-xl font-inter mb-4 text-yellow-50">
          Others Courses 
        </h2>
        <CourseSlicer Courses={catalogs?.differentCourses} />
      </div>

      {/* Section 3 - Frequently Bought Together */}
      <div className="my-10">
        <h2 className="text-xl font-inter mb-4 text-caribbeangreen-100">
          Frequently Bought Together
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {catalogs?.topSellingCourses
            ?.slice(0, 6)
            ?.map((course, index) => (
              <CourseCard key={index} course={course} />

            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="py-10 text-center text-richblue-100 text-sm">
        <p>© 2025 EduOnline. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Catalog;








