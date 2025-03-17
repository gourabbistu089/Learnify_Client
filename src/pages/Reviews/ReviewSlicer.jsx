// import { Swiper, SwiperSlide } from "swiper/react"; 
// import { Navigation, Pagination, A11y } from "swiper/modules"; 
// import "swiper/css"; 
// import "swiper/css/navigation"; 
// import "swiper/css/pagination";
// import ReviewCard from "./ReviewCard";



// const ReviewSlicer = ({ Reviews }) => {
//   // Check if Courses is empty and display a message if no courses are available
//   if (Reviews?.length === 0) {
//     return <p>No Reviews Found</p>;
//   }
//  return (
//     <div className="relative px-8 py-8">
//       <Swiper
//         modules={[Navigation, Pagination, A11y]}
//         spaceBetween={30}
//         slidesPerView={1}
//         navigation
//         pagination={{ clickable: true }}
//         breakpoints={{
//           640: { slidesPerView: 1 },
//           768: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//         }}
//         className="mySwiper"
//       >
//         {Reviews.map((review, index) => (
//           <SwiperSlide key={index}>
//             <ReviewCard review={review} />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Arrow Button Styling */}
//       <style jsx>{`
//         .swiper-button-next,
//         .swiper-button-prev {
//           color: white; /* Arrow button color */
//           position: absolute; /* Absolute positioning to control placement */
//           top: 50%; /* Vertically center the arrows */
//           transform: translateY(-50%); /* Adjust for exact center */
//           width: 40px; /* Size of the buttons */
//           height: 40px; /* Ensure square buttons */
//           border-radius: 50%; /* Round buttons */
//           background-color: rgba(255, 255, 255, 0.); /* Light background */
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
//           z-index: 10; /* Ensure arrows are above slides */
//         }

//         .swiper-button-next {
//           right: -10px; /* Adjust right position */
//         }

//         .swiper-button-prev {
//           left: -10px; /* Adjust left position */
//         }

//         .swiper-button-next:hover,
//         .swiper-button-prev:hover {
//           background-color: black; /* Darken background on hover */
//           color: white; /* Change icon color to white */
//         }
//           .swiper-pagination-bullet {
//           width: 12px; /* Size of bullets */
//           height: 12px; /* Make bullets round */
//           background: #ddd; /* Default color with transparency */
//           border: 2px solid white; /* Add a border */
//           margin: 0 4px; /* Spacing between bullets */
//           transition: all 0.3s ease; /* Smooth transition */
//         }

//         .swiper-pagination-bullet-active {
//           background: blue; /* Highlight active bullet */
//           transform: scale(1.3); /* Make active bullet larger */
//           border-color: black; /* Change border color for active bullet */
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ReviewSlicer 

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewCard from "./ReviewCard";
import React, {useState,useEffect, useMemo} from 'react'
import {motion} from 'framer-motion'

const ReviewSlicer = ({ Reviews }) => {
  // Check if Courses is empty and display a message if no courses are available
  if (Reviews?.length === 0) {
    return <p>No Reviews Found</p>;
  }
  return (
    <div className="relative px-8 py-8">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {Reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Arrow Button Styling */}
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white; /* Arrow button color */
          position: absolute; /* Absolute positioning to control placement */
          top: 50%; /* Vertically center the arrows */
          transform: translateY(-50%); /* Adjust for exact center */
          width: 40px; /* Size of the buttons */
          height: 40px; /* Ensure square buttons */
          border-radius: 50%; /* Round buttons */
          background-color: rgba(255, 255, 255, 0.); /* Light background */
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
          z-index: 10; /* Ensure arrows are above slides */
        }

        .swiper-button-next {
          right: -10px; /* Adjust right position */
        }

        .swiper-button-prev {
          left: -10px; /* Adjust left position */
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background-color: black; /* Darken background on hover */
          color: white; /* Change icon color to white */
        }
          .swiper-pagination-bullet {
          width: 12px; /* Size of bullets */
          height: 12px; /* Make bullets round */
          background: #ddd; /* Default color with transparency */
          border: 2px solid white; /* Add a border */
          margin: 0 4px; /* Spacing between bullets */
          transition: all 0.3s ease; /* Smooth transition */
        }

        .swiper-pagination-bullet-active {
          background: blue; /* Highlight active bullet */
          transform: scale(1.3); /* Make active bullet larger */
          border-color: black; /* Change border color for active bullet */
        }
      `}</style>
    </div>
  );
};



export default ReviewSlicer;
