import React from "react";
import RatingStars from "../../components/common/RatingStars";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

function ReviewCard({ review }) {
  const { user, course, rating, review: ReviewText } = review;

  return (
    <div className="bg-gradient-to-br from-[#1a1c2b] to-[#1a1c2d] text-white md:p-6 p-4 md:rounded-[31px_99px_38px_99px] rounded-[31px_89px_38px_89px] shadow-2xl border border-[#3a3d5c] md:w-96 w-[22rem] transition-transform transform hover:scale-105 duration-300 md:min-h-60 min-h-50 h-auto">
      <div className="flex items-start gap-2">
        <img
          src={user?.image}
          alt={user?.firstName}
          className="w-14 h-14 rounded-full border-4 border-[#f59e0b] shadow-lg"
        />
        <div>
          <h3 className="text-lg font-bold text-[#f59e0b]">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-sm text-[#d1d5db] italic">{course?.title}</p>
          <div className="flex mt-2">
            <RatingStars Review_Count={rating} />
          </div>
        </div>
      </div>

      <div className="mt-4 bg-[#20223539] p-5 rounded-xl border border-[#4b4e6a00] shadow-lg relative text-center">
        <FaQuoteLeft className="absolute -top-4 -left-2 text-[#f59e0b] text-xl" />
        <p className="text-[#e5e7eb] text-base leading-relaxed italic text-left">{ReviewText}</p>
        <FaQuoteRight className="absolute -bottom-4 -right-2 text-[#f59e0b] text-xl" />
      </div>
    </div>
  );
}

export default ReviewCard;
