import React, { useState } from "react";
import {
  FaUpload,
  FaUserCircle,
  FaBirthdayCake,
  FaPhone,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, updateDisplayPicture } from "../../services/apiCalls/profileCall";

const SettingsPage = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(user?.image || null);
  const [formData, setFormData] = useState({
    gender: user?.additionalDetails?.gender || "",
    dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
    contactNumber: user?.additionalDetails?.contactNumber || "",
    address: user?.additionalDetails?.address || "",
    about: user?.additionalDetails?.about || "",
  });

  // Handle profile image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Handle updating profile picture
  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
      dispatch(updateDisplayPicture({ image: file }));
    
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-richblue-5 py-10 px-4">
  
      <div className="w-full max-w-4xl mx-auto space-y-10">
        {/* Profile Image Update Section */}
        <section className="bg-richblack-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-caribbeangreen-100 mb-6 flex items-center gap-3">
            <FaUserCircle /> Update Profile Picture
          </h2>
          <form onSubmit={handleImageUpload} className="space-y-4">
            <div className="flex flex-row items-center gap-6">
              {/* Current Profile Image */}
              <img
                src={profileImage || user?.image || "https://via.placeholder.com/150?text=Profile+Image"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-caribbeangreen-300 object-cover shadow-lg transition-transform hover:scale-110"
              />

              {/* Select and Upload Buttons */}
              <div className="flex gap-4 flex-col">
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-md hover:from-blue-600 hover:to-blue-800 transition flex items-center gap-2 shadow-md"
                >
                  <FaUpload /> Select Image
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <button
                  type="submit"
                  className={`px-5 py-2 bg-gradient-to-r ${
                    profileImage ? "from-caribbeangreen-400 to-caribbeangreen-600" : "from-caribbeangreen-500 to-caribbeangreen-700"
                  } text-black font-bold rounded-md hover:from-caribbeangreen-500 hover:to-caribbeangreen-700 transition shadow-md`}
                  disabled={!profileImage}
                >
                  Update Picture
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* Personal Details Update Section */}
        <section className="bg-richblack-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-caribbeangreen-100 mb-6 flex items-center gap-3">
            <FaInfoCircle /> Update Personal Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Gender */}
            <div>
              <label className="block text-richblue-5 mb-2">Gender</label>
              <div className="flex gap-4">
                {["Male", "Female", "Other"].map((option) => (
                  <label key={option} className="flex items-center gap-2 text-richblue-50">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={handleChange}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-richblue-5 mb-2">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-3 bg-richblack-700 text-richblue-5 rounded-md focus:ring-2 focus:ring-caribbeangreen-100"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-richblue-5 mb-2">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full p-3 bg-richblack-700 text-richblue-5 rounded-md focus:ring-2 focus:ring-caribbeangreen-100"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-richblue-5 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 bg-richblack-700 text-richblue-5 rounded-md focus:ring-2 focus:ring-caribbeangreen-100"
              />
            </div>

            {/* About */}
            <div>
              <label className="block text-richblue-5 mb-2">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 bg-richblack-700 text-richblue-5 rounded-md focus:ring-2 focus:ring-caribbeangreen-100"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-caribbeangreen-200 to-caribbeangreen-400 text-black font-bold rounded-md hover:from-caribbeangreen-300 hover:to-caribbeangreen-500 transition shadow-md"
            >
              Save Changes
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
