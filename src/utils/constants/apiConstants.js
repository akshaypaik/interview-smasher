// Courses

export const GET_ALL_COURSES = "http://localhost:3000/BackendApp/api/courses/getAllCourses";

export const GET_COURSE_DETAILS_BY_COURSE_ID = "http://localhost:3000/BackendApp/api/courses/getCourseDetailsByCourseId?courseId=";

export const GET_COURSE_COMPLETION_STATUS = "http://localhost:3000/BackendApp/api/courses/getCourseCompletionStatus?courseId=";

// Topics

export const GET_TOPIC_DETIALS_USING_TOPIC_NAME = "http://localhost:3000/BackendApp/api/topics/getTopicByTopicName?topicName=";

export const GET_TOPIC_COMPLETION_STATUS_USING_TOPIC_NAME = "http://localhost:3000/BackendApp/api/topics/getTopicCompletionStatus?topicId=";

export const UPDATE_TOPIC_COMPLETION = "http://localhost:3000/BackendApp/api/topics/updateTopicCompletion";

// Interview
export const GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW = "http://localhost:3000/BackendApp/api/interview/getInterviewCompaniesSearchResults?searchQuery=";

export const POST_FAVORITE_COMPANIES_INTERVIEW = "http://localhost:3000/BackendApp/api/interview/postFavoriteCompany";

export const GET_FAVORITE_COMPANIES_INTERVIEW = "http://localhost:3000/BackendApp/api/interview/getFavoriteCompanies?email=";

export const REMOVE_FAVORITE_COMPANIES_INTERVIEW = "http://localhost:3000/BackendApp/api/interview/removeFavoriteCompany";