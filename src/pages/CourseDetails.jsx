import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCourseDetails } from '../services/apiCalls/courseCall';
import { BsGlobe } from 'react-icons/bs';
import { ACCOUNT_TYPE } from '../utils/constants';
import { FaChevronDown, FaShareSquare, FaVideo } from 'react-icons/fa';
import RatingStars from '../components/common/RatingStars';
import GetAvgRating from '../utils/avgRating';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { IoVideocamOutline } from 'react-icons/io5';
import { buyCourse } from '../services/apiCalls/studentFeaturesAPI';
import toast from 'react-hot-toast';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { addToCart } from '../redux/slices/cartSlice';

function CourseDetails() {
    const {token} = useSelector(state => state.auth);
    const {courseId} = useParams();
    const[courseDetails, setCourseDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(state => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
    const {cart} = useSelector(state => state.cart);
    const [confirmationModal, setConfirmationModal] = useState(false);
    


    useEffect(() => {
        const fetchCourseDetails = async () => {
            setLoading(true);
            const result = await getCourseDetails(courseId);
            if(result){
                setCourseDetails(result);
            }
            setLoading(false);
        }
        fetchCourseDetails();
    }, [courseId]);

    useEffect(() => {
        const Enrolled = courseDetails?.studentsEnrolled?.find((_id) => _id === user?._id);
        // console.log("Course Details", courseDetails);
        if(Enrolled){
            setAlreadyEnrolled(true);
        }
        const avgRating = GetAvgRating(courseDetails?.ratingAndReview);
        setAvgReviewCount(avgRating);
    }, [courseDetails, user?._id]);

    // console.log("Already Enrolled", alreadyEnrolled)    

    const handelPayment = () => {
        console.log("Handle Payment");
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
        }
        else{
            setConfirmationModal({
                text1: "You are not logged in",
                text2: "Please login to buy course",
                btn1Text: "Login",
                btn2Text: "Cancel",
                btn1Handler: () => {
                    navigate("/login");
                },
                btn2Handler: () => {
                    setConfirmationModal(null);
                }
            });
        }
    }
    const handelAddToCart = () => {
        // console.log("Handle Add to Cart");
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("Only student can add course to cart");
            return;
        }
        if(token){
            dispatch(addToCart(courseDetails));
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to buy course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => {
                navigate("/login");
            },
            btn2Handler: () => {
                setConfirmationModal(null);
            }
        })
    }

    // console.log("Course Details", courseDetails);
    if(loading){
        return (
            <div className="flex items-center justify-center min-h-screen flex-col">
                <div className="animate-spin rounded-full border-b-2 border-richblack-200 h-10 w-10 mr-3"></div>
            </div>
        );
    }
    if(!courseDetails){
        return <div>Course not found</div>;
    }

  return (
    <div>
    <div className='mx-auto box-content px-4 lg:w-[1260px] lg:relative '>
        <div className='mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]'>
            <div className='relative block max-h-[30rem] lg:hidden'>
                <div className='absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]'></div>
                    <img src={courseDetails?.thumbnail} alt="course img" />
            </div>
                <div className='z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5'>  
                        <p className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>{courseDetails?.title}</p>
                        <p className='text-richblack-200'>{courseDetails?.courseDescription}</p>
                        <div className='flex gap-x-3 items-center'>
                    <span className='text-yellow-50'>{avgReviewCount || 0}</span>
                    <RatingStars Review_Count={avgReviewCount} />
                    <span className=' md:block hidden md:text-xl text-richblack-5'>({courseDetails?.ratingAndReviews?.length} Reviews)</span>
                    {/* student enrolled */}
                    <span className='text-richblack-200'>{courseDetails?.studentsEnrolled?.length} students enrolled</span>
                </div>
                <div>
                    <p>Created By {courseDetails?.instructor?.firstName}  {courseDetails?.instructor?.lastName}</p>
                </div>
                <div className='flex flex-wrap gap-5 text-lg'>
                    <AiOutlineInfoCircle className='text-2xl text-richblack-5' />
                    <p className='text-richblack-50'>Created at &nbsp;    
                    {new Date(courseDetails?.createdAt || courseDetails?.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                    </p>
                    <p className='flex items-center gap-2 text-richblack-50'><BsGlobe className='text-lg text-richblack-50'/>English</p>
                </div>
                </div>
                <div className='flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden '>
                    <p className='space-x-3 pb-4 text-3xl font-semibold text-richblack-5'>
                        <span>₹{courseDetails?.price}</span></p>
                        {ACCOUNT_TYPE.INSTRUCTOR !==user?.accountType &&
                         <>
                         {
                             alreadyEnrolled ? <button onClick={()=>{navigate("/dashboard/enrolled-courses")}} className=' bg-yellow-200 px-3 py-2 text-center text-sm font-semibold text-richblack-900'>Go to Course</button> : <button onClick={handelPayment} className=' bg-yellow-200 px-3 py-2 text-center text-sm font-semibold text-richblack-900'>Buy Now</button>
                         }
                         {
                         alreadyEnrolled ? (<div></div>) : 
                         (
                             cart?.find((item) => item?._id === courseDetails?._id) ?
                             (<button onClick={()=>{navigate("/dashboard/cart")}} className=' bg-richblack-800 px-3 py-2 text-center text-sm font-semibold text-richblack-50'>Go to Cart</button>) :
                             (<button onClick={handelAddToCart} className=' bg-richblack-800 px-3 py-2 text-center text-sm font-semibold text-richblack-50'>Add to Cart</button>)
                         )
                     }
                         </>
                        }
                </div>
            </div>
            <div className='right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block'>
                <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
                    <img src={courseDetails?.thumbnail} alt="course img" className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full' />
                    <div className='px-4'>
                        <div className='space-x-3 pb-4 text-3xl font-semibold'>
                            <span>₹{courseDetails?.price}</span>
                        </div>
                        <div className='flex flex-col gap-4'>
                            {console.log(user)}
                            {ACCOUNT_TYPE.INSTRUCTOR !==user?.accountType &&
                            <>
                            {
                                alreadyEnrolled ? <button onClick={()=>{navigate("/dashboard/enrolled-courses")}} className=' bg-yellow-200 px-3 py-2 text-center text-sm font-semibold text-richblack-900'>Go to Course</button> : <button onClick={handelPayment} className=' bg-yellow-200 px-3 py-2 text-center text-sm font-semibold text-richblack-900'>Buy Now</button>
                            }
                            {
                            alreadyEnrolled ? (<div></div>) : 
                            (
                                cart?.find((item) => item?._id === courseDetails?._id) ?
                                (<button onClick={()=>{navigate("/dashboard/cart")}} className=' bg-richblack-800 px-3 py-2 text-center text-sm font-semibold text-richblack-50'>Go to Cart</button>) :
                                (<button onClick={handelAddToCart} className=' bg-richblack-800 px-3 py-2 text-center text-sm font-semibold text-richblack-50'>Add to Cart</button>)
                            )
                        }
                            </>
                            }
                        </div>
                        <div className='pb-3 pt-6 text-center text-sm text-richblack-25'>
                            <p>30-Day Money-Back Guarantee</p>
                        </div>
                        <div className='text-center'>
                            {/* copy url */}
                            <button className='mx-auto flex items-center gap-2 py-6 text-yellow-100' onClick={
                                () => {
                                    navigator.clipboard.writeText(window.location.href);
                                    toast.success('URL copied to clipboard');
                                }
                            }>
                                <FaShareSquare className='text-xl text-yellow-200'/>
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
            <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]'>
                <div className='my-8 border border-richblack-600 p-8'>
                    <p className='text-3xl font-semibold'>
                        What you'll learn
                    </p>
                    <div className='mt-5'>
                        {
                            courseDetails?.whatYouWillLearn
                        }
                    </div>
                </div>
                <div className='max-w-[830px] '>
                    <div className='flex flex-col gap-3'>
                        <p className='text-[28px] font-semibold'>Course Content</p>
                        <div className='flex flex-wrap justify-between gap-2'>
                            <div className='flex gap-2'>
                            <span>{courseDetails?.courseContent?.length} Section(s)</span>
                            <span>{courseDetails?.courseContent?.reduce((acc, item) => acc + item?.subSection?.length, 0)} Lecture(s)</span>
                            </div>
                            <button className='text-yellow-25'>
                                <span>Collapse all sections</span>
                            </button>
                        </div>
                    </div>
                    <div className='py-4'>
                        {
                            courseDetails?.courseContent?.map((item, index) => (
                                <details key={index} className=' border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 detailanimatation'>
                                    <summary className='flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-5 transition-[0.3s]'>
                                        <div className='flex items-center gap-2'>
                                        <FaChevronDown className='arrow '/>
                                        <span className='text-xl'>{item?.sectionName}</span>
                                        </div>
                                        <div className='space-x-4'>
                                            <span className='text-yellow-25'>{item?.subSection?.length} Lecture(s)</span>
                                        </div>
                                    </summary>
                                    <div className='mt-5'>
                                        {
                                            item?.subSection?.map((subItem, subIndex) => (
                                                <div key={subIndex} className='relative overflow-hidden bg-richblack-900  p-5 border border-solid border-richblack-600'>
                                                    <div className='flex items-center gap-2'>
                                                    <FaVideo className='txt-lg text-richblack-5'/>
                                                    <span className='text-lg'>{subItem?.title}</span>
                                                    </div>
                                                </div>
                                                
                                            ))
                                        }
                                        </div>
                                </details>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='mb-12 py-4'>
        </div>
            <p className='text-[28px] font-semibold'>
                Author
            </p>
            <div className='flex items-center gap-4 py-4'>
                <img src={courseDetails?.instructor.image} alt="author img" className='w-[50px] h-[50px] rounded-full object-cover'/>
                <p className='text-xl font-semibold'>{courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</p>
            </div>
            <p className='text-richblack-50 text-sm mb-10'>{courseDetails?.instructor?.additionalDetails?.about}</p>
        </div>

        {/* Reviews */}
        <div className='mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
            <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[990px]'>
                <div className='my-8 border border-richblack-600 p-3 md:p-8'>
                    <p className='text-3xl font-semibold'>
                        Reviews
                    </p>
                    <div className='mt-5'>
                        <div className='flex items-center gap-4'>
                            <div className='flex items-center gap-2'>
                                <span className='text-4xl font-semibold'>{avgReviewCount}</span>
                                <span className='text-2xl'>/5</span>
                                <span className='text-richblack-50'>({courseDetails?.ratingAndReviews?.length} ratings)</span>
                                <span className='text-richblack-50'>|</span>
                                <span className='text-richblack-50'> {courseDetails?.studentsEnrolled?.length} students</span>
                                </div>
                            </div>
                            </div>
                            {
                                courseDetails?.ratingAndReviews?.map((item, index) => (
                                    <div key={index} className='flex flex-col md:items-baseline gap-3 my-4 mt-12 ga'>
                                        <div className='flex items-center gap-2'>
                                            <img src={item?.user?.image} alt="user img" className='w-[30px] h-[30px] rounded-full object-cover'/>
                                            <div className='flex flex-col'>
                                                <p className='md:text-xl min-w-max font-semibold'>{item?.user?.firstName} {item?.user?.lastName}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex items-center gap-2'>
                                                <RatingStars Review_Count={item?.rating}/>
                                            </div>
                                            <p className='text-richblack-50 text-[12px] md:text-sm max-w-4xl'>{item?.review}</p>
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                            </div>
                            </div>
                            


        {
            confirmationModal && (
                <ConfirmationModal modalData={confirmationModal} />
            )
        }
    </div>
  )
}

export default CourseDetails