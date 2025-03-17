import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaBook, FaChalkboardTeacher, FaHome, FaUser } from "react-icons/fa";
import { MdDeleteForever, MdOutlineAssignment } from "react-icons/md";
import { FiSettings, FiShoppingCart } from "react-icons/fi";

function Sidebar() {
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
    {to:"/dashboard/setting", label:"Setting", icon: <FiSettings/>},
    {to:"/dashboard/cart", label:"Cart", icon: <FiShoppingCart/>},
    { to: "/dashboard/delete-account", label: "Delete Account", icon: <MdDeleteForever />, sensitive: true },
  ];

  const instructorLinks = [
    { to: "/dashboard/home", label: "Dashboard", icon: <FaHome /> },
    { to: "/dashboard/my-courses", label: "My Courses", icon: <FaBook /> },
    { to: "/dashboard/add-course", label: "Add Course", icon: <FaChalkboardTeacher /> },
    { to: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
    {to:"/dashboard/setting", label:"Setting", icon: <FiSettings/>},
    { to: "/dashboard/delete-account", label: "Delete Account", icon: <MdDeleteForever />, sensitive: true },
  ];

  const links = userRole === "student" ? studentLinks : instructorLinks;

  return (
    <div className="bg-richblack-800 text-white flex flex-col min-h-[222px] border-r border-richblack-700 h-[calc(100vh-3.5rem)] py-10">
      <div className="px-4 text-xl font-bold mb-6">{userRole === "student" ? "Student Panel" : "Instructor Panel"}</div>
      <nav className="flex flex-col space-y-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 rounded-md transition-all duration-200 ${
                link.sensitive ? "text-[#f82525] hover:text-white hover:bg-[#f82525]" : "hover:bg-richblack-700"
              } ${isActive ? "bg-richblack-700 text-yellow-300" : "text-richwhite-200"}`
            }
          >
            {link.icon}
            <span className="text-lg">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
