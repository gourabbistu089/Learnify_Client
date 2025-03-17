import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { logout } from "../../../services/apiCalls/authCall";
import { Navigate, useNavigate } from "react-router-dom";

function ProfileDropdown() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Handle click outside of the dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className="relative">
      {user && (
        <>
          <img
            src={user?.image}
            className="aspect-square w-[40px] rounded-full object-cover cursor-pointer border-2 border-purple-400 shadow-lg hover:scale-105 transition-transform"
            alt={`profile-${user?.firstName}`}
            onClick={() => setIsOpen((prev) => !prev)}
          />

          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute left-[40%] top-12  bg-gray-800 text-white rounded-lg shadow-xl border border-gray-600 z-50 transform scale-100 duration-200 
           
              bg-richblack-800 -translate-x-1"
            >
              <div className="flex flex-col py-3">
             
                {/* Menu Options */}
                <button
                  className="flex items-center gap-2 px-4 py-2 hover:bg-brown-700 transition-all text-sm font-medium"
                  onClick={() => navigate("/dashboard/home")}
                >
                  <MdDashboard size={20} className="text-purple-300" />
                  Dashboard
                </button>

                <button
                  className="flex items-center gap-2 px-4 py-2 hover:bg-brown-700 transition-all text-sm font-medium"
                  onClick={handleLogout}
                >
                  <FiLogOut size={20} className="text-red-300" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProfileDropdown;
