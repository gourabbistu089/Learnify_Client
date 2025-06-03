import React, { useEffect, useState } from "react";
import {
  MessageCircle,
  Calendar,
  MapPin,
  Eye,
  Heart,
  MessageSquare,
  Users,
  BookOpen,
  Share2,
  MoreHorizontal,
  UserPlus,
  UserCheck,
  Clock,
  Tag,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Star,
  Bookmark,
  Zap,
  Coffee,
  Edit3,
  ChevronDown,
  Filter,
  PenTool,
  Bell,
  Settings,
  Award,
  Trophy,
  Target,
  Briefcase,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  MapPin as LocationIcon,
  Globe,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  X,
  GraduationCap,
  User2,
  ArrowLeft,
} from "lucide-react";
import { getCreatorDetails, toggleFollow } from "../services/apiCalls/profileCall";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/authSlice";

function Creator() {
  const {user} = useSelector((state) => state.auth);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [creatorData, setCreatorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCreatorDetails = async () => {
      setLoading(true);
      const res = await getCreatorDetails(id);
      setCreatorData(res);
      // check followers or not 
      await res?.followers?.map((follower) => follower._id === user._id && setIsFollowing(true));
      setLoading(false);
    };

    fetchCreatorDetails();
  }, [id]);
  // console.log("isFollowing", isFollowing);
  const handleFollow = async() => {
    setIsFollowing(!isFollowing);
    const updatedUser = await toggleFollow(id);
    dispatch(setUser(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const categories = [
    "All",
    ...new Set(
      creatorData?.blogs.map((blog) => blog?.category).filter(Boolean)
    ),
  ];

  const filteredBlogs = creatorData?.blogs.filter((blog) => {
    if (!blog) return false;
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesCategory;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs?.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs?.length / blogsPerPage);
  const totalViews = creatorData?.blogs.reduce(
    (sum, blog) => sum + blog.views,
    0
  );
  const totalLikes = creatorData?.blogs.reduce(
    (sum, blog) => sum + blog.likeCount,
    0
  );
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-transparent border-t-[#6366F1] border-r-[#8B5CF6] rounded-full animate-spin"></div>
          <div
            className="absolute inset-2 w-16 h-16 border-4 border-transparent border-t-[#EC4899] border-l-[#10B981] rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Users className="w-8 h-8 text-[#6366F1] animate-pulse" />
          </div>
        </div>
        <div className="ml-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            Loading Profile
          </h2>
          <p className="text-gray-400">Preparing creator details...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.2) 1px, transparent 0)`,
            backgroundSize: "60px 60px",
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
      </div>

      {/* Message Notification */}
      {showMessage && (
        <div className="fixed top-8 right-8 bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-white px-6 py-3 rounded-2xl shadow-2xl z-50 animate-pulse">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Message feature coming soon! 🚀</span>
          </div>
        </div>
      )}

      {/* Followers Modal */}
      {showFollowers && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#111111] border border-[#2A2A2A] rounded-3xl p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Followers</h3>
              <button
                onClick={() => setShowFollowers(false)}
                className="text-[#888888] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {creatorData?.followers.map((follower) => (
                <div
                  key={follower._id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1A1A]/50 hover:bg-[#1A1A1A]/80 transition-colors"
                >
                  <img
                    src={follower.image}
                    alt={`${follower.firstName} ${follower.lastName}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-white">
                      {follower.firstName} {follower.lastName}
                    </p>
                  </div>
                  <button
                  onClick={()=>{
                    navigate(`/creator/${follower._id}`)
                    setShowFollowers(false)
                  }
                  }
                  className="px-4 py-2 bg-[#7d1385] text-white rounded-lg hover:bg-[#b91cb2] transition-colors">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#111111] border border-[#2A2A2A] rounded-3xl p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Following</h3>
              <button
                onClick={() => setShowFollowing(false)}
                className="text-[#888888] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {creatorData?.following.map((following) => (
                <div
                  key={following._id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1A1A]/50 hover:bg-[#1A1A1A]/80 transition-colors"
                >
                   <img
                    src={following.image}
                    alt={`${following.firstName} ${following.lastName}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-white">
                      {following.firstName} {following.lastName}
                    </p>
                  </div>
                  <button 
                  onClick={()=>{
                    navigate(`/creator/${following._id}`)
                    setShowFollowing(false)
                  }}
                  className="px-4 py-2 bg-[#444444] text-white rounded-lg hover:bg-[#555555] transition-colors">
                   View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-[#1A1A1A]/95 to-[#111111]/90 backdrop-blur-sm border border-[#2A2A2A] rounded-3xl p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/5 via-transparent to-[#EC4899]/5 opacity-60"></div>

          <div className="relative flex flex-col lg:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#EC4899] p-1 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={creatorData?.image}
                  alt={`${creatorData?.firstName} ${creatorData?.lastName}`}
                  className="w-full h-full rounded-full object-cover bg-[#1A1A1A]"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#23c952] to-[#04d35e] rounded-full p-2">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-4">
                <h1 className="text-3xl lg:text-4xl font-black mb-2 leading-tight">
                  <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                    {creatorData?.firstName}
                  </span>{" "}
                  <span className="text-white">{creatorData?.lastName}</span>
                </h1>

                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A]/60 border border-[#6366F1]/20 rounded-full">
                    <Sparkles className="w-4 h-4 text-[#FBBF24]" />
                    <span className="text-[#FBBF24] font-medium capitalize text-sm">
                      {creatorData?.accountType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A]/60 border border-[#10B981]/20 rounded-full">
                    <Trophy className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[#10B981] font-medium text-sm">
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-base text-[#CCCCCC] mb-6 max-w-2xl leading-relaxed">
                {creatorData?.additionalDetails.about}
              </p>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div
                  className="text-center lg:text-left cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowFollowers(true)}
                >
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <Users className="w-5 h-5 text-[#6366F1]" />
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                      {creatorData?.followers.length}
                    </div>
                  </div>
                  <div className="text-[#888888] text-sm font-medium">
                    Followers
                  </div>
                </div>
                <div
                  className="text-center lg:text-left cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowFollowing(true)}
                >
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <UserPlus className="w-5 h-5 text-[#EC4899]" />
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#EC4899] to-[#F472B6] bg-clip-text text-transparent">
                      {creatorData?.following.length}
                    </div>
                  </div>
                  <div className="text-[#888888] text-sm font-medium">
                    Following
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <BookOpen className="w-5 h-5 text-[#10B981]" />
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#10B981] to-[#34D399] bg-clip-text text-transparent">
                      {creatorData?.blogs.length}
                    </div>
                  </div>
                  <div className="text-[#888888] text-sm font-medium">
                    Articles
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <Eye className="w-5 h-5 text-[#FBBF24]" />
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] bg-clip-text text-transparent">
                      {totalViews}
                    </div>
                  </div>
                  <div className="text-[#888888] text-sm font-medium">
                    Total Views
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <button
                  onClick={handleFollow}
                  className={`group relative inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isFollowing
                      ? "bg-gradient-to-r from-[#10B981]/90 to-[#06B6D4]/80 text-white shadow-lg shadow-[#10B981]/25 hover:shadow-xl hover:shadow-[#10B981]/40"
                      : "bg-gradient-to-r from-[#6366F1]/90 to-[#8B5CF6]/80 text-white shadow-lg shadow-[#6366F1]/25 hover:shadow-xl hover:shadow-[#6366F1]/40"
                  }`}
                >
                  {isFollowing ? (
                    <UserCheck className="w-4 h-4" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  <span>{isFollowing ? "Following" : "Follow"}</span>
                </button>

                <button
                  onClick={handleMessage}
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#1A1A1A]/90 to-[#111111]/80 backdrop-blur-sm border border-[#444444] text-white font-semibold rounded-xl hover:border-[#EC4899]/50 transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </button>

                <button className="group relative inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#1A1A1A]/90 to-[#111111]/80 backdrop-blur-sm border border-[#444444] text-white rounded-xl hover:border-[#10B981]/50 transition-all duration-300 transform hover:scale-105">
                  <Share2 className="w-4 h-4" />
                </button>

                <button className="group relative inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#1A1A1A]/90 to-[#111111]/80 backdrop-blur-sm border border-[#444444] text-white rounded-xl hover:border-[#FBBF24]/50 transition-all duration-300 transform hover:scale-105">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - About Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Personal Information */}
            <div className="bg-gradient-to-br from-[#1A1A1A]/95 to-[#111111]/90 backdrop-blur-sm border border-[#2A2A2A] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">About</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#6366F1] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#888888]">Email</div>
                    <div className="text-white font-medium text-sm">
                      {creatorData?.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <LocationIcon className="w-5 h-5 text-[#EC4899] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#888888]">Location</div>
                    <div className="text-white font-medium text-sm">
                      {creatorData?.additionalDetails.address}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarIcon className="w-5 h-5 text-[#FBBF24] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#888888]">Age</div>
                    <div className="text-white font-medium text-sm">
                      {calculateAge(creatorData?.additionalDetails.dateOfBirth)}{" "}
                      years old
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-[#06B6D4] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#888888]">Gender</div>
                    <div className="text-white font-medium text-sm">
                      {creatorData?.additionalDetails.gender}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User2 className="w-5 h-5 text-[#10B981] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#888888]">Join</div>
                    <div className="text-white font-medium text-sm">
                      {new Date(
                        creatorData?.additionalDetails.createdAt
                      ).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short", // "long" for full month name
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-[#1A1A1A]/95 to-[#111111]/90 backdrop-blur-sm border border-[#2A2A2A] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#6366F1]" />
                Connect
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {creatorData?.additionalDetails.website && (
                  <a
                    href={creatorData?.additionalDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#1A1A1A]/60 border border-[#444444] rounded-xl hover:border-[#6366F1]/50 transition-colors text-sm"
                  >
                    <Globe className="w-4 h-4 text-[#6366F1]" />
                    <span className="text-[#CCCCCC]">Website</span>
                  </a>
                )}
                {creatorData?.additionalDetails.github && (
                  <a
                    href={creatorData?.additionalDetails.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#1A1A1A]/60 border border-[#444444] rounded-xl hover:border-[#10B981]/50 transition-colors text-sm"
                  >
                    <Github className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[#CCCCCC]">GitHub</span>
                  </a>
                )}
                {creatorData?.additionalDetails.twitter && (
                  <a
                    href={creatorData?.additionalDetails.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#1A1A1A]/60 border border-[#444444] rounded-xl hover:border-[#1DA1F2]/50 transition-colors text-sm"
                  >
                    <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                    <span className="text-[#CCCCCC]">Twitter</span>
                  </a>
                )}
                {creatorData?.additionalDetails.linkedin && (
                  <a
                    href={creatorData?.additionalDetails.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#1A1A1A]/60 border border-[#444444] rounded-xl hover:border-[#0077B5]/50 transition-colors text-sm"
                  >
                    <Linkedin className="w-4 h-4 text-[#0077B5]" />
                    <span className="text-[#CCCCCC]">LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gradient-to-br from-[#1A1A1A]/95 to-[#111111]/90 backdrop-blur-sm border border-[#2A2A2A] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#06B6D4] rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Statistics</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-[#1A1A1A]/40 rounded-xl border border-[#2A2A2A]">
                  <div className="text-2xl font-bold text-[#6366F1] mb-1">
                    {creatorData?.blogs.length}
                  </div>
                  <div className="text-sm text-[#888888]">Articles</div>
                </div>
                <div className="text-center p-4 bg-[#1A1A1A]/40 rounded-xl border border-[#2A2A2A]">
                  <div className="text-2xl font-bold text-[#29b532] mb-1">
                    {totalViews?.toLocaleString()}
                  </div>
                  <div className="text-sm text-[#888888]">Total Views</div>
                </div>
                <div className="text-center p-4 bg-[#1A1A1A]/40 rounded-xl border border-[#2A2A2A]">
                  <div className="text-2xl font-bold text-[#EC4899] mb-1">
                    {totalLikes}
                  </div>
                  <div className="text-sm text-[#888888]">Total Likes</div>
                </div>
                <div className="text-center p-4 bg-[#1A1A1A]/40 rounded-xl border border-[#2A2A2A]">
                  <div className="text-2xl font-bold text-[#FBBF24] mb-1">
                    {creatorData?.blogs.reduce(
                      (sum, blog) => sum + blog.commentCount,
                      0
                    )}
                  </div>
                  <div className="text-sm text-[#888888]">Total Comments</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Blog Posts */}
          <div className="lg:col-span-2">
            {/* Filter Section */}
            <div className="bg-gradient-to-br from-[#1A1A1A]/95 to-[#111111]/90 backdrop-blur-sm border border-[#2A2A2A] rounded-2xl p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#EC4899] to-[#F472B6] rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Articles</h2>
                </div>

                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-[#888888]" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-[#1A1A1A]/60 border border-[#444444] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-[#6366F1]/50 transition-colors"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="space-y-6">
              {currentBlogs?.map((blog) => (
                <article
                  key={blog._id}
                  className="group bg-gradient-to-br from-[#1A1A1A]/95 to-[#111111]/90 backdrop-blur-sm border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-[#6366F1]/30 transition-all duration-300 hover:transform hover:scale-[1.01]"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Blog Image */}
                    <div className="lg:w-1/3 relative overflow-hidden">
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-48 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-gradient-to-r from-[#6366F1]/90 to-[#8B5CF6]/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="lg:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-sm text-[#888888] mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{blog.readingTime} min read</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#6366F1] transition-colors cursor-pointer">
                          {blog.title}
                        </h3>

                        <p className="text-[#CCCCCC] mb-4 line-clamp-2 leading-relaxed">
                          {blog.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-[#1A1A1A]/60 border border-[#444444] text-[#CCCCCC] text-xs rounded-lg hover:border-[#6366F1]/50 transition-colors cursor-pointer"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Blog Stats and Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#2A2A2A]">
                        <div className="flex items-center gap-6 text-sm text-[#888888]">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>{blog.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2 hover:text-[#EC4899] transition-colors cursor-pointer">
                            <Heart className="w-4 h-4" />
                            <span>{blog.likeCount}</span>
                          </div>
                          <div className="flex items-center gap-2 hover:text-[#10B981] transition-colors cursor-pointer">
                            <MessageSquare className="w-4 h-4" />
                            <span>{blog.commentCount}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="p-2 text-[#888888] hover:text-[#FBBF24] hover:bg-[#1A1A1A]/40 rounded-lg transition-colors">
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-[#888888] hover:text-[#06B6D4] hover:bg-[#1A1A1A]/40 rounded-lg transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button 
                          onClick={() => navigate(`/blogs/${blog.slug}`)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1]/90 to-[#8B5CF6]/90 text-white rounded-lg hover:from-[#5B5BF5] hover:to-[#7C3AED] transition-all duration-300 transform hover:scale-105">
                            <span className="text-sm font-medium">
                              Read More
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
           {
            totalPages > 1  && ( <div className=" flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2  bg-[#180297] hover:bg-[#6366F1] hover:bg-[#1A1A1A]/40 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-[#888888] font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 bg-[#180297] hover:bg-[#6366F1] hover:bg-[#1A1A1A]/40 rounded-lg transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>)
           }
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[#2A2A2A] text-center">
          <div className="flex items-center justify-center gap-2 text-[#888888] mb-4">
            <Coffee className="w-5 h-5" />
            <span className="text-sm">
              Made with passion by {creatorData?.firstName}{" "}
              {creatorData?.lastName}
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-[#666666]">
            <span>© 2024 All rights reserved</span>
            <span>•</span>
            <a href="#" className="hover:text-[#6366F1] transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#6366F1] transition-colors">
              Terms of Service
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Creator;
