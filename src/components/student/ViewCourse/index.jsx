import React, { useEffect } from 'react'
import VideoDetailsSidebar from './VideoDetailsSidebar'
import { Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getFullCourseDetails } from '../../../services/apiCalls/courseCall';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../../../redux/slices/viewCourseSlice';


function ViewCourse() {
    const [reviewModal, setReviewModal] = React.useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    useEffect(() => {
        const setCourseSpecificData = async () => {
            const result = await getFullCourseDetails(courseId, token, dispatch);
            console.log("full course details", result);
            dispatch(setCourseSectionData(result.courseDetails.courseContent));
            dispatch(setEntireCourseData(result.courseDetails));
            dispatch(setCompletedLectures(result.completedVideos));
            let lecture = 0;
            result?.courseDetails?.courseContent?.forEach((section) => {
                lecture += section?.subSection?.length;
            });
            dispatch(setTotalNoOfLectures(lecture));
        }
        setCourseSpecificData();
    }, []);
  return (
    <div className=' flex '>
            <VideoDetailsSidebar/>

        <div className=' flex-1'>
            <Outlet/>
        </div>

        {reviewModal && (
            <>
            </>
        )}
    </div>
  )
}

export default ViewCourse