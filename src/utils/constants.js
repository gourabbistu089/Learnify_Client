 export const BASE_URL = location.hostname === "localhost" ? import.meta.env.VITE_BASE_URL_1 : import.meta.env.VITE_BASE_URL_2;

export const ACCOUNT_TYPE = {
    STUDENT: "student",
    INSTRUCTOR: "instructor",
    ADMIN: "admin",
  }
  
  export const COURSE_STATUS = {
    DRAFT: "draft",
    PUBLISHED: "published",
  }

export const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
