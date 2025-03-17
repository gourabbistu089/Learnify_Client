import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../api";
import toast from "react-hot-toast";

export const fetchCourseCategories = async()=>{
    let categories = [];
    try {
        const response = await apiConnector("GET",
            courseEndpoints.COURSE_CATEGORIES_API
        );
        // console.log("response", response);
        if(response.status === 200){
            categories = response?.data?.categories;
        }
        else{
            console.log("Error in fetching course categories");
        }
        
    } catch (error) {
        console.log("Error in Fetch course categories",error)
    }
    return categories;
}

export const createCourse = async (formData)=>{
 let result = null;
 const token = localStorage.getItem("token");
 try {
    console.log("Printing form data", formData);
    const response = await apiConnector("POST",
        courseEndpoints.COURSE_CREATE_API,
        formData,
        {
            Authorization:`${token}`
        }
     
    );
    console.log(response);
    result = response;
    toast.success("Course created successfully");
 } catch (error) {
    toast.error("Error in creating course");
    console.log("Error in creating course",error);
 }
 return result;
}

export const editCourseDetails = async (formData)=>{
    let result = null;
    const token = localStorage.getItem("token");
    try {
       const response = await apiConnector("POST",
           courseEndpoints.COURSE_EDIT_API,
           formData,
           { Authorization:`Bearer ${token}` }
       );
       console.log(response);
       result = response;
       toast.success("Course details updated successfully");
   } catch (error) {
       toast.error("Error in editing course details");
       console.log("Error in editing course details",error);
    }
    return result;
   }

export const deleteCourse = async (courseId)=>{
    let result = null;
    const token = localStorage.getItem("token");
    try {
        const response = await apiConnector("DELETE",
            courseEndpoints.COURSE_DELETE_API,
            { courseId },
            { Authorization:`Bearer ${token}` }
        );
        console.log(response);
        result = response.data.data;
        toast.success("Course deleted successfully");
    } catch (error) {
        toast.error("Error in deleting course");
        console.log("Error in deleting course",error);
    }
    return result;
}

export const getCourseDetails = async (courseId)=>{
    let result = null;
    const token = localStorage.getItem("token");
    try {
        const response = await apiConnector("POST",
            courseEndpoints.COURSE_DETAILS_API,
            { courseId },
            // { Authorization:`Bearer ${token}` }
        );
        console.log(response);
        result = response?.data?.data;
    } catch (error) {
        console.log("Error in fetching course details",error)
    }
    return result;
}
export const getFullCourseDetails = async (courseId,token,dispatch)=>{
    let result = null;
    try {
        const response = await apiConnector("POST",
            courseEndpoints.FULL_COURSE_DETAILS_API,
            { courseId },
            { Authorization:`Bearer ${token}` }
        );
        console.log(response);
        result = response?.data?.data;
    } catch (error) {
        console.log("Error in fetching course details",error)
    }
    return result;
}

export const updateSection = async (formData)=>{
 let result = null;
 const token = localStorage.getItem("token");
 try {
    const response = await apiConnector("POST",
        courseEndpoints.SECTION_UPDATE_API,
        formData,
        { Authorization:`Bearer ${token}` }
    );
    console.log(response);
    result = response;
    toast.success("Section updated successfully");
 } catch (error) {
    toast.error("Error in updating section");
    console.log("Error in updating section",error);
 }
 return result;
}


export const createSection = async (formData)=>{
 let result = null;
 const token = localStorage.getItem("token");
 try {
    const response = await apiConnector("POST",
        courseEndpoints.SECTION_CREATE_API,
        formData,
        { Authorization:`Bearer ${token}` }
    );
    console.log(response);
    result = response;
    toast.success("Section created successfully");
 } catch (error) {
    toast.error("Error in creating section");
    console.log("Error in creating section",error);
 }
 return result;
}


export const createSubSection = async (formData)=>{
 let result = null;
 const token = localStorage.getItem("token");
 try {
    const response = await apiConnector("POST",
        courseEndpoints.SUBSECTION_CREATE_API,
        formData,
        { Authorization:`Bearer ${token}` }
    );
    console.log(response);
    result = response;
    toast.success("SubSection created successfully");
 } catch (error) {
    toast.error("Error in creating subsection");
    console.log("Error in creating subsection",error);
 }
 return result;
}
export const updateSubSection = async (formData)=>{
    let result = null;
    const token = localStorage.getItem("token");
    try {
        const response = await apiConnector("POST",
            courseEndpoints.SUBSECTION_UPDATE_API,
            formData,
            { Authorization:`Bearer ${token}` }
        );
        console.log(response);
        result = response;
        toast.success("SubSection updated successfully");
    } catch (error) {
        toast.error("Error in updating subsection");
        console.log("Error in updating subsection",error);
    }
    return result;
}

export const deleteSection = async (formData)=>{}


export const deleteSubSection = async (formData)=>{}

export const fetchInstructorCourses = async ()=>{
    let courses = [];
    const token = localStorage.getItem("token");
    try {
        const response = await apiConnector("GET",
            courseEndpoints.GET_INSTRUCTOR_COURSES,
            null,
            { Authorization:`Bearer ${token}` }
        );
        console.log(response);
        if(response.status === 200){
            courses = response?.data?.data;
        }
        else{
            console.log("Error in fetching instructor courses");
        }
        
    } catch (error) {
        console.log("Error in Fetch instructor courses",error)
    }
    return courses;
}

export const getCatalogsPageData = async ({categoryId}) => {

    let result = null;
    try {
        const response = await apiConnector("POST",
            courseEndpoints.CATALOG_PAGE_DATA_API,
            {categoryId}
        ) 
        // console.log("RESPONSE", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        else{
            result = response.data.data;
            // toast.success("Successfully fetched data");
            // console.log("Toast Success");
        }
        
    } catch (error) {
        console.log("CATALOG_PAGE_DATA_API", error);
        toast.error(error.message);

    }
    return result;
}

export const createRating = async (data, token) => {
    // const toastId = toast.loading("Loading...");
    let success = false;
    try {
      const response = await apiConnector("POST", courseEndpoints.CREATE_RATING_API, data, {
        Authorization: `Bearer ${token}`,
      });
      console.log("CREATE RATING API RESPONSE............", response);
      if (!response?.data?.success) {
        toast.error(response.data.message);
        return;
      }
      toast.success("Rating Posted");
      success = true;
    } catch (error) {
      success = false;
      console.log("CREATE RATING API ERROR............", error);
    }
    // toast.dismiss(toastId);
    return success;
  };

export const getAllRatingAndReviews = async () => {
    let result = null;
    try {
        const response = await apiConnector("GET",
            courseEndpoints.GET_ALL_RATING_API
        );
        // console.log("RESPONSE", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data;
        // toast.success("Successfully fetched data");
        // console.log("Toast Success");
        
    } catch (error) {
        console.log("GET_ALL_RATINGS_API", error);
    }
    return result;
}

export const getAllCourses = async () => {
    let result = [];
    try {
        const response = await apiConnector("GET", courseEndpoints.GET_ALL_COURSES_API);
        result = response.data.courses;
    } catch (error) {
        console.log("Error", error);
    }
    return result;
    
}