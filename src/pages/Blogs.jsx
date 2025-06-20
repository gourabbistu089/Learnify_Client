import React, { useEffect, useState } from "react";
import {
  getAllBlogs,
  getAllFollowingsBlogs,
} from "../services/apiCalls/blogCall";
import { motion } from "framer-motion";

import {
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Tag,
  ArrowRight,
  User,
  BookOpen,
  Filter,
  Search,
  Sparkles,
  TrendingUp,
  Star,
  Bookmark,
  Share2,
  Zap,
  Coffee,
  ChevronDown,
  X,
  PenTool,
  Edit3,
  LoaderCircle,
  Users,
  SquarePen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [followingBlogs, setFollowingBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(18);
  const [hashMore, setHashMore] = useState(true);
  const [totalBlogs, setTotalBlogs] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("forYou"); // New state for tab management

  const fetchBlogs = async () => {
    try {
      let res = await getAllBlogs(page, limit);
      console.log("Blogs", res);
      const newblogs = res?.blogs || [];
      setBlogs((prev) => [...prev, ...newblogs]);
      const totalPages = res?.pagination?.pages || 1;
      setTotalBlogs(res?.pagination?.total);
      setHashMore(page < totalPages);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const navigateToBlog = (slug) => {
    navigate(`/blogs/${slug}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  // Filter blogs based on user's following list
  const getFollowingBlogs = () => {
    if (!user?.following || !Array.isArray(user.following)) {
      return [];
    }

    return blogs.filter((blog) => {
      return user.following.some(
        (followedUserId) =>
          blog.author?._id === followedUserId ||
          blog.author?.id === followedUserId
      );
    });
  };
  // Update following blogs when blogs or user changes
  useEffect(() => {
    if (activeTab === "following") {
      setFollowingBlogs(getFollowingBlogs());
    }
  }, [blogs, user, activeTab]);

  const getCurrentBlogs = () => {
    return activeTab === "following" ? followingBlogs : blogs;
  };
  const currentBlogs = getCurrentBlogs();
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm(""); // Clear search when switching tabs
    setSelectedCategory("All"); // Reset category filter

    if (tab === "following") {
      setFollowingBlogs(getFollowingBlogs());
    }
  };
  const clearSearch = () => {
    setSearchTerm("");
  };

  const categories = [
    "All",
    ...new Set(blogs.map((blog) => blog?.category).filter(Boolean)),
  ];

  const filteredBlogs = currentBlogs.filter((blog) => {
    if (!blog) return false;
    const matchesSearch =
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading || blogs.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-transparent border-t-[#6366F1] border-r-[#8B5CF6] rounded-full animate-spin"></div>
          <div
            className="absolute inset-2 w-16 h-16 border-4 border-transparent border-t-[#EC4899] border-l-[#10B981] rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-[#6366F1] animate-pulse" />
          </div>
        </div>
        <div className="ml-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            Loading Articles
          </h2>
          <p className="text-gray-400">Preparing your reading experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, .6) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#6366F1] rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-[#EC4899] rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-2 h-2 bg-[#10B981] rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-3 h-3 bg-[#8B5CF6] rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>
      {/* Header Section */}
      <header className="relative pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#6366F1]/20 rounded-full">
              <Zap className="w-4 h-4 text-[#6366F1]" />
              <span className="text-sm font-medium text-gray-300">
                Latest Stories
              </span>
              <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                Discover
              </span>{" "}
              <span className="text-white">Amazing</span>
              <br />
              <span className="bg-gradient-to-r from-[#10B981] to-[#6366F1] bg-clip-text text-transparent">
                Stories
              </span>
            </h1>

            <p className="text-lg md:text-xl text-richblue-50 mb-8 leading-relaxed">
              Explore curated content that inspires, educates, and transforms
              your perspective on technology and design.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center md:gap-8 gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#6366F1]" />
                <span className="font-medium">Articles</span>
              </div>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#EC4899]" />
                <span className="font-medium">Expert Authors</span>
              </div>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
                <span className="font-medium">Weekly Updates</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6">
        {/* Tab Navigation */}
        <div className="flex justify-start mb-8">
          <div className="inline-flex items-center bg-[#1A1A1A]/80 backdrop-blur-sm border border-richblack-600/50 rounded-2xl p-1.5">
            <button
              onClick={() => handleTabChange("forYou")}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === "forYou"
                  ? "bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/15 text-[#A5B4FC] border border-[#6366F1]/30 shadow-lg shadow-[#6366F1]/10"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/30"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>For You</span>
              {activeTab === "forYou" && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 rounded-xl blur-sm"></div>
              )}
            </button>

            <button
              onClick={() => handleTabChange("following")}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === "following"
                  ? " bg-gradient-to-r from-[#6366F1]/40 to-[#8B5CF6]/30 text-[#A5B4FC] border border-[#6366F1]/30 shadow-lg shadow-[#EC4899]/10"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/30"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Following</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="relative">
          <div className="relative bg-gradient-to-br from-[#1A1A1A]/5 to-[#0F0F0F]/5 backdrop-blur-3xl border border-richblack-700/30 rounded-3xl md:p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Premium Search Bar */}
              <div className="relative flex-1">
                <div className="relative group">
                  {/* Animated Border Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] rounded-2xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-full h-full bg-[#0A0A0A] rounded-2xl"></div>
                  </div>

                  {/* Search Input Container */}
                  <div className="relative bg-gradient-to-br from-[#0A0A0A] to-[#111111] border border-richblack-500/50 rounded-2xl overflow-hidden group-hover:border-transparent transition-all duration-500">
                    <div className="flex items-center">
                      <div className="pl-6 pr-4 py-5">
                        <Search className="w-6 h-6 text-gray-400 group-hover:text-[#6366F1] transition-colors duration-300" />
                      </div>

                      <input
                        type="text"
                        placeholder="Search for articles, topics, or authors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 py-5 pr-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg font-medium"
                      />

                      {searchTerm && (
                        <button
                          onClick={clearSearch}
                          className="mr-4 p-2 hover:bg-gray-800/50 rounded-full transition-colors group/clear"
                        >
                          <X className="w-5 h-5 text-gray-400 group-hover/clear:text-white transition-colors" />
                        </button>
                      )}
                    </div>

                    {/* Subtle Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/20 via-transparent to-[#EC4899]/20 opacity-10 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Category Filter */}
              <div className="relative hidden md:block">
                <div className="relative group">
                  {/* Select Container */}
                  <div className="relative bg-gradient-to-br from-[#0A0A0A] to-[#111111] border border-richblack-300/50 rounded-2xl overflow-hidden group-hover:border-transparent transition-all duration-500">
                    <div className="flex items-center">
                      <div className="pl-6 pr-4 py-5">
                        <Filter className="w-6 h-6 text-gray-400 group-hover:text-[#EC4899] transition-colors duration-300" />
                      </div>

                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="flex-1 py-5 pr-4 bg-transparent text-white focus:outline-none appearance-none min-w-[200px] max-w-[230px] md:max-w-full cursor-pointer text-lg font-medium"
                      >
                        {categories.map((category) => (
                          <option
                            key={category}
                            value={category}
                            className="bg-[#1A1A1A] text-white py-3"
                          >
                            {category}
                          </option>
                        ))}
                      </select>

                      <div className="pr-6 py-5">
                        <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-[#EC4899] transition-colors duration-300 pointer-events-none" />
                      </div>
                    </div>

                    {/* Subtle Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#EC4899]/20 via-transparent to-[#6366F1]/20 opacity-10 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Search Stats */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-richblack-200/30">
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#10B981]/10 to-[#10B981]/5 border border-[#10B981]/20 rounded-full">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                  <span className="text-[#10B981] font-medium">
                    {filteredBlogs.length} articles found
                  </span>
                </span>
                {searchTerm && (
                  <span className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#6366F1]/10 to-[#6366F1]/5 border border-[#6366F1]/20 rounded-full">
                    <Sparkles className="w-4 h-4 text-[#6366F1]" />
                    <span className="text-gray-300">
                      Searching for "
                      <span className="text-[#6366F1] font-medium">
                        {searchTerm}
                      </span>
                      "
                    </span>
                  </span>
                )}
                {activeTab === "following" && (
                  <span className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#EC4899]/10 to-[#EC4899]/5 border border-[#EC4899]/20 rounded-full">
                    <Users className="w-4 h-4 text-[#EC4899]" />
                    <span className="text-gray-300">
                      From people you follow
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className=" absolute md:top-10 md:right-8 top-4 right-2">
          <button
            onClick={() => navigate("/dashboard/create-blog")}
            className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#0f172a] via-[#581c87] to-[#0f172a] rounded-xl font-medium text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border border-white/10 hover:border-[#a855f7]/30"
          >
            {/* Lucide PenTool Icon */}
            <SquarePen className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />

            <span className="text-sm font-medium hidden md:block">Create Blog</span>

            {/* Subtle shine effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </button>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-2 pb-20 bg-brown-3000">
        <InfiniteScroll
          dataLength={currentBlogs.length}
          next={fetchBlogs}
          hasMore={hashMore}
          loader={
            <div className="flex justify-center items-center p-6 ">
              {" "}
              {/* Increased padding slightly for better spacing */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  loop: Infinity,
                  ease: "linear",
                  duration: 1,
                }}
              >
                <LoaderCircle
                  size={28}
                  color="#818CF8" // A slightly lighter, vibrant Indigo for better pop on dark backgrounds (Tailwind's indigo-400)
                  className="mr-3"
                />
              </motion.div>
              <h4 className="m-0 text-lg font-medium text-[#D1D5DB]">
                {" "}
                {/* Light gray text (Tailwind's gray-300) */}
                Loading more articles...
              </h4>
            </div>
          }
        >
          <div className="max-w-7xl mx-auto px-2 pb-20 bg-brown-3000">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBlogs.map((blog, index) => (
              <article
                key={blog._id}
                onMouseEnter={() => setHoveredCard(blog._id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigateToBlog(blog.slug)}
                className="group relative cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Card Container */}
                <div className="relative bg-gradient-to-br from-[#1A1A1A]/90 to-[#0F0F0F]/80 backdrop-blur-sm border border-richblack-600/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#6366F1]/30 hover:shadow-lg hover:shadow-[#6366F1]/10 h-[535px] flex flex-col">
                  {/* Featured Image */}
                  <div className="relative h-52 overflow-hidden flex-shrink-0">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-[#6366F1]/60 to-[#8B5CF6]/55 text-white text-sm font-medium rounded-full border border-white/20 backdrop-blur-sm shadow-lg ">
                        {blog.category}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full border border-white/10 hover:bg-black/50 transition-colors opacity-70 hover:opacity-100">
                        <Bookmark className="w-4 h-4 text-white" />
                      </button>
                      <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full border border-white/10 hover:bg-black/50 transition-colors opacity-70 hover:opacity-100">
                        <Share2 className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Reading Time */}
                    <div className="absolute bottom-4 right-4">
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full border border-white/10">
                        <Clock className="w-3 h-3 text-[#10B981]" />
                        <span className="text-xs text-white font-medium">
                          {blog.readingTime}m read
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight">
                      {blog.title}
                    </h2>

                    <p className="text-gray-400 mb-4 line-clamp-2 leading-relaxed text-sm flex-1">
                      {blog.excerpt}
                    </p>

                    {/* Enhanced Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {blog.tags?.slice(0, 3).map((tag, tagIndex) => {
                        const tagColors = [
                          "from-[#6366F1]/20 to-[#8B5CF6]/10 border-[#6366F1]/30 text-[#A5B4FC]",
                          "from-[#EC4899]/20 to-[#F472B6]/10 border-[#EC4899]/30 text-[#FBCFE8]",
                          "from-[#10B981]/20 to-[#34D399]/10 border-[#10B981]/30 text-[#A7F3D0]",
                          "from-[#F59E0B]/20 to-[#FBBF24]/10 border-[#F59E0B]/30 text-[#FDE68A]",
                        ];
                        const colorClass =
                          tagColors[tagIndex % tagColors.length];

                        return (
                          <span
                            key={tagIndex}
                            className={`inline-flex items-center  px-2 py-1.5 bg-gradient-to-r ${colorClass} border rounded-full text-xs font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-sm`}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></div>
                            {tag}
                          </span>
                        );
                      })}
                      {blog.tags?.length > 3 && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-800/40 to-gray-700/30 border border-gray-600/30 text-gray-400 text-xs font-medium rounded-full backdrop-blur-sm">
                          +{blog.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Author and Meta */}
                    <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-800/50">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={blog.author?.image}
                            alt={`${blog.author?.firstName} ${blog.author?.lastName}`}
                            className="w-12 h-12 rounded-full object-cover border border-gray-700"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {blog.author?.firstName} {blog.author?.lastName}
                          </p>
                          <p className="text-xs text-richblack-100 flex items-center gap-x-1">
                            <Calendar className="w-3 h-3 inline-block" />
                            {formatDate(blog.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-gray-500">
                        <div className="flex items-center gap-1 hover:text-[#EC4899] transition-colors cursor-pointer">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs font-medium">
                            {blog.likes?.length || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-[#6366F1] transition-colors cursor-pointer">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs font-medium">
                            {blog.comments?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Read More - Right Aligned */}
                    <div className="absolute right-2 bottom-0">
                      <div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1]/70 via-[#A5B4FC]/60 to-[#8B5CF6]/60 border border-[#6366F1]/30 text-[#d6e4f2] text-sm font-medium rounded-full hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 hover:scale-105 cursor-pointer mb-3"
                        onClick={() => navigateToBlog(blog.slug)}
                      >
                        <span>Read Article</span>
                        <div className="">
                          <ArrowRight className="w-4 h-4 hidden group-hover:block" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          </div>
        </InfiniteScroll>

        {/* Empty State */}
        {filteredBlogs.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1A1A1A] border border-gray-800 rounded-2xl mb-6">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No Articles Found
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              We couldn't find any articles matching your search. Try different
              keywords or browse all categories.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Blogs;
