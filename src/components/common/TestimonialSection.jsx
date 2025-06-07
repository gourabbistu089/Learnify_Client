import React, { useEffect, useState } from 'react'
import { getAllRatingAndReviews } from '../../services/apiCalls/courseCall'
import ReviewSlicer from '../../pages/Reviews/ReviewSlicer';

function TestimonialSection() {
  const [reviews , setReviews] = useState([]);
  async function getReviews(){
    const res = await getAllRatingAndReviews();
    setReviews(res);
  }

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    getReviews();
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  },[])
  // console.log("REVIEWS", reviews)
  return (
    <div className=' text-white '>
        <div className="text-center mb-20">
          <div className="inline-block">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight
                         transform transition-all duration-1000 ease-out ${
                           isVisible
                             ? "translate-y-0 opacity-100"
                             : "translate-y-8 opacity-0"
                         }`}
              style={{ textShadow: "0 0 40px rgba(255,255,255,0.1)" }}
            >
             What our Students Say
            </h1>

            {/* Animated Decorative Elements */}
            <div
              className={`flex items-center justify-center space-x-4 transform transition-all duration-1000 delay-300 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-32 animate-pulse"></div>

              {/* Animated Center Dots */}
              <div className="flex space-x-2">
                {[0, 100, 200].map((delay, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    style={{
                      animation: `pulse 2s ease-in-out infinite ${delay}ms`,
                    }}
                  />
                ))}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1 max-w-32 animate-pulse"></div>
            </div>
          </div>

       
        </div>
      <ReviewSlicer Reviews={reviews} />
    </div>
  )
}

export default TestimonialSection