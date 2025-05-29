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
            className="aspect-square w-[38px] md:w-[50px] rounded-full object-cover cursor-pointer border-2 border-purple-400 shadow-lg hover:scale-105 transition-transform"
            alt={`profile-${user?.firstName}`}
            onClick={() => setIsOpen((prev) => !prev)}
          />

          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute -right-[175%] md:left-[40%] top-12 text-white rounded-lg shadow-xl border border-gray-600 z-50 transform scale-100 duration-200 
           
              bg-richblack-800 -translate-x-1"
            >
              <div className="flex flex-col py-1 md:py-3">
             
                {/* Menu Options */}
                <button
                  className="flex items-center gap-1 px-3 py-2 hover:bg-brown-700 transition-all text-sm font-medium"
                  onClick={() => navigate("/dashboard/home")}
                >
                  <MdDashboard size={20} className="text-[#f4b8ec]" />
                 <span className=" text-sm">Dashboard</span>
                </button>

                <button
                  className="flex items-center gap-2 px-4 py-2 hover:bg-brown-700 transition-all text-sm font-medium"
                  onClick={handleLogout}
                >
                  <FiLogOut size={20} className="text-[#ff8888]" />
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
