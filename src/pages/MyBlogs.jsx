import React, { useEffect, useState } from "react";
import { deleteBlogAPI, getMyBlogsAPI } from "../services/apiCalls/blogCall";

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
  Settings,
  Trash2,
  Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "../redux/slices/blogSlice";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const {blog} = useSelector  ((state) => state.blog);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await getMyBlogsAPI();
        console.log("myBlogs", response?.blogs);
        setMyBlogs(response?.blogs || []);
        dispatch(setBlog(response?.blogs || []));
      } catch (error) {
        console.error("Error fetching my blogs:", error);
        setMyBlogs([]);
        dispatch(setBlog([]));
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  const handleDeleteBlog = async (id) => {
    setLoading(true);
    try {
      await deleteBlogAPI(id);
      setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToEditBlog = (slug) => {
    navigate(`/dashboard/edit-blog/${slug}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const categories = [
    "All",
    ...new Set(myBlogs.map((blog) => blog?.category).filter(Boolean)),
  ];

  const filteredBlogs = myBlogs.filter((blog) => {
    if (!blog) return false;
    const matchesSearch =
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const clearSearch = () => {
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
          <div
            className="absolute inset-2 w-16 h-16 border-4 border-transparent border-t-pink-500 border-l-green-500 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Edit3 className="w-8 h-8 text-blue-500 animate-pulse" />
          </div>
        </div>
        <div className="ml-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            Loading Your Articles
          </h2>
          <p className="text-gray-400">Preparing your content dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-60">
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
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-pink-300 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-2 h-2 bg-[#018701] rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-3 h-3 bg-[#93097c] rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Header Section */}
      <header className="relative pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-blue-500/20 rounded-full">
              <Edit3 className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-300">
                My Content
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black mb-2 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                My
              </span>{" "}
              <span className="text-white">Creative</span>
              <br />
              <span className="bg-gradient-to-r from-[#215f3b] to-blue-500 bg-clip-text text-transparent">
                Stories
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Manage and edit your published articles. Your creative journey
              and storytelling dashboard.
            </p>

            {/* Create New Blog Button */}
            <div className="mb-8">
              <button 
                onClick={() => navigate("/dashboard/create-blog")}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500/70 to-purple-500/60 rounded-3xl font-semibold text-white shadow-sm shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300"
              >
                <PenTool className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span className="text-lg">Create New Blog</span>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/35 to-purple-500/40 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center md:gap-8 gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{myBlogs.length} My Articles</span>
              </div>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-pink-500" />
                <span className="font-medium">Ready to Edit</span>
              </div>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="font-medium">Your Portfolio</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="relative">
          <div className="relative bg-gradient-to-br from-[#1A1A1A]/90 to-[#0F0F0F]/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Premium Search Bar */}
              <div className="relative flex-1">
                <div className="relative group">
                  {/* Search Input Container */}
                  <div className="relative bg-gradient-to-br from-[#0A0A0A] to-[#111111] border border-gray-600/50 rounded-2xl overflow-hidden group-hover:border-blue-500/30 transition-all duration-500">
                    <div className="flex items-center">
                      <div className="pl-6 pr-4 py-5">
                        <Search className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                      </div>

                      <input
                        type="text"
                        placeholder="Search your articles, topics, or content..."
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
                  </div>
                </div>
              </div>

              {/* Enhanced Category Filter */}
              <div className="relative">
                <div className="relative group">
                  {/* Select Container */}
                  <div className="relative bg-gradient-to-br from-[#0A0A0A] to-[#111111] border border-gray-600/50 rounded-2xl overflow-hidden group-hover:border-pink-500/30 transition-all duration-500">
                    <div className="flex items-center">
                      <div className="pl-6 pr-4 py-5">
                        <Filter className="w-6 h-6 text-gray-400 group-hover:text-pink-500 transition-colors duration-300" />
                      </div>

                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="flex-1 py-5 pr-4 bg-transparent text-white focus:outline-none appearance-none min-w-[200px] cursor-pointer text-lg font-medium"
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
                        <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-pink-500 transition-colors duration-300 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Search Stats */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700/30">
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-500 font-medium">
                    {filteredBlogs.length} articles found
                  </span>
                </span>
                {searchTerm && (
                  <span className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-full">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-300">
                      Searching for "
                      <span className="text-blue-500 font-medium">
                        {searchTerm}
                      </span>
                      "
                    </span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <Settings className="w-4 h-4 text-pink-500" />
                <span>Your content management hub</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <article
              key={blog._id}
              onMouseEnter={() => setHoveredCard(blog._id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative cursor-pointer"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Card Container */}
              <div className="relative bg-gradient-to-br from-[#1A1A1A]/90 to-[#0F0F0F]/80 backdrop-blur-sm border border-gray-600/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 h-[535px] flex flex-col">
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
                    <span className="px-3 py-1.5 bg-gradient-to-r from-blue-700 to-[#1A1A1A]/80 text-white text-sm font-medium rounded-full border border-white/20 backdrop-blur-sm shadow-lg">
                      {blog.category}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                    onClick={() => navigate(`/blogs/${blog.slug}`)}
                    className="p-2 bg-black/30 backdrop-blur-sm rounded-full border border-white/10 hover:bg-black/50 transition-colors opacity-70 hover:opacity-100">
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                    <button 
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="p-2 bg-[#960606] backdrop-blur-sm rounded-full border border-white/10 hover:bg-[#9e0909] transition-colors opacity-70 hover:opacity-100">
                      <Trash2 fill="#960606" className="w-4 h-4 " />
                    </button>
                  </div>

                  {/* Reading Time */}
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full border border-white/10">
                      <Clock className="w-3 h-3 text-green-500" />
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
                      const colorClass = tagColors[tagIndex % tagColors.length];

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
                  <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-800/50">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={blog.author?.image}
                          alt={`${blog.author?.firstName} ${blog.author?.lastName}`}
                          className="w-12 h-12 rounded-full object-cover border border-gray-700"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1A1A1A]"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {blog.author?.firstName} {blog.author?.lastName}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center gap-x-1">
                          <Calendar className="w-3 h-3 inline-block" />
                          {formatDate(blog.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-gray-500">
                      <div className="flex items-center gap-1 hover:text-pink-500 transition-colors cursor-pointer">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          {blog.likes?.length || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          {blog.comments?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Edit Blog Button - Right Aligned */}
                  <div className="flex justify-end">
                    <div 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-richblack-800 to-richblue-800 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 cursor-pointer mb-3"
                      onClick={() => navigateToEditBlog(blog.slug)}
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Blog</span>
                      <div className="group-hover:block hidden">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1A1A1A] border border-gray-800 rounded-2xl mb-6">
              <Edit3 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No Articles Found
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              {myBlogs.length === 0 
                ? "You haven't created any articles yet. Start your writing journey today!"
                : "We couldn't find any articles matching your search. Try different keywords or browse all categories."
              }
            </p>
            {myBlogs.length === 0 && (
              <button 
                onClick={() => navigate("/dashboard/create-blog")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                <PenTool className="w-4 h-4" />
                <span>Write Your First Blog</span>
              </button>
            )}
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

export default MyBlogs;