import React, { useState, useEffect } from "react";
import {
  Code,
  Palette,
  Rocket,
  Brain,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  BookOpen,
  ChevronRight,
  Eye,
  Heart,
  User,
  Zap,
  Globe,
  Layers,
} from "lucide-react";
import HighlightText from "./HighlightText";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
const BlogExplorerSection = ({ blogs, loading, setLoading }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const second = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      clearTimeout(second);
    };
  }, []);

  console.log("blogs", blogs);
  const navigate = useNavigate();
  // Get unique categories from blogs
  const categories = [
    "all",
    ...new Set(blogs.map((blog) => blog.category).filter(Boolean)),
  ];

  // Category icons mapping
  const categoryIcons = {
    all: BookOpen,
    Programming: Code,
    "Data Science": Palette,
    Technology: Rocket,
    "AI/ML": Brain,
    other: TrendingUp,
    lifestyle: Heart,
    science: Zap,
    "Web Development": Globe,
    default: Layers,
  };

  // Filter blogs based on active tab
  const filteredBlogs =
    activeTab === "all"
      ? blogs.slice(0, 4) // Show 4 blogs for 'all' tab
      : blogs.filter((blog) => blog.category === activeTab).slice(0, 4);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleBlogClick = (slug) => {
    navigate(`/blogs/${slug}`);
  };

  const getCategoryIcon = (category) => {
    const IconComponent = categoryIcons[category] || categoryIcons.default;
    return IconComponent;
  };

  if (!blogs || blogs.length === 0) {
    return (
      <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1A1A1A] border border-[#6366F1]/20 rounded-2xl mb-6">
              <BookOpen className="w-8 h-8 text-[#6366F1]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No Blogs Available
            </h3>
            <p className="text-gray-400">
              Check back later for exciting content!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-[#0a0a0a56] relative overflow-hidden  w-screen">
      {/* Background Elements */}
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(58, 158, 159, 0.9) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
      <div className="absolute inset-0 opacity-20">
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

      <div className="md:px-32 p-4">
        {/* Header */}
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
              Explore Latest Blogs
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

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center md:gap-3 gap-1 mb-12">
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category);
            const isActive = activeTab === category;

            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`relative group flex items-center gap-2 md:px-6 md:py-3 px-3 py-2 rounded-2xl font-semibold md:text-sm text-xs transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg hover:scale-105`
                    : "bg-[#1A1A1A]/60 text-gray-400 hover:text-white hover:bg-[#1A1A1A] border border-gray-800/50 hover:border-gray-700/50"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="capitalize md:block hidden">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Blog Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-200 `}
        >
          {filteredBlogs.map((blog, index) => (
            <article
              key={blog._id}
              onClick={() => handleBlogClick(blog.slug)}
              className="group relative cursor-pointer"
            >
              {/* Card Container */}
              <div className="relative bg-gradient-to-br from-[#1A1A1A]/80 to-[#0F0F0F]/60 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#a44be0]/60 hover:shadow-xl hover:shadow-[#6366F1]/10 hover:-translate-y-1 h-[335px]">
                {/* Featured Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    {(() => {
                      return (
                        <span className="px-2 py-1 text-xs  rounded-lg backdrop-blur-sm border text-white bg-gradient-to-r from-[#6366F1] to-[#bd05aa] font-semibold">
                          {blog.category}
                        </span>
                      );
                    })()}
                  </div>

                  {/* Reading Time */}
                  <div className="absolute bottom-3 right-3">
                    <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10">
                      <Clock className="w-3 h-3 text-[#10B981]" />
                      <span className="text-xs text-white font-medium">
                        {blog.readingTime || "5"}m
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between h-auto">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#A5B4FC] transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                      {blog.excerpt || blog.content?.substring(0, 100) + "..."}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={blog.author?.image}
                        alt={`${blog.author?.firstName} ${blog.author?.lastName}`}
                        className="w-6 h-6 rounded-full object-cover border border-gray-700"
                      />
                      <div className="text-xs">
                        <p className="text-white font-medium">
                          {blog.author?.firstName} {blog.author?.lastName}
                        </p>
                        <p className="text-gray-500 flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          {formatDate(blog.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5 bg-red" fill="#ff0000" />
                        <span className="text-xs">
                          {blog.likes?.length || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span className="text-xs">{blog.views || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div
                  onClick={() => handleBlogClick(blog.slug)}
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                >
                  <div className="p-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        {blogs.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => navigate("/blogs")}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] text-white px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#6366F1]/25 hover:scale-105"
            >
              <span className="relative z-10">Explore All Blogs</span>
              <FaArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />

              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(0px);
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
    </section>
  );
};

export default BlogExplorerSection;
