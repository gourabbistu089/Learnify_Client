import { apiConnector } from "../apiConnector";
import { blogEndpoints } from "../api";
import { toast } from "react-toastify";

export const getAllBlogs = async () => {
  const token = localStorage.getItem("token");
  // if (!token) {
  //   toast.error("User not authenticated. Please log in again.");
  //   return;
  // }
  try {
    const response = await apiConnector(
      "GET",
      blogEndpoints.BLOG_GET_ALL_API,
      null,
    //   { Authorization: `Bearer ${token}` }
    );

    if (response.status === 200) {
      console.log("getAllBlogs Successfully");
      // console.log(response);
      return response?.data?.data;
    } else {
      console.log("Error in getAllBlogs");
      toast.error("Error in getAllBlogs");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error in getAllBlogs");
  }
};

export const getBlogBySlug = async (slug) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User not authenticated. Please log in again.");
    return;
  }
  let url = `${blogEndpoints.BLOG_GET_SLUG_API}/${slug}`;
  try {
    // console.log("url", url);
    const response = await apiConnector(
      "GET",
      url,
      null,
      { Authorization: `Bearer ${token}`}
    );

    if (response.status === 200) {
      console.log("getBlogBySlug Successfully");
      // console.log(response);
      return response?.data?.data;
    } else {
      console.log("Error in getBlogBySlug");
      toast.error("Error in getBlogBySlug");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error in getBlogBySlug");
  }
};

export const toggleLike = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User not authenticated. Please log in again.");
    return;
  }
  let url = `${blogEndpoints.BLOG_API}/${id}/like`;
  try {
    console.log("url", url);
    const response = await apiConnector(
      "POST",
      url,
      null,
      { Authorization: `Bearer ${token}` }
    );
    if (response.status === 200) {
      // console.log("toggleLike Successfully");
      // console.log(response);
      // toast.success(response?.data?.message);
      return response?.data?.data;
    } else {
      console.log("Error in toggleLike");
      toast.error("Error in toggleLike");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error in toggleLike");
  }
};

export const addComment = async (id, content) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User not authenticated. Please log in again.");
    return;
  }
  let url = `${blogEndpoints.BLOG_API}/${id}/comment`;
  try {
    console.log("url", url);
    const response = await apiConnector(
      "POST",
      url,
      { content },
      { Authorization: `Bearer ${token}` }
    );
    console.log("addComment", response);
    if (response.status === 201) {
      // console.log("addComment Successfully");
      // console.log(response);
      toast.success("New comment added");
      return response?.data?.data;
    } else {
      console.log("Error in addComment");
      toast.error("Error in addComment");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error in addComment");
  }
};

export const createBlog = async (form) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User not authenticated. Please log in again.");
    return;
  }
  try {
    const response = await apiConnector(
      "POST",
      blogEndpoints.BLOG_CREATE_API,
      form,
      { Authorization: `Bearer ${token}` }
    );
    console.log("createBlog", response);
    if (response.status === 201) {
      console.log("createBlog Successfully");
      // console.log(response);
      toast.success("Blog created successfully");
      return response?.data?.data;
    } else {
      console.log("Error in createBlog");
      toast.error("Error in createBlog");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error in createBlog");
  }
};

export const getMyBlogsAPI = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User not authenticated. Please log in again.");
    return;
  }
  try {
    const response = await apiConnector(
      "GET",
      blogEndpoints.BLOG_GET_MY_API,
      null,
      { Authorization: `Bearer ${token}` }
    );
    console.log("myBlogs", response);
    if (response.status === 200) {
      console.log("myBlogs Successfully");
      console.log(response);
      return response?.data?.data;
    } else {
      console.log("Error in myBlogs");
      toast.error("Error in myBlogs");
    }
  } catch (error) {
    console.log("Error in myBlogs");
    toast.error("Error in myBlogs");
  }
};

export const updateBlog = async (id, form) => {
  
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User not authenticated. Please log in again.");
    return;
  }
  let url = `${blogEndpoints.BLOG_API}/${id}`;
  console.log("url", url);
  try {
    const response = await apiConnector(
      "PUT",
      url,
      form,
      { Authorization: `Bearer ${token}` }
    );
    console.log("updateBlog", response);
    if (response.status === 200) {
      console.log("updateBlog Successfully");
      console.log(response);
      toast.success("Blog updated successfully");
      return response?.data?.data;
    } else {
      
      console.log("Error in updateBlog", response);
      toast.error("Error in updateBlog");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error in updateBlog");
  }
}

export const deleteBlogAPI = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User not authenticated. Please log in again.");
    return;
  }
  let url = `${blogEndpoints.BLOG_API}/${id}`;
  console.log("url", url);
  try {
    const response = await apiConnector(
      "DELETE",
      url,
      null,
      { Authorization: `Bearer ${token}` }
    );
    console.log("deleteBlogAPI", response);
    if (response.status === 200) {
      console.log("deleteBlogAPI Successfully");
      console.log(response);
      toast.success("Blog deleted successfully");
      return response?.data?.data;
    } else {
      console.log("Error in deleteBlogAPI", response);
      toast.error("Error in deleteBlogAPI");    
    }
  } catch (error) {
    console.error(error);
    toast.error("Error in deleteBlogAPI");  
  }
}