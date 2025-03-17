import React, { useEffect, useState } from 'react'
import { getAllRatingAndReviews } from '../../services/apiCalls/courseCall'
import ReviewSlicer from '../../pages/Reviews/ReviewSlicer';

function TestimonialSection() {
  const [reviews , setReviews] = useState([]);
  async function getReviews(){
    const res = await getAllRatingAndReviews();
    setReviews(res);
  }
  useEffect(() => {
    getReviews();
  },[])
  // console.log("REVIEWS", reviews)
  return (
    <div className=' text-white'>
      <ReviewSlicer Reviews={reviews} />
    </div>
  )
}

export default TestimonialSection