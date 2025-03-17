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
  
