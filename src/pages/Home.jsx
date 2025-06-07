import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import HighlightText from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/Button";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import TimeLineSection from "../components/core/Homepage/TimeLineSection";
import LearningSection from "../components/core/Homepage/LearningSection";
import InstructorSection from "../components/core/Homepage/InstructorSection";
import Footer from "../components/common/Footer";
import TestimonialSection from "../components/common/TestimonialSection";
import { useSelector } from "react-redux";
import PlacementSection from "../components/core/Homepage/PlacementSection";
import { motion } from "framer-motion";
import HeroSection from "./Home/HeroSection";
import BlogExplorerSection from "../components/core/Homepage/BlogExplorerSection";
import { getAllBlogs } from "../services/apiCalls/blogCall";

function Home() {
  const { user } = useSelector((state) => state.auth);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      let res = await getAllBlogs();
      console.log("Blogs", res);
      setBlogs(res?.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div>
      {/* Section 1 */}
      <section className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
        <HeroSection user={user} />

        {/* Code Section 1 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <CodeBlocks
            position={"lg:flex-row flex-col"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={" Coding Potential"} />
              </div>
            }
            subheading={
              "Our Coding Master course provides a comprehensive learning experience, equipping you with the skills and knowledge needed to excel in the dynamic world of coding."
            }
            ctabtn1={{
              text: "Try it Yourself",
              linkTo: "/signup",
              active: true,
            }}
            ctabtn2={{
              text: "Learn More",
              linkTo: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>\n</body>\n</html>`}
            codeColor={"white"}
            backgroundGradient={"sun-effect"}
          />
        </motion.div>

        {/* Code Section 2 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <CodeBlocks
            position={"lg:flex-row-reverse flex-col"}
            heading={
              <div className="text-4xl font-semibold">
                Achieve
                <HighlightText text={" Mastery in Coding"} />
              </div>
            }
            subheading={
              "Transform your career with our advanced coding courses. Master the most in-demand programming skills and technologies with hands-on projects and expert guidance."
            }
            ctabtn1={{
              text: "Get Started",
              linkTo: "/signup",
              active: true,
            }}
            ctabtn2={{
              text: "View Details",
              linkTo: "/login",
              active: false,
            }}
            codeblock={`# A Python function to calculate factorial
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n - 1)
# Example usage
number = 5
print(f"The factorial is {factorial(number)}")
`}
            codeColor={"lightblue"}
            backgroundGradient={"moon-effect"}
          />
        </motion.div>

        {/* Blog Explore More Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <BlogExplorerSection
            blogs={blogs}
            loading={loading}
            setLoading={setLoading}
          />
        </motion.div>
      </section>
      {/* Section 2 */}

      <section className="">
        {/* Hero Section with Background */}
        {/* Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-6"
        >
          <LearningSection />
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className=""
        >
          <div className="mb-20">
            <TimeLineSection />
          </div>
        </motion.div>
      </section>

      {/* Section 3 */}

      <div className=" bg-richblack-900 text-white md:px-32 mx-auto px-6">
    
        {/* Testimonials */}

       

        <TestimonialSection />
      </div>

      {/* footer */}
      <Footer />

      {/* Animated Button with Framer Motion */}
    </div>
  );
}

export default Home;
