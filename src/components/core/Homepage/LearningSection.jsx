
import React, { useEffect, useState } from "react";
import HighlightText from "./HighlightText";
import {
  FaRupeeSign,
  FaUserPen,
  FaStar,
  FaArrowRight,
  FaGraduationCap,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSearch, FaTimes } from "react-icons/fa";
import { getAllCourses } from "../../../services/apiCalls/courseCall";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PlacementSection from "./PlacementSection";

function LearningSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  },[])
  const navigate = useNavigate();

  async function fetchAllCourses() {
    try {
      setLoading(true);
      const response = await getAllCourses();
      if (response) {
        setCourses(response.slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-[#1A1A2E]/60 backdrop-blur-sm rounded-2xl p-6 animate-pulse"
        >
          <div className="h-48 bg-[#2D2D42] rounded-xl mb-4"></div>
          <div className="h-4 bg-[#2D2D42] rounded mb-2"></div>
          <div className="h-3 bg-[#2D2D42] rounded mb-3 w-2/3"></div>
          <div className="h-3 bg-[#2D2D42] rounded mb-4 w-1/2"></div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative py-20 w-screen overflow-hidden">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `linear-gradient(rgba(65,218,151,0.4) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(11,228,170,0.3) 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
        }}
      ></div>

      <div className="relative  mx-auto px-4 sm:px-24 lg:px-32 ">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
           <div className="text-center mb-20">
          <div className="inline-block">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight
                         transform transition-all duration-1000 ease-out ${
                           isVisible
                             ? "translate-y-0 opacity-100"
                             : "translate-y-8 opacity-0"
                         }`}
              style={{ textShadow: "0 0 40px rgba(255,255,255,0.1)" }}
            >
              Unlock Your Potential
            </h1>

            {/* Animated Decorative Elements */}
            <div
              className={`flex items-center justify-center space-x-4 transform transition-all duration-1000 delay-300 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-32 animate-pulse"></div>

              {/* Animated Center Dots */}
              <div className="flex space-x-2">
                {[0, 100, 200].map((delay, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    style={{
                      animation: `pulse 2s ease-in-out infinite ${delay}ms`,
                    }}
                  />
                ))}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1 max-w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
        </motion.div>

        {/* Courses Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
          >
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <motion.div
                  key={course._id}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="group bg-gradient-to-br from-[#0b0b0f] to-[#08090c] rounded-2xl border border-[#2D2D42]/50 hover:border-[#6366F1]/50 transition-all duration-500 overflow-hidden relative cursor-pointer h-[335px]"
                >
                  {/* Course Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-40 w-full object-cover "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  </div>

                  {/* Course Content */}
                  <div className="p-3">
                    <h3 className="text-[#FFFFFF] text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#6366F1] transition-colors duration-300">
                      {course.title || "Course Title"}
                    </h3>

                    {/* Instructor */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-[#6366F1]/20 rounded-full">
                        <FaUserPen className="text-[#6366F1] text-sm" />
                      </div>
                      <span className="text-[#9CA3AF] text-sm">
                        {course.instructor?.firstName}{" "}
                        {course.instructor?.lastName}
                      </span>
                    </div>
                    
                    {/* Price Badge */}
                    <div className="  text-white rounded-full text-lg font-semibold flex items-center gap-1">
                      <FaRupeeSign className="text-lg text-green-600" />
                      {course.price || "Free"}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-[#F59E0B] text-sm" />
                        <span className="text-[#FFFFFF] text-sm font-medium">
                          {GetAvgRating(course.ratingAndReview) || "4.5"}
                        </span>
                      </div>
                      <div className="text-[#6B7280] text-sm">
                        ({course.ratingAndReview?.length || "0"} reviews)
                      </div>
                    </div>

                 
                  </div>
                  {/* Hover Arrow */}
                <div
                onClick={() => navigate(`/courses/${course._id}`)}
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="px-3 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-[#6B7280] text-lg mb-4">
                  No courses available at the moment
                </div>
                <p className="text-[#9CA3AF]">
                  Check back later for new courses
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={() => navigate("/courses")}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] text-white px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#6366F1]/25 hover:scale-105"
          >
            <span className="relative z-10">Explore All Courses</span>
            <FaArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />

            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </motion.div>
      </div>
       {/* Placement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <PlacementSection />
        </motion.div>
    </section>
  );
}

export default LearningSection;
