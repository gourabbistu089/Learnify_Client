import React, { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  Share2,
  UserPlus,
  Clock,
  Sparkles,
  Settings,
  Target,
  Phone,
  Calendar as CalendarIcon,
  MapPin as LocationIcon,
  Globe,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  X,
  User2,
  Edit,
  Camera,
  Shield,
} from "lucide-react";
import { getUserDetails } from "../../services/apiCalls/profileCall";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      const data = await getUserDetails();
      setUserData(data);
      setLoading(false);
    };
    fetchUserData();
  }, []);
  console.log("userData", userData);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!userData || loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-transparent border-t-[#6366F1] border-r-[#8B5CF6] rounded-full animate-spin"></div>
          <div
            className="absolute inset-2 w-16 h-16 border-4 border-transparent border-t-[#EC4899] border-l-[#10B981] rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <User2 className="w-8 h-8 text-[#6366F1] animate-pulse" />
          </div>
        </div>
        <div className="ml-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            Loading Profile
          </h2>
          <p className="text-[#888888]">Preparing your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#0f0f23] to-[#0B0B0F]"></div>
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #6366F1 1.5px, transparent 0),
                  radial-gradient(circle at 42px 42px, #F472B6 1.5px, transparent 0) `,
              backgroundSize: "80px 80px",
              animation: "float 20s ease-in-out infinite",
            }}
          ></div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-3 h-3 bg-[#6366F1] rounded-full animate-pulse opacity-60 z-[50]"
          style={{ boxShadow: "0 0 20px #6366F1" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-4 h-4 bg-[#EC4899] rounded-full animate-pulse opacity-60  z-[50]"
          style={{ animationDelay: "1s", boxShadow: "0 0 20px #EC4899" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-2 h-2 bg-[#10B981] rounded-full animate-pulse opacity-60 z-[50]"
          style={{ animationDelay: "2s", boxShadow: "0 0 20px #10B981" }}
        ></div>
        <div
          className="absolute top- z-[50]60 left-1/2 w-3 h-3 bg-[#FBBF24] rounded-full animate-pulse opacity-60"
          style={{ animationDelay: "0.5s", boxShadow: "0 0 20px #FBBF24" }}
        ></div>
      </div>

      {/* Followers Modal */}
      {showFollowers && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#1F1F2E] to-[#141422] border border-[#333344] rounded-3xl p-8 max-w-md w-full max-h-[432px] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-[#6366F1]" />
                Followers
              </h3>
              <button
                onClick={() => setShowFollowers(false)}
                className="text-[#888888] hover:text-white transition-colors p-2 hover:bg-[#333344] rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {userData?.followers.map((follower) => (
                <div
                  key={follower._id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#1A1A2E]/50 to-[#16213E]/30 hover:from-[#1A1A2E]/80 hover:to-[#16213E]/60 transition-all duration-300 border border-[#333344]/50"
                >
                  <div className="relative">
                    <img
                      src={follower.image}
                      alt={`${follower.firstName} ${follower.lastName}`}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#6366F1]/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#10B981] rounded-full border-2 border-[#1F1F2E]"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white text-lg">
                      {follower.firstName} {follower.lastName}
                    </p>
                    <p className="text-[#888888] text-sm">Active now</p>
                  </div>
                  <button 
                  onClick={() => navigate(`/creator/${follower._id}`)}
                  className="px-6 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-xl hover:from-[#5B5BF5] hover:to-[#7C3AED] transition-all duration-300 font-medium">
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
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#1F1F2E] to-[#141422] border border-[#333344] rounded-3xl p-8 max-w-md w-full max-h-[432px] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-[#EC4899]" />
                Following
              </h3>
              <button
                onClick={() => setShowFollowing(false)}
                className="text-[#888888] hover:text-white transition-colors p-2 hover:bg-[#333344] rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {userData?.following.map((following) => (
                <div
                  key={following._id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#1A1A2E]/50 to-[#16213E]/30 hover:from-[#1A1A2E]/80 hover:to-[#16213E]/60 transition-all duration-300 border border-[#333344]/50"
                >
                  <div className="relative">
                    <img
                      src={following.image}
                      alt={`${following.firstName} ${following.lastName}`}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#EC4899]/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#10B981] rounded-full border-2 border-[#1F1F2E]"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white text-lg">
                      {following.firstName} {following.lastName}
                    </p>
                    <p className="text-[#888888] text-sm">Active now</p>
                  </div>
                  <button 
                  onClick={() => navigate(`/creator/${following._id}`)}
                  className="px-6 py-2 bg-gradient-to-r from-[#EC4899] to-[#F472B6] text-white rounded-xl hover:from-[#E11D87] hover:to-[#EC4899] transition-all duration-300 font-medium">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto md:px-6 md:py-8 py-1 px-2 ">
        {/* Enhanced Header Section */}

        <div className="relative bg-gradient-to-br backdrop-blur-sm border border-[#333344]/50 rounded-3xl p-10 mb-8 overflow-hidden shadow-2xl">
       

          <div className="relative flex flex-col lg:flex-row items-center gap-10">
            {/* Enhanced Profile Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6365f1d0] via-[#8a5cf6e5] to-[#ec489ad9] rounded-full animate-pulse opacity-75 blur-md"></div>
              <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-[#6366F1]/40 via-[#8B5CF6]/30 to-[#EC4899]/40 p-1 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={userData?.image}
                  alt={`${userData?.firstName} ${userData?.lastName}`}
                  className="w-full h-full rounded-full object-cover bg-[#1A1A2E]"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full p-3 hover:scale-110 transition-transform duration-200 shadow-lg">
                <Camera className="w-6 h-6 text-white" />
              </button>
              <div className="absolute -top-2 -left-2 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full p-2">
                <Shield className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Enhanced Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6">
                <h1 className="text-4xl lg:text-5xl font-black mb-3 leading-tight">
                  <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                    {userData?.firstName}
                  </span>{" "}
                  <span className="text-white">{userData?.lastName}</span>
                </h1>

                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FBBF24]/20 to-[#F59E0B]/20 border border-[#FBBF24]/30 rounded-full backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-[#FBBF24]" />
                    <span className="text-[#FBBF24] font-semibold capitalize">
                      {userData?.accountType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10B981]/20 to-[#34D399]/20 border border-[#10B981]/30 rounded-full backdrop-blur-sm">
                    <Shield className="w-5 h-5 text-[#10B981]" />
                    <span className="text-[#10B981] font-semibold">
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-lg text-[#CCCCCC] mb-8 max-w-2xl leading-relaxed">
                {userData?.additionalDetails?.about}
              </p>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div
                  className="text-center lg:text-left cursor-pointer group hover:scale-105 transition-all duration-300"
                  onClick={() => setShowFollowers(true)}
                >
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 rounded-xl group-hover:from-[#6366F1]/40 group-hover:to-[#8B5CF6]/40 transition-all">
                      <Users className="w-6 h-6 text-[#6366F1]" />
                    </div>
                    <div className="text-3xl font-black bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                      {userData?.followers?.length}
                    </div>
                  </div>
                  <div className="text-[#888888] font-semibold">Followers</div>
                </div>

                <div
                  className="text-center lg:text-left cursor-pointer group hover:scale-105 transition-all duration-300"
                  onClick={() => setShowFollowing(true)}
                >
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-[#EC4899]/20 to-[#F472B6]/20 rounded-xl group-hover:from-[#EC4899]/40 group-hover:to-[#F472B6]/40 transition-all">
                      <UserPlus className="w-6 h-6 text-[#EC4899]" />
                    </div>
                    <div className="text-3xl font-black bg-gradient-to-r from-[#EC4899] to-[#F472B6] bg-clip-text text-transparent">
                      {userData?.following.length}
                    </div>
                  </div>
                  <div className="text-[#888888] font-semibold">Following</div>
                </div>

                <div className="text-center lg:text-left group hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-[#10B981]/20 to-[#34D399]/20 rounded-xl group-hover:from-[#10B981]/40 group-hover:to-[#34D399]/40 transition-all">
                      <BookOpen className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <div className="text-3xl font-black bg-gradient-to-r from-[#10B981] to-[#34D399] bg-clip-text text-transparent">
                      {userData?.blogs.length}
                    </div>
                  </div>
                  <div className="text-[#888888] font-semibold">Articles</div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button
                  onClick={() => navigate('/dashboard/setting')}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold rounded-2xl shadow-lg shadow-[#6366F1]/25 hover:shadow-xl hover:shadow-[#6366F1]/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>

                <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-[#1F1F2E] to-[#141422] backdrop-blur-sm border border-[#444455] text-white font-bold rounded-2xl hover:border-[#EC4899]/50 hover:from-[#EC4899]/10 hover:to-[#F472B6]/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>

                <button className="group relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1F1F2E] to-[#141422] backdrop-blur-sm border border-[#444455] text-white rounded-2xl hover:border-[#10B981]/50 hover:from-[#10B981]/10 hover:to-[#34D399]/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Enhanced Personal Information */}
          <div className=" bg-transparent  border border-[#333344]/50 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg">
                <User2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Personal Info</h2>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4 p-3 rounded-xl bg-gradient-to-r from-[#1A1A2E]/30 to-[#16213E]/20 border border-[#333344]/30">
                <div className="p-2 bg-gradient-to-r from-[#06B6D4]/20 to-[#0891B2]/20 rounded-lg">
                  <Target className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <div>
                  <div className="text-sm text-[#888888] font-medium">
                    Gender
                  </div>
                  <div className="text-white font-semibold text-sm">
                    {userData?.additionalDetails?.gender}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-xl bg-gradient-to-r from-[#1A1A2E]/30 to-[#16213E]/20 border border-[#333344]/30">
                <div className="p-2 bg-gradient-to-r from-[#10B981]/20 to-[#34D399]/20 rounded-lg">
                  <Clock className="w-5 h-5 text-[#10B981]" />
                </div>
                <div>
                  <div className="text-sm text-[#888888] font-medium">
                    Member Since
                  </div>
                  <div className="text-white font-semibold text-sm">
                    {formatDate(userData?.additionalDetails?.createdAt)}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-xl bg-gradient-to-r from-[#1A1A2E]/30 to-[#16213E]/20 border border-[#333344]/30">
                <div className="p-2 bg-gradient-to-r from-[#8B5CF6]/20 to-[#7C3AED]/20 rounded-lg">
                  <Phone className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <div>
                  <div className="text-sm text-[#888888] font-medium">
                    Contact
                  </div>
                  <div className="text-white font-semibold text-sm">
                    {userData?.additionalDetails?.contactNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Social Links */}
          <div className="bg-transparent border border-[#333344]/50 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              Social Links
            </h3>
            <div className="space-y-3">
              {userData?.additionalDetails?.website && (
                <a
                  href={userData?.additionalDetails?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[#1A1A2E]/50 to-[#16213E]/30 border border-[#444455]/50 rounded-xl hover:border-[#6366F1]/50 hover:from-[#6366F1]/10 hover:to-[#8B5CF6]/10 transition-all duration-300"
                >
                  <div className="p-2 bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 rounded-lg group-hover:from-[#6366F1]/40 group-hover:to-[#8B5CF6]/40 transition-all">
                    <Globe className="w-5 h-5 text-[#6366F1]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[#CCCCCC] font-medium">Website</span>
                    <div className="text-[#888888] text-sm">
                      Personal Portfolio
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#888888] group-hover:text-[#6366F1] transition-colors" />
                </a>
              )}
              {userData?.additionalDetails?.github && (
                <a
                  href={userData?.additionalDetails?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[#1A1A2E]/50 to-[#16213E]/30 border border-[#444455]/50 rounded-xl hover:border-[#24292E]/50 hover:from-[#24292E]/10 hover:to-[#1B1F23]/10 transition-all duration-300"
                >
                  <div className="p-2 bg-gradient-to-r from-[#24292E]/20 to-[#1B1F23]/20 rounded-lg group-hover:from-[#24292E]/40 group-hover:to-[#1B1F23]/40 transition-all">
                    <Github className="w-5 h-5 text-[#FFFFFF]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[#CCCCCC] font-medium">GitHub</span>
                    <div className="text-[#888888] text-sm">
                      Code Repository
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#888888] group-hover:text-[#FFFFFF] transition-colors" />
                </a>
              )}
              {userData?.additionalDetails?.linkedin && (
                <a
                  href={userData?.additionalDetails?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[#1A1A2E]/50 to-[#16213E]/30 border border-[#444455]/50 rounded-xl hover:border-[#0077B5]/50 hover:from-[#0077B5]/10 hover:to-[#005885]/10 transition-all duration-300"
                >
                  <div className="p-2 bg-gradient-to-r from-[#0077B5]/20 to-[#005885]/20 rounded-lg group-hover:from-[#0077B5]/40 group-hover:to-[#005885]/40 transition-all">
                    <Linkedin className="w-5 h-5 text-[#0077B5]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[#CCCCCC] font-medium">LinkedIn</span>
                    <div className="text-[#888888] text-sm">
                      Professional Network
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#888888] group-hover:text-[#0077B5] transition-colors" />
                </a>
              )}
              {userData?.additionalDetails?.twitter && (
                <a
                  href={userData?.additionalDetails?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[#1A1A2E]/50 to-[#16213E]/30 border border-[#444455]/50 rounded-xl hover:border-[#1DA1F2]/50 hover:from-[#1DA1F2]/10 hover:to-[#0D8BD9]/10 transition-all duration-300"
                >
                  <div className="p-2 bg-gradient-to-r from-[#1DA1F2]/20 to-[#0D8BD9]/20 rounded-lg group-hover:from-[#1DA1F2]/40 group-hover:to-[#0D8BD9]/40 transition-all">
                    <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[#CCCCCC] font-medium">Twitter</span>
                    <div className="text-[#888888] text-sm">Social Updates</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#888888] group-hover:text-[#1DA1F2] transition-colors" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(5px) rotate(-1deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Profile;
