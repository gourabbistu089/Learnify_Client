import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaBook, FaChalkboardTeacher, FaHome, FaUser } from "react-icons/fa";
import { MdArrowForward, MdDeleteForever, MdOutlineAssignment } from "react-icons/md";
import { FiSettings, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { ChevronLeft, CircleChevronLeft, CircleChevronRight } from "lucide-react";

function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  const userRole = user?.accountType;

  if (authLoading || profileLoading) {
    return <div className="text-white mt-10">Loading...</div>;
  }

  const studentLinks = [
    { to: "/dashboard/home", label: "Home", icon: <FaHome /> },
    { to: "/dashboard/enrolled-courses", label: "Enrolled Courses", icon: <FaBook /> },
    { to: "/dashboard/assignments", label: "Assignments", icon: <MdOutlineAssignment /> },
    { to: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
    { to: "/dashboard/setting", label: "Setting", icon: <FiSettings /> },
    { to: "/dashboard/cart", label: "Cart", icon: <FiShoppingCart /> },
    { to: "/dashboard/delete-account", label: "Delete Account", icon: <MdDeleteForever />, sensitive: true },
  ];

  const instructorLinks = [
    { to: "/dashboard/home", label: "Dashboard", icon: <FaHome /> },
    { to: "/dashboard/my-courses", label: "My Courses", icon: <FaBook /> },
    { to: "/dashboard/add-course", label: "Add Course", icon: <FaChalkboardTeacher /> },
    { to: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
    { to: "/dashboard/setting", label: "Setting", icon: <FiSettings /> },
    { to: "/dashboard/delete-account", label: "Delete Account", icon: <MdDeleteForever />, sensitive: true },
  ];

  const links = userRole === "student" ? studentLinks : instructorLinks;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="bg-richblack-800 text-white flex-col min-h-[222px] border-r border-richblack-700 h-[calc(100vh-3.5rem)] py-10 hidden md:flex">
        <div className="px-4 text-xl font-bold mb-6">
          {userRole === "student" ? "Student Panel" : "Instructor Panel"}
        </div>
        <nav className="flex flex-col space-y-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 rounded-md transition-all duration-200 ${
                  link.sensitive 
                    ? "text-[#f82525] hover:text-white hover:bg-[#f82525]" 
                    : "hover:bg-richblack-700"
                } ${isActive ? "bg-richblack-700 text-yellow-300" : "text-richwhite-200"}`
              }
            >
              {link.icon}
              <span className="text-lg">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        {/* Mobile Icon Bar */}
        <div className="fixed left-0 top-[3.5rem] bg-richblack-800 text-white border-r border-richblack-700 h-[calc(100vh-3.5rem)] w-16 flex flex-col items-center py-4 z-40">
         
          {/* Icon-only Links */}
          <nav className="flex flex-col space-y-4 w-full">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center justify-center p-3 rounded-md transition-all duration-200 mx-1 text-2xl ${
                    link.sensitive 
                      ? "text-[#f82525] hover:text-white hover:bg-[#f82525]" 
                      : "hover:bg-richblack-700"
                  } ${isActive ? "bg-richblack-700 text-yellow-300" : "text-richwhite-200"}`
                }
              >
                {link.icon}
              </NavLink>
            ))}
          </nav>

           {/* Menu Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            className="mb-6 p-2 hover:bg-richblack-700 rounded-md transition-all duration-200"
          >
            <CircleChevronRight   size={30} />
          </button>

        </div>

        {/* Mobile Slide-out Menu */}
        <div
          className={`fixed left-0 top-[3.5rem] bg-richblack-800 text-white border-r border-richblack-700 h-[calc(100vh-3.5rem)] w-72 transform transition-transform duration-300 ease-in-out z-50 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header with Close Button */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-richblack-700">
            <div className="text-lg font-bold">
              {userRole === "student" ? "Student Panel" : "Instructor Panel"}
            </div>
            
          </div>

          {/* Full Menu Links */}
          <nav className="flex flex-col space-y-2 p-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                    link.sensitive 
                      ? "text-[#f82525] hover:text-white hover:bg-[#f82525]" 
                      : "hover:bg-richblack-700"
                  } ${isActive ? "bg-richblack-700 text-yellow-300" : "text-richwhite-200"}`
                }
              >
                {link.icon}
                <span className="text-base">{link.label}</span>
              </NavLink>
            ))}
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-richblack-700 rounded-md transition-all duration-200 flex justify-end"
            >
              <CircleChevronLeft size={30} />
            </button>
          </nav>
          
        </div>

        {/* Backdrop Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </div>
    </>
  );
}

export default Sidebar;