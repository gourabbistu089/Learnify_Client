import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import OpenRoute from "./components/core/auth/OpenRoute";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/core/auth/ProtectedRoute";
import SHome from "./components/student/SHome.jsx";
import EnrolledCourses from "./components/student/EnrolledCourses.jsx";
import Assignments from "./components/student/Assignments.jsx";
import { useSelector } from "react-redux";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProfilePage from "./components/student/ProfilePage.jsx";
import Setting from "./components/student/Setting.jsx";
import MyCourses from "./components/instructor/MyCourses.jsx";
import IHome from "./components/instructor/IHome.jsx";
import Cart from "./components/student/Cart/index.jsx";
import AddCourse from "./components/instructor/AddCourse/index.jsx";
import EditCourse from "./components/instructor/EditCourse/index.jsx";
import Catalog from "./pages/Catalog.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import { ToastContainer } from "react-toastify";
import ViewCourse from "./components/student/ViewCourse/index.jsx";
import VideoDetails from "./components/student/ViewCourse/VideoDetails.jsx";
import AllCourses from "./pages/AllCourses.jsx";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Blogs from "./pages/Blogs.jsx";
import Blog from "./pages/Blog.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";

export default function App() {
  const { user } = useSelector((state) => state.auth);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
     <ToastContainer
        theme="dark" // 👈 sets the dark background
        position="top-right" // or 'bottom-right', etc.
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
     <div className="mb-12">
       <Navbar />
     </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/catalog/:catalogName/:categoryId" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/courses" element={<AllCourses />} />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <OpenRoute>
              <VerifyOtp />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route 
          path="/blogs"
          element={
            // <ProtectedRoute>
              <Blogs />
            // </ProtectedRoute>
          }/>
        <Route 
          path="/blogs/:slug"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }/>

        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard/profile" element={<ProfilePage />} />
          <Route path="dashboard/setting" element={<Setting />} />
          <Route path="dashboard/create-blog" element={<CreateBlog />} />
          {user?.accountType === "instructor" && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
              <Route path="dashboard/home" element={<IHome />} />
            </>
          )}
          {user?.accountType === "student" && (
            <>
              <Route path="dashboard/home" element={<SHome />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="dashboard/assignments" element={<Assignments />} />
              <Route path="dashboard/cart" element={<Cart />} />
            </>
          )}
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <ViewCourse />
            </ProtectedRoute>
          }
        >
          {user?.accountType === "student" && (
            <>
              <Route
                path="view-course/:courseId/:section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            onClick={scrollToTop}
            className="fixed z-[55] bottom-8 right-8 bg-[#ffd426] text-white p-3 rounded-full shadow-lg hover:bg-[#826b0fda] transition duration-300"
          >
            <FaArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
