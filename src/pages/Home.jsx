import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import HighlightText from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/Button";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import TimeLineSection from "../components/core/Homepage/TimeLineSection";
import LearningSection from "../components/core/Homepage/LearningSection";
import InstructorSection from "../components/core/Homepage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/Homepage/ExploreMore";
import TestimonialSection from "../components/common/TestimonialSection";
import { useSelector } from "react-redux";
import PlacementSection from "../components/core/Homepage/PlacementSection";
import {motion} from 'framer-motion'

function Home() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      {/* Section 1 */}
      <section className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
      {/* Get Started Button */}
      <NavLink to={user ? "/dashboard/home" : "signup"}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-x-95 w-fit shadow-md mt-16 p-1"
        >
          <div className="flex flex-row items-center gap-2 rounded-full py-1 px-3 group-hover:bg-richblack-900">
            <p>{user ? "Continue Learning" : "Get Started"}</p>
            <FaArrowRight />
          </div>
        </motion.div>
      </NavLink>

      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center font-semibold text-4xl mt-7"
      >
        Empower Your Learning Journey with{" "}
        <HighlightText text={"Learnify 🚀"} />
      </motion.div>

      {/* Subheading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="lg:w-[85%] text-center mt-5 text-lg text-richblack-300 font-bold"
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, soluta
        id, tempore bla lre fd fs dfl dfdl lf sdlkf snditiis quae veniam unde
        aliquid perferendis ipsam distinctio assumendariam iusto! In.
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-row gap-7 mt-8"
      >
        <CTAButton active={true} linkTo={"/signup"}>
          Learn More
        </CTAButton>
        <CTAButton active={false} linkTo={"/login"}>
          Book Demo
        </CTAButton>
      </motion.div>

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

      {/* Explore More Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <ExploreMore />
      </motion.div>
    </section>
      {/* Section 2 */}

      <section className="bg-pure-greys-5 text-richblack-700">
      {/* Hero Section with Background */}
      <div className="hompage_bg h-[230px]">
        <div className="w-11/12 max-w-maxContent flex items-center gap-5 mx-auto flex-col justify-center h-full">
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-row gap-7 text-white"
          >
            <CTAButton active={true} linkTo={"/signup"}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex gap-2 items-center"
              >
                Explore More
                <FaArrowRight />
              </motion.div>
            </CTAButton>
            <CTAButton active={false} linkTo={"/login"}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.div>
            </CTAButton>
          </motion.div>
        </div>
      </div>

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

      {/* Placement Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <PlacementSection />
      </motion.div>

      {/* Timeline Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-6"
      >
        <div className="mb-20">
          <TimeLineSection />
        </div>
      </motion.div>
    </section>

      {/* Section 3 */}

      <div className=" w-11/12 max-w-maxContent mx-auto flex flex-col justify-between gap-8 bg-richblack-900 text-white">
        {/* Become Instructor */}
        <InstructorSection />

        {/* Testimonials */}

        <h2 className=" text-4xl font-semibold text-center mt-10">
          <HighlightText text={"Reviews from our learners"} />
        </h2>

        <TestimonialSection />
      </div>

      {/* footer */}
      <Footer />

      {/* Animated Button with Framer Motion */}
    </div>
  );
}

export default Home;
