import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBlogBySlug,
  toggleLike,
  addComment,
} from "../services/apiCalls/blogCall";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import {
  Heart,
  MessageCircle,
  Eye,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Bookmark,
  ArrowLeft,
  Send,
  ThumbsUp,
  MoreHorizontal,
  Sparkles,
  TrendingUp,
  Copy,
  Twitter,
  Facebook,
  Linkedin,
  BookOpen,
  Star,
  Zap,
  Coffee,
} from "lucide-react";
import { useSelector } from "react-redux";
import { comment } from "postcss";

function Blog() {
  const { user } = useSelector((state) => state.auth);
  const { slug } = useParams();
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(true);
  const [index, setIndex] = useState(4);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const data = await getBlogBySlug(slug);
        setBlogData(data);
        setIsLiked(data?.likes?.some((like) => like.user === user?._id));
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug]);

   useEffect(() => {
    const containers = document.querySelectorAll(".ql-code-block-container");

    containers.forEach((container) => {

      const button = document.createElement("button");
      button.innerText = "Copy";
      button.className = "copy-btn";
        // Add click event listener
         button.addEventListener("click", () => {
        const codeLines = Array.from(
          container.querySelectorAll(".ql-code-block")
        ).map((div) => div.innerText);

        const code = codeLines.join("\n");

        if (code.trim()) {
          navigator.clipboard.writeText(code);
          button.innerText = "Copied!";
          setTimeout(() => (button.innerText = "Copy"), 2000);
        }
      });

      // Ensure container is positioned for absolute button placement
      container.style.position = "relative";
      container.appendChild(button);

    });
  }, [blogData]);


  // console.log("isLiked", isLiked);
  console.log("blogData", blogData);
  const handleLike = async () => {
    const isLiked = blogData?.likes?.filter((like) => like.user === user?._id);
    // I am already Liked
    if (isLiked.length > 0) {
      console.log("I am Liked");
      setIsLiked(false);
      let newLikes = blogData?.likes?.filter((like) => like.user !== user?._id);
      setBlogData((prev) => ({
        ...prev,
        likes: newLikes,
      }));
    }
    // I am not Liked
    else {
      setIsLiked(true);
      const newLike = {
        _id: crypto.randomUUID(), // Generate a unique ID
        user: user?._id,
        likedAt: new Date().toISOString(),
      };

      setBlogData((prev) => ({
        ...prev,
        likes: [...(prev.likes || []), newLike],
      }));
    }
    await toggleLike(blogData._id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        _id: Date.now().toString(),
        user: {
          _id: user?._id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          image: user?.image,
        },
        content: newComment,
        createdAt: new Date().toISOString(),
      };

      setBlogData((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), newCommentObj],
        commentCount: (prev.commentCount || 0) + 1,
      }));

      setNewComment("");
      await addComment(blogData._id, newComment);
    }
  };
  const handleMoreComments = () => {
    if (index < 6) {
      setIndex(blogData?.comments?.length);
    } else {
      setIndex(5);
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col md:flex-row items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-transparent border-t-[#6366F1]/80 border-r-[#8B5CF6]/85 rounded-full animate-spin"></div>
          <div
            className="absolute inset-2 w-16 h-16 border-4 border-transparent border-t-[#EC4899]/85 border-l-[#10B981]/80 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-[#6366F1] animate-pulse" />
          </div>
        </div>
        <div className="ml-6 hidden md:block">
          <h2 className="text-2xl font-bold text-white mb-1 ">
            Loading Article
          </h2>
          <p className="text-gray-400">Preparing your reading experience...</p>
        </div>
      </div>
    );
  }
  // console.log("blogData", blogData);
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-60">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 3px 3px, rgba(102, 55, 241, .4) 2px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}z
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

      {/* Main Content */}
      <motion.div
        className="max-w-6xl mx-auto px-6 pt-16 pb-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="mb-20" variants={itemVariants}>
          {/* Category and Reading Stats */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center md:gap-4 gap-2">
              <span className="md:px-4 md:py-2 bg-gradient-to-r from-[#6366F1]/30 to-[#8B5CF6]/40 text-white md:text-sm text-xs font-medium rounded-full border border-white/20 backdrop-blur-sm shadow-lg flex items-center px-3 py-2">
                <Sparkles className="w-4 h-4 inline mr-2" />
                {blogData.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-gray-400 ">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-[#10B981]" />
                  <span>{blogData.views || 0} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#6366F1]" />
                  <span>{blogData.readingTime || 5} min</span>
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="hidden md:inline-flex items-center gap-2 md:px-4 md:py-2 px-2 bg-[#1A1A1A] border border-[#6366F1]/20 rounded-full">
              <Zap className="w-4 h-4 text-[#6366F1]" />
              <span className="md:text-sm text-xs md:font-medium text-gray-300">
                Featured Story
              </span>
              <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse hidden md:block" ></div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-black mb-8 leading-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-[#6366F1]/80 via-[#8B5CF6]/85 to-[#EC4899]/80 bg-clip-text text-transparent">
              {blogData.title}
            </span>
          </motion.h1>

          {/* Author and Date */}
          <motion.div
            className="flex items-center justify-between mb-12"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={blogData.author?.image}
                    alt={blogData.author?.firstName}
                  />
                </div>
                {/* <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#10B981] rounded-full border-2 border-[#0A0A0A]"></div> */}
              </div>
              <div>
                <div className="font-bold text-lg text-white">
                  {blogData.author?.firstName} {blogData.author?.lastName}
                </div>
                <div className="text-sm flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {formatDate(blogData.createdAt)}
                </div>
              </div>
            </div>

            <div className=" items-center gap-3 text-gray-400 hidden md:flex">
              <Coffee className="w-5 h-5 text-[#EC4899]" />
              <span className="text-sm">Perfect for your coffee break</span>
            </div>
          </motion.div>

          {/* Featured Image */}
          {blogData.featuredImage && (
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl mb-16"
              variants={itemVariants}
            >
              <img
                src={blogData.featuredImage}
                alt={blogData.title}
                className="w-full h-80 md:h-[484px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              {/* Action Buttons on Image */}
              <div className="absolute top-6 right-6 flex gap-3">
                <button
                  onClick={handleBookmark}
                  className="p-3 bg-black/30 backdrop-blur-sm rounded-full border border-white/10 hover:bg-black/50 transition-colors opacity-70 hover:opacity-100"
                >
                  <Bookmark
                    className={`w-5 h-5 ${
                      isBookmarked
                        ? "text-[#6366F1] fill-current"
                        : "text-white"
                    }`}
                  />
                </button>
                <button className="p-3 bg-black/30 backdrop-blur-sm rounded-full border border-white/10 hover:bg-black/50 transition-colors opacity-70 hover:opacity-100">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Article Content */}
        <motion.div className="mb-16" variants={itemVariants}>
          <div className="relative bg-gradient-to-br from-[#1A1A1A]/90 to-[#0F0F0F]/80 backdrop-blur-sm border border-richblack-600/50 rounded-3xl p-0 md:p-12 shadow-2xl ">
            <div className="relative ">
              <div  className="blog-content dark-theme " dangerouslySetInnerHTML={{ __html: blogData.content }} />
              {/* {} */}
            </div>
          </div>
        </motion.div>

        {/* Tags */}
        {blogData.tags && blogData.tags.length > 0 && (
          <motion.div className="mb-16" variants={itemVariants}>
            <div className="relative bg-gradient-to-br from-[#1A1A1A]/90 to-[#0F0F0F]/80 backdrop-blur-sm border border-richblack-600/50 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                <Tag className="w-6 h-6 text-[#8B5CF6]" />
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-3">
                {blogData.tags.map((tag, index) => {
                  const tagColors = [
                    "from-[#6366F1]/20 to-[#8B5CF6]/10 border-[#6366F1]/30 text-[#A5B4FC]",
                    "from-[#EC4899]/20 to-[#F472B6]/10 border-[#EC4899]/30 text-[#FBCFE8]",
                    "from-[#10B981]/20 to-[#34D399]/10 border-[#10B981]/30 text-[#A7F3D0]",
                    "from-[#F59E0B]/20 to-[#FBBF24]/10 border-[#F59E0B]/30 text-[#FDE68A]",
                  ];
                  const colorClass = tagColors[index % tagColors.length];

                  return (
                    <motion.span
                      key={index}
                      className={`inline-flex items-center gap-0 px-2 py-1 bg-gradient-to-r ${colorClass} border rounded-full text-sm font-medium backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-sm`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
                      {tag}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Engagement Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <div className="relative bg-gradient-to-br from-[#1A1A1A]/90 to-[#0F0F0F]/80 backdrop-blur-sm border border-richblack-600/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 font-medium border ${
                    isLiked
                      ? "bg-gradient-to-r from-[#EC4899]/20 to-[#F472B6]/10 border-[#EC4899]/30 text-[#EC4899]"
                      : "bg-gradient-to-br from-[#1A1A1A] to-[#111111] border-richblack-500/50 text-gray-400 hover:text-[#EC4899] hover:border-[#EC4899]/30"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLiked ? (
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{ color: "#d1003f", fontSize: "22px" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{ color: "#fffeed" , fontSize: "22px"}}
                    />
                  )}
                  {/* <Heart
                    className={`w-5 h-5 ${isLiked ? "bg-[#359f1a]" : ""}`}
                  /> */}
                  <span>{blogData.likes.length || 0}</span>
                </motion.button>

                <motion.button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#111111] border border-richblack-500/50 text-gray-400 hover:text-[#6366F1] hover:border-[#6366F1]/30 transition-all duration-300 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{blogData.comments.length || 0}</span>
                </motion.button>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-500">
                <Star className="w-4 h-4 text-[#EC4899]" />
                <span>Updated {formatDate(blogData.updatedAt)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              className="relative bg-gradient-to-br from-[#1A1A1A]/90 to-[#0F0F0F]/80 backdrop-blur-sm border border-richblack-600/50 rounded-3xl p-8 md:p-12 shadow-2xl"
              initial={{ opacity: 0, height: 0, y: 30 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
                <MessageCircle className="w-7 h-7 text-[#6366F1]" />
                Discussion ({blogData.comments.length || 0})
              </h3>

              {/* Add Comment Form */}
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative bg-gradient-to-br from-[#0A0A0A] to-[#111111] border border-richblack-500/50 rounded-2xl overflow-hidden">
                  <div className="p-6">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Join the conversation..."
                      className="w-full bg-transparent border-none outline-none resize-none text-base leading-relaxed text-white placeholder-gray-400"
                      rows="4"
                    />
                  </div>
                  <div className="flex justify-between items-center px-6 py-4 border-t border-richblack-500/50 bg-gradient-to-r from-transparent to-[#1A1A1A]/30">
                    <span className="text-sm text-gray-500">
                      {newComment.length}/500
                    </span>
                    <motion.button
                      onClick={handleCommentSubmit}
                      disabled={!newComment.trim()}
                      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-sm font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[#6366F1]/25"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="w-4 h-4" />
                      Comment
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Comments List */}
              <div className="space-y-6">
                {blogData.comments &&
                  blogData.comments.slice(0, index).map((comment, index) => (
                    <motion.div
                      key={comment._id}
                      className="bg-gradient-to-br from-[#0A0A0A]/80 to-[#111111]/60 border border-richblack-600/30 rounded-2xl p-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          <img
                            className="w-full h-full object-cover rounded-full"
                            src={comment.user?.image}
                            alt=""
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-white">
                              {comment.user?.firstName}
                              {comment.user?.lastName}
                            </span>
                            <span className="text-sm text-gray-500">
                              {/* {formatDate(comment.createdAt)} */}
                            </span>
                          </div>

                          <p className="leading-relaxed mb-4 text-gray-300">
                            {comment.content}
                          </p>

                          <div className="flex items-center gap-4">
                            {formatDate(comment.createdAt)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>

              {/* Load More Comments */}
              {blogData.comments.length > 4 && (
                <motion.div
                  className="text-center mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-br from-[#1A1A1A] to-[#111111] border border-richblack-500/50 text-gray-400 hover:text-[#6366F1] hover:border-[#6366F1]/30 rounded-2xl font-medium transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMoreComments()}
                  >
                    {index > 5 ? "Load More" : "No More Comments"}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Blog;
