

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {buyCourse}  from '../../../services/apiCalls/studentFeaturesAPI'
import { FaRupeeSign } from 'react-icons/fa'


const RenderCartTotal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {total, cart} = useSelector(state => state.cart)
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const buyCourses = () => {
        // console.log("buy courses")
        const courses = cart.map(course => course._id)
        if(token){
            setIsLoading(true);
            buyCourse(token, courses, user, navigate, dispatch);
            setIsLoading(false);
        }
        else{
            navigate("/login");
        }

        
    }
    
    return (
        <div className='min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-6 '>

        <p className='mb-1 text-sm font-medium text-richblack-300'>Total:</p>
        <p className='mb-6 text-3xl font-medium text-yellow-100 crimson'>₹ {total}</p>
            <button 
            className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 w-full justify-center"
            onClick={() => buyCourses()}>
            {isLoading ? <FaSpinner className="animate-spin" /> : <FaRupeeSign />}
            <span>Checkout</span>
              
            </button>
             </div>
    )
}

export default RenderCartTotal