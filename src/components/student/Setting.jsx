// import React, { useState } from "react";
// import {
//   FaUpload,
//   FaUserCircle,
//   FaBirthdayCake,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaInfoCircle,
// } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { updateProfile, updateDisplayPicture } from "../../services/apiCalls/profileCall";

// const SettingsPage = () => {
//   const { user } = useSelector((state) => state.profile);
//   const dispatch = useDispatch();
//   const [profileImage, setProfileImage] = useState(user?.image || null);
//   const [formData, setFormData] = useState({
//     gender: user?.additionalDetails?.gender || "",
//     dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
//     contactNumber: user?.additionalDetails?.contactNumber || "",
//     address: user?.additionalDetails?.address || "",
//     about: user?.additionalDetails?.about || "",
//   });

//   // Handle profile image selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(URL.createObjectURL(file));
//     }
//   };

//   // Handle updating profile picture
//   const handleImageUpload = (e) => {
//     e.preventDefault();
//     const file = e.target[0].files[0];
//       dispatch(updateDisplayPicture({ image: file }));

//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateProfile(formData));
//   };

//   return (
//     <div className="min-h-screen bg-richblack-900 text-richblue-5 py-10 px-4">

//       <div className="w-full max-w-4xl mx-auto space-y-10">
//         {/* Profile Image Update Section */}
//         <section className="bg-richblack-800 p-8 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-semibold text-caribbeangreen-100 mb-6 flex items-center gap-3">
//             <FaUserCircle /> Update Profile Picture
//           </h2>
//           <form onSubmit={handleImageUpload} className="space-y-4">
//             <div className="flex flex-row items-center gap-6">
//               {/* Current Profile Image */}
//               <img
//                 src={profileImage || user?.image || "https://via.placeholder.com/150?text=Profile+Image"}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full border-4 border-caribbeangreen-300 object-cover shadow-lg transition-transform hover:scale-110"
//               />

//               {/* Select and Upload Buttons */}
//               <div className="flex gap-4 flex-col">
//                 <label
//                   htmlFor="imageUpload"
//                   className="cursor-pointer px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-md hover:from-blue-600 hover:to-blue-800 transition flex items-center gap-2 shadow-md"
//                 >
//                   <FaUpload /> Select Image
//                 </label>
//                 <input
//                   type="file"
//                   id="imageUpload"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 />
//                 <button
//                   type="submit"
//                   className={`px-5 py-2 bg-gradient-to-r ${
//                     profileImage ? "from-caribbeangreen-400 to-caribbeangreen-600" : "from-caribbeangreen-500 to-caribbeangreen-700"
//                   } text-black font-bold rounded-md hover:from-caribbeangreen-500 hover:to-caribbeangreen-700 transition shadow-md`}
//                   disabled={!profileImage}
//                 >
//                   Update Picture
//                 </button>
//               </div>
//             </div>
//           </form>
//         </section>

//         {/* Personal Details Update Section */}
//         <section className="bg-richblack-800 p-8 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-semibold text-caribbeangreen-100 mb-6 flex items-center gap-3">
//             <FaInfoCircle /> Update Personal Details
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Gender */}
//             <div>
//               <label className="block text-richblue-5 mb-2">Gender</label>
//               <div className="flex gap-4">
//                 {["Male", "Female", "Other"].map((option) => (
//                   <label key={option} className="flex items-center gap-2 text-richblue-50">
//                     <input
//                       type="radio"
//                       name="gender"
//                       value={option}
//                       checked={formData.gender === option}
//                       onChange={handleChange}
//                     />
//                     {option}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Date of Birth */}
//             <div>
//               <label className="block text-richblue-5 mb-2">Date of Birth</label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-richblack-700 text-richblue-5 rounded-md focus:ring-2 focus:ring-caribbeangreen-100"
//               />
//             </div>

//             {/* Contact Number */}
//             <div>
//               <label className="block text-richblue-5 mb-2">Contact Number</label>
//               <input
//                 type="text"
//                 name="contactNumber"
//                 value={formData.contactNumber}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-richblack-700 text-richblue-5 rounded-md focus:ring-2 focus:ring-caribbeangreen-100"
//               />
//             </div>

//             {/* Address */}
//             <div>
//               <label className="block text-richblue-5 mb-2">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-richblack-700 text-richblue-5 rounded-md focus:ring-2 focus:ring-caribbeangreen-100"
//               />
//             </div>

//             {/* About */}
//             <div>
//               <label className="block text-richblue-5 mb-2">About</label>
//               <textarea
//                 name="about"
//                 value={formData.about}
//                 onChange={handleChange}
//                 rows="4"
//                 className="w-full p-3 bg-richblack-700 text-richblue-5 rounded-md focus:ring-2 focus:ring-caribbeangreen-100"
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full py-3 bg-gradient-to-r from-caribbeangreen-200 to-caribbeangreen-400 text-black font-bold rounded-md hover:from-caribbeangreen-300 hover:to-caribbeangreen-500 transition shadow-md"
//             >
//               Save Changes
//             </button>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;

import React, { useState } from "react";
import {
  User2,
  Camera,
  Upload,
  Save,
  Settings, // Assuming this was meant for an icon, but not used. Can be removed if not needed.
  Shield,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Info,
  X, // Not used, can be removed if not needed.
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  updateDisplayPicture,
} from "../../services/apiCalls/profileCall"; // Ensure this path is correct

const SettingsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(user?.image || null); // This will be a blob URL for preview
  const [imageFile, setImageFile] = useState(null); // State to hold the actual file for upload

  const [formData, setFormData] = useState({
    gender: user?.additionalDetails?.gender || "",
    dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
    contactNumber: user?.additionalDetails?.contactNumber || "",
    address: user?.additionalDetails?.address || "",
    about: user?.additionalDetails?.about || "",
    github: user?.additionalDetails?.github || "",
    linkedin: user?.additionalDetails?.linkedin || "",
    website: user?.additionalDetails?.website || "",
    twitter: user?.additionalDetails?.twitter || "",
  });

  // Handle profile image selection for preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setImageFile(file); // Store the file for upload
    }
  };

  // Handle updating profile picture
  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    dispatch(updateDisplayPicture({ image: file }));
  };

  // Handle input changes for personal details and social links
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for personal details and social links
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

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
                  radial-gradient(circle at 42px 42px, #F472B6 1.5px, transparent 0)`,
              backgroundSize: "80px 80px",
              animation: "float 20s ease-in-out infinite",
            }}
          ></div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-3 h-3 bg-[#6366F1] rounded-full animate-pulse opacity-60"
          style={{ boxShadow: "0 0 20px #6366F1" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-4 h-4 bg-[#EC4899] rounded-full animate-pulse opacity-60"
          style={{ animationDelay: "1s", boxShadow: "0 0 20px #EC4899" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-2 h-2 bg-[#10B981] rounded-full animate-pulse opacity-60"
          style={{ animationDelay: "2s", boxShadow: "0 0 20px #10B981" }}
        ></div>
        <div
          className="absolute top-60 left-1/2 w-3 h-3 bg-[#FBBF24] rounded-full animate-pulse opacity-60"
          style={{ animationDelay: "0.5s", boxShadow: "0 0 20px #FBBF24" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl px-4 py-8">
        <div className="space-y-8">
          {/* Profile Picture Update Section */}
          <div className="bg-gradient-to-br backdrop-blur-sm border border-[#333344]/50 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleImageUpload}>
              {" "}
              {/* FORM for image upload */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Update Profile Picture
                </h2>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {" "}
                {/* Flex container for image and controls */}
                {/* Image Preview */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6365f1d0] via-[#8a5cf6e5] to-[#ec489ad9] rounded-full animate-pulse opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#6366F1]/40 via-[#8B5CF6]/30 to-[#EC4899]/40 p-1 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={
                        profileImage ||
                        user?.image ||
                        "https://via.placeholder.com/150?text=No+Image"
                      }
                      alt="Profile Preview"
                      className="w-full h-full rounded-full object-cover bg-[#1A1A2E]"
                    />
                  </div>
                  <div className="absolute -top-2 -left-2 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full p-2 shadow-lg">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                </div>
                {/* Upload Controls */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <label
                      htmlFor="imageUploadInput" // Changed ID to avoid conflict if any, and for clarity
                      className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#1F1F2E] to-[#141422] backdrop-blur-sm border border-[#444455] text-white font-semibold rounded-xl hover:border-[#6366F1]/50 hover:from-[#6366F1]/10 hover:to-[#8B5CF6]/10 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Select Image</span>
                    </label>
                    <input
                      type="file"
                      id="imageUploadInput" // Ensure this ID is unique or used consistently
                      name="profileImageFile" // Added name attribute
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <button
                      type="submit" // This will submit the image upload form
                      className={`group relative inline-flex items-center gap-3 px-6 py-3 ${
                        imageFile // Enable button if a file is selected
                          ? "bg-gradient-to-r from-[#10B981] to-[#34D399] hover:from-[#0F9C75] hover:to-[#2DD687]"
                          : "bg-gradient-to-r from-[#374151] to-[#4B5563] cursor-not-allowed"
                      } text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105`}
                      disabled={!imageFile} // Disable if no file is selected
                    >
                      <Save className="w-5 h-5" />
                      <span>Update Picture</span>
                    </button>
                  </div>
                  <p className="text-sm text-[#888888]">
                    Choose a clear, professional photo. Supported formats: JPG,
                    PNG, GIF (max 5MB)
                  </p>
                </div>
              </div>
            </form>{" "}
            {/* Closing image upload form */}
          </div>{" "}
          {/* Closing Profile Picture Update Section div */}
          {/* Personal Details Update Section */}
          <div className="bg-gradient-to-br backdrop-blur-sm border border-[#333344]/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#EC4899] to-[#F472B6] rounded-xl flex items-center justify-center shadow-lg">
                <User2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Personal Information
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {" "}
              {/* Form for personal details */}
              {/* Gender */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-white font-semibold mb-4">
                  <Heart className="w-5 h-5 text-[#EC4899]" />
                  Gender
                </label>
                <div className="flex flex-wrap gap-4">
                  {["Male", "Female", "Other"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 text-[#CCCCCC] cursor-pointer group"
                    >
                      <div className="relative">
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={formData.gender === option}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 transition-all ${
                            formData.gender === option
                              ? "border-[#EC4899] bg-[#EC4899]"
                              : "border-[#444455] group-hover:border-[#EC4899]/50"
                          }`}
                        >
                          {formData.gender === option && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                      </div>
                      <span className="group-hover:text-white transition-colors">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Date of Birth */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-white font-semibold">
                  <Calendar className="w-5 h-5 text-[#6366F1]" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth?.split("T")[0] || ""} // Handle potential ISO string
                  onChange={handleChange}
                  className="w-full p-4 bg-richblack-800 border border-[#333344]/50 rounded-xl text-white placeholder-[#888888] focus:border-[#6366F1]/50 focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-all"
                />
              </div>
              {/* Contact Number */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-white font-semibold">
                  <Phone className="w-5 h-5 text-[#10B981]" />
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full p-4 bg-richblack-800 border border-[#333344]/50 rounded-xl text-white placeholder-[#888888] focus:border-[#10B981]/50 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 transition-all"
                />
              </div>
              {/* Address */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-white font-semibold">
                  <MapPin className="w-5 h-5 text-[#FBBF24]" />
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full p-4 bg-richblack-800 border border-[#333344]/50 rounded-xl text-white placeholder-[#888888] focus:border-[#FBBF24]/50 focus:outline-none focus:ring-2 focus:ring-[#FBBF24]/20 transition-all"
                />
              </div>
              {/* About */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-white font-semibold">
                  <Info className="w-5 h-5 text-[#8B5CF6]" />
                  About
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about yourself..."
                  className="w-full p-4 bg-richblack-800 border border-[#333344]/50 rounded-xl text-white placeholder-[#888888] focus:border-[#8B5CF6]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all resize-none"
                />
              </div>
              {/* Website */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-white font-semibold">
                  <Globe className="w-5 h-5 text-[#6366F1]" />
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                  className="w-full p-4 bg-richblack-800 border border-[#333344]/50 rounded-xl text-white placeholder-[#888888] focus:border-[#6366F1]/50 focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-all"
                />
              </div>
              {/* GitHub */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-white font-semibold">
                  <Github className="w-5 h-5 text-[#FFFFFF]" />
                  GitHub
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/yourusername"
                  className="w-full p-4 bg-richblack-800 border border-[#333344]/50 rounded-xl text-white placeholder-[#888888] focus:border-[#FFFFFF]/50 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]/20 transition-all"
                />
              </div>
              {/* LinkedIn */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-white font-semibold">
                  <Linkedin className="w-5 h-5 text-[#0077B5]" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full p-4 bg-richblack-800 border border-[#333344]/50 rounded-xl text-white placeholder-[#888888] focus:border-[#0077B5]/50 focus:outline-none focus:ring-2 focus:ring-[#0077B5]/20 transition-all"
                />
              </div>
              {/* Twitter */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-white font-semibold">
                  <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                  Twitter
                </label>
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="https://twitter.com/yourusername"
                  className="w-full p-4 bg-richblack-800 border border-[#333344]/50 rounded-xl text-white placeholder-[#888888] focus:border-[#1DA1F2]/50 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]/20 transition-all"
                />
              </div>
              <div className="pt-6">
                <button
                  type="submit" // Submits the social links form (and implicitly personal info due to shared handler and state)
                  className="group relative inline-flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold rounded-2xl shadow-lg shadow-[#6366F1]/25 hover:shadow-xl hover:shadow-[#6366F1]/40 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
                >
                  <Save className="w-6 h-6" />
                  <span className="text-lg">Save All Changes</span>
                </button>
              </div>
            </form>{" "}
            {/* Closing personal details form */}
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
};

export default SettingsPage;
