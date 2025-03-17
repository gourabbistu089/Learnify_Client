import React from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaBirthdayCake,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    firstName,
    lastName,
    email,
    accountType,
    additionalDetails: { gender, dateOfBirth, contactNumber, address, about },
    image,
    createdAt,
  } = user;

  const navigate = useNavigate();
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-richblack-900 to-richblack-800 text-pure-greys-100 flex justify-center items-center py-12 px-6">
      <div className=" bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 shadow-2xl rounded-xl w-full max-w-5xl p-8 lg:p-12">
        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
          {/* Profile Image */}
          <div className="relative group">
            <img
              src={image}
              alt={`${firstName} ${lastName}`}
              className="w-40 h-40 rounded-full border-4 border-yellow-400 shadow-md object-cover transition-transform group-hover:scale-105"
            />

            <span className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-40 transition-opacity rounded-full" />
          </div>

          {/* User Info */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-yellow-300 mb-2">
              {firstName} {lastName}
            </h1>
            <p className="text-lg font-medium text-pure-greys-200 mb-4">
              {accountType}
            </p>
            <button
              onClick={()=>navigate('/dashboard/setting')}
              className="inline-block px-6 py-2 bg-brown-400 text-richblack-900 font-bold rounded-md hover:bg-brown-500 transition"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Email */}
          <div className="p-6 bg-richblack-800 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-caribbeangreen-200 text-2xl" />
              <h2 className="text-lg font-semibold text-pure-greys-100">Email</h2>
            </div>
            <p className="mt-2 text-pure-greys-200 text-sm">{email || "Not Provided"}</p>
          </div>

          {/* Date of Birth */}
          <div className="p-6 bg-richblack-800 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <FaBirthdayCake className="text-pink-200 text-2xl" />
              <h2 className="text-lg font-semibold text-pure-greys-100">Date of Birth</h2>
            </div>
            <p className="mt-2 text-pure-greys-200 text-sm">{dateOfBirth ? formatDate(dateOfBirth) : "Not Provided"}</p>
          </div>

          {/* Gender */}
          <div className="p-6 bg-richblack-800 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <FaUserCircle className="text-yellow-200 text-2xl" />
              <h2 className="text-lg font-semibold text-pure-greys-100">Gender</h2>
            </div>
            <p className="mt-2 text-pure-greys-200 text-sm">{gender || "Not Provided"}</p>
          </div>

          {/* Contact */}
          <div className="p-6 bg-richblack-800 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <FaPhone className="text-richblue-200 text-2xl" />
              <h2 className="text-lg font-semibold text-pure-greys-100">Contact</h2>
            </div>
            <p className="mt-2 text-pure-greys-200 text-sm">{contactNumber || "Not Provided"}</p>
          </div>

          {/* Address */}
          <div className="p-6 bg-richblack-800 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-pink-400 text-2xl" />
              <h2 className="text-lg font-semibold text-pure-greys-100">Address</h2>
            </div>
            <p className="mt-2 text-pure-greys-200 text-sm">{address || "Not Provided"}</p>
          </div>

          {/* About */}
          <div className="p-6 bg-richblack-800 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <FaUserCircle className="text-caribbeangreen-400 text-2xl" />
              <h2 className="text-lg font-semibold text-pure-greys-100">About</h2>
            </div>
            <p className="mt-2 text-pure-greys-200 text-sm">{about || "Not Provided"}</p>
          </div>

          {/* Member Since */}
          <div className="p-6 bg-richblack-800 rounded-lg shadow-md col-span-full">
            <div className="flex items-center gap-4">
              <FaUserCircle className="text-caribbeangreen-200 text-2xl" />
              <h2 className="text-lg font-semibold text-pure-greys-100">Member Since</h2>
            </div>
            <p className="mt-2 text-pure-greys-200 text-sm">{formatDate(createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
