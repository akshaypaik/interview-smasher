export const BASE_URL = "http://localhost:3000";

// User

export const REGISTER_USER = BASE_URL + "/BackendApp/api/user/registerUser";

// Courses

export const GET_ALL_COURSES = BASE_URL + "/BackendApp/api/courses/getAllCourses";

export const GET_COURSE_DETAILS_BY_COURSE_ID = BASE_URL + "/BackendApp/api/courses/getCourseDetailsByCourseId?courseId=";

export const GET_COURSE_COMPLETION_STATUS = BASE_URL + "/BackendApp/api/courses/getCourseCompletionStatus?courseId=";

// Topics

export const GET_TOPIC_DETIALS_USING_TOPIC_NAME = BASE_URL + "/BackendApp/api/topics/getTopicByTopicName?topicName=";

export const GET_TOPIC_COMPLETION_STATUS_USING_TOPIC_NAME = BASE_URL + "/BackendApp/api/topics/getTopicCompletionStatus?topicId=";

export const UPDATE_TOPIC_COMPLETION = BASE_URL + "/BackendApp/api/topics/updateTopicCompletion";

// Interview
export const GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW = BASE_URL + "/BackendApp/api/interview/getInterviewCompaniesSearchResults?searchQuery=";

export const POST_FAVORITE_COMPANIES_INTERVIEW = BASE_URL + "/BackendApp/api/interview/postFavoriteCompany";

export const GET_FAVORITE_COMPANIES_INTERVIEW = BASE_URL + "/BackendApp/api/interview/getFavoriteCompanies?email=";

export const REMOVE_FAVORITE_COMPANIES_INTERVIEW = BASE_URL + "/BackendApp/api/interview/removeFavoriteCompany";