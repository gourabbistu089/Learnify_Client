import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import { createRating } from "../../../services/apiCalls/courseCall";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaX } from "react-icons/fa6";
import { CircleX } from "lucide-react";

function ReviewModal({ course, setReviewModal }) {
  console.log("course", course);
  console.log("setReviewModal", setReviewModal);
  const { _id , title} = course;
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const courseId = _id;

  useEffect(() => {
    setValue("courseexperience", "");
    setValue("courserating", 0);
  }, []);

  const ratingChange = (rate) => {
    setValue("courserating", rate);
  };

  const onSubmit = async (data) => {
    const { courserating, courseexperience } = data;
    try {
      const result = await createRating(
        {
          courseId: courseId,
          rating: courserating,
          review: courseexperience,
        },
        token
      );
      if (result) {
        toast.success("Rating Posted Successfully!");
      }
    } catch (error) {
      toast.error("Failed to post rating");
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] md:p-8 rounded-3xl shadow-2xl md:max-w-lg max-w-md md:mx-auto text-white border border-[#334155] relative  ml-16 p-3">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold mb-3 flex items-center gap-2 text-[#facc15] ">
          Share Your Experience
        </h2>
        <CircleX
          className="absolute right-4 top-4  text-[#fffbfb] cursor-pointer"
          onClick={() => setReviewModal(false)}
          size={24}
        />

        <p className="text-gray-400">
          Your feedback helps others make better choices!
        </p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        {user?.image ? (
          <img
            src={user?.image}
            alt="User"
            className="w-14 h-14 rounded-full object-cover border-2 border-[#facc15] shadow-lg hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <FaUserCircle className="w-14 h-14 text-gray-500" />
        )}
        <div>
          <p className="font-semibold text-lg">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm text-gray-500">Sharing your thoughts...</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col items-center">
          <p className="text-lg mb-2 text-[#facc15]">Rate the Course</p>
           <p className="text-lg mb-2 italic font-semibold text-[#ab1ab8]">"{title}"</p>
          <ReactStars
            count={5}
            onChange={ratingChange}
            size={36}
            color2={"#facc15"}
          />
        </div>

        <div>
          <label
            htmlFor="courseexperience"
            className="block mb-3 font-medium text-[#facc15]"
          >
            Your Review
          </label>
          <textarea
            id="courseexperience"
            placeholder="Write your review here..."
            className="w-full bg-[#1e293b] border border-[#334155] p-4 rounded-lg text-white focus:ring-2 focus:ring-[#facc15] focus:outline-none resize-none h-32"
            {...register("courseexperience", { required: true })}
          ></textarea>
          {errors.courseexperience && (
            <p className="text-red-400 text-sm mt-1">Please add a review</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#facc15] hover:bg-[#eab308] text-[#0f172a] font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewModal;
