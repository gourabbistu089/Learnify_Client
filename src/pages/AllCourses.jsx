import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { getAllCourses } from '../services/apiCalls/courseCall';
import GetAvgRating from '../utils/avgRating';
import RatingStars from '../components/common/RatingStars';
import { FaRupeeSign } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaTimes } from 'react-icons/fa';
import HighlightText from '../components/core/Homepage/HighlightText';
import { FiUser } from "react-icons/fi";
import CodeBackground from '../components/CodeBackground';

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchAllCourses() {
    setLoading(true);
    const response = await getAllCourses();
    if (response) {
      setCourses(response);
      setFilteredCourses(response);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const handleSearch = () => {
    setSearchQuery(searchTerm);
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
    setSearchTerm('');
  };

  if (loading) {
    return <ShimmerCoursesGrid />;
  }

  // Scroll Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="p-8 bg-gradient-to-tr from-[#18f1C14] to-[#040dD12] min-h-screen">
      <CodeBackground className="absolute w-screen min-h-screen bg-gray-800 overflow-hidden " />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="mb-12 relative"
        >
          <div className="absolute -left-4 -top-4 w-24 h-24 bg-[#1783d0]/10 blur-3xl rounded-full" />
          <h2 className="text-5xl font-bold mb-3 font-serif">
            <HighlightText text="Course Lists" />
          </h2>
          <div className="flex items-center gap-2 text-[#A0A0A0]">
            <FaHome size={20} className="text-[#1783d0]" />
            <span className="text-sm tracking-wide">Home / Courses</span>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="flex md:items-center md:justify-between mb-6 md:flex-row flex-col-reverse gap-3 "
        >
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[#333333] w-fit  text-[#FFFFFF] px-4 py-2 rounded-lg shadow-md font-semibold flex items-center gap-2"
            >
              <span className="text-[#39a6b0]">{searchQuery}</span>
              <FaTimes
                className="ml-2 cursor-pointer text-[#f74d4d]"
                size={18}
                onClick={() => {
                  setSearchQuery('');
                  setFilteredCourses(courses);
                }}
              />
            </motion.div>
          )}
          <div className="flex items-center w-full max-w-md bg-[#222222] rounded-lg overflow-hidden ml-auto relative">
            <FaSearch className="mr-2 hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 text-[#224b34]" size={22} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 bg-transparent text-[#FFFFFF] placeholder-[#888888] focus:outline-none md:ml-10"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              className="bg-[#64ffa4] px-4 py-3 text-[#121212] font-bold flex items-center"
            >
              Search
            </motion.button>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course._id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#12D8FA]/30 hover:shadow-2xl hover:shadow-[#64ffa4]/10 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#12D8FA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Link to={`/courses/${course._id}`} className="no-underline">
                <div className="relative overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt="Course Thumbnail"
                    className="w-full h-44 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 relative">
                  <h3 className="text-[#F5F5F5] text-lg font-bold mb-2 line-clamp-2 leading-tight tracking-wide">
                    {course.title || "Course Title"}
                  </h3>
                  <div className="flex items-center gap-2 text-[#A0A0A0] mb-2">
                    <FiUser className="flex-shrink-0 text-[#12D8FA]/80" />
                    <span className="text-sm truncate font-medium">
                      {course.instructor?.firstName} {course.instructor?.lastName}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[#FFD700] font-semibold text-sm">
                      {GetAvgRating(course.ratingAndReview) || 0}
                    </span>
                    <RatingStars Review_Count={GetAvgRating(course.ratingAndReview)} Star_Size={16} />
                    <span className="text-[#707070] text-sm">
                      ({course.ratingAndReview?.length || 0})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#F5F5F5] text-xl font-bold">
                    <FaRupeeSign className="text-[#27AE60] shrink-0" />
                    <span className="bg-gradient-to-r from-[#1ae970] to-[#1dbe60] text-transparent bg-clip-text">
                      {course.price || "0"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results Animation */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
            className="col-span-full text-center py-20 space-y-6"
          >
            <div className="text-6xl text-[#FFD700]/30 mx-auto">🎓</div>
            <p className="text-2xl text-[#707070] font-medium">
              No courses found matching "<span className="text-[#FFD700]">{searchQuery}</span>"
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AllCourses;

const ShimmerCourseCard = () => {
  return (
    <div className="relative bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
      <div className="w-full h-56 bg-gradient-to-r from-[#222222] via-[#333333] to-[#222222] animate-shimmer" />
      <div className="p-5">
        <div className="h-6 bg-gradient-to-r from-[#333333] via-[#444444] to-[#333333] w-3/4 rounded-lg animate-shimmer mb-3" />
        <div className="h-4 bg-gradient-to-r from-[#444444] via-[#555555] to-[#444444] w-1/2 rounded-lg animate-shimmer mb-4" />
        <div className="h-5 bg-gradient-to-r from-[#12d7fac1]/70 via-[#12d7faea]/60 to-[#12d7fac1]/70 w-16 rounded-lg animate-shimmer mb-4" />
        <div className="h-5 bg-gradient-to-r from-[#27ae5f92]/70 via-[#27ae60]/60 to-[#27ae5f92]/70 w-20 rounded-lg animate-shimmer" />
      </div>
    </div>
  );
};

const ShimmerCoursesGrid = () => {
  return (
    <div className="p-8 bg-gradient-to-tr from-[#181C14] to-[#040D12] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 relative">
          <div className="absolute -left-4 -top-4 w-24 h-24 bg-[#12D8FA]/70 blur-3xl rounded-full" />
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r h-4 from-[#37f8c4f5]/60 to-[#0fc7f0f5]/70 font-serif"></h2>
          <div className="flex items-center gap-2 text-[#A0A0A0]">
            <div className="h-6 w-6 bg-[#12D8FA]/60 rounded-full animate-shimmer" />
            <div className="h-4 w-32 bg-gradient-to-r from-[#444444] via-[#555555] to-[#444444] rounded-lg animate-shimmer" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center w-full max-w-md bg-[#222222] rounded-lg overflow-hidden ml-auto relative">
            {/* <div className="mr-2 absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 bg-gradient-to-r from-[#12d7faea]/70 via-[#12d7fac1]/60 to-[#12d7faea]/70 rounded-full animate-shimmer" /> */}
            <div className="h-12 w-full bg-gradient-to-r from-[#333333] via-[#444444] to-[#333333] rounded-lg animate-shimmer" />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <ShimmerCourseCard key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};