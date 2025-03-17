import React , {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RenderSteps from '../AddCourse/RenderSteps';
import { setCourse, setEditCourse } from '../../../redux/slices/courseSlice';
import { getCourseDetails } from '../../../services/apiCalls/courseCall';

function EditCourse(){
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const {course} = useSelector(state => state.course);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await getCourseDetails(courseId);
            if(result){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result));
            }
            setLoading(false);
        }
        populateCourseDetails();
    }, []);

    if(loading){
        return <p>Loading...</p>
    }

  return (
    <div>
        <h1>Edit Course</h1>
        <div>
            { course ? (<RenderSteps />) : (<p>Course Not found...</p>)}
        </div>
    </div>
  )
}

export default EditCourse