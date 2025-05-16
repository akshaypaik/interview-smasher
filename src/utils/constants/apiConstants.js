export const BASE_URL = "http://localhost:3000";

// User

export const REGISTER_USER = BASE_URL + "/BackendApp/api/user/registerUser";

export const LOGIN_USER = BASE_URL + "/BackendApp/api/user/loginUser";

export const VALIDATE_USER_TOKEN = BASE_URL + "/BackendApp/api/user/validateJsonToken";

export const UPDATE_USER_PROFILE = BASE_URL + "/BackendApp/api/user/updateUserProfile";

export const UPDATE_USER_PROFILE_PICTURE = BASE_URL + "/BackendApp/api/user/updateUserProfilePicture";

export const CHECK_EMAIL_EXISTS = BASE_URL + "/BackendApp/api/user/checkEmailExists?email="

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

export const GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW_QUICK_FILTER = BASE_URL + "/BackendApp/api/interview/getInterviewCompaniesSearchResultsForQuickFilter?searchQuery=";

export const POST_FAVORITE_COMPANIES_INTERVIEW = BASE_URL + "/BackendApp/api/interview/postFavoriteCompany";

export const GET_FAVORITE_COMPANIES_INTERVIEW = BASE_URL + "/BackendApp/api/interview/getFavoriteCompanies?email=";

export const REMOVE_FAVORITE_COMPANIES_INTERVIEW = BASE_URL + "/BackendApp/api/interview/removeFavoriteCompany";

export const POST_APPLIED_COMPANY = BASE_URL + "/BackendApp/api/interview/postAppliedCompany";

export const GET_APPLIED_COMPANY = BASE_URL + "/BackendApp/api/interview/getAppliedCompany";

export const REMOVE_APPLIED_COMPANIES_INTERVIEW = BASE_URL + "/BackendApp/api/interview/removeAppliedCompany";

// Quick Career APIs

export const POST_QUICK_CAREER_JOB_LINK = BASE_URL + "/BackendApp/api/quick-career/postQuickCareerJobLink";

export const GET_QUICK_CAREER_JOB_LINK = BASE_URL + "/BackendApp/api/quick-career/getQuickCareerJobLink?email=";

export const PUT_QUICK_CAREER_JOB_LINK_STATUS = BASE_URL + "/BackendApp/api/quick-career/updateStatusJobLink";

export const DELETE_QUICK_CAREER_JOB_LINK = BASE_URL + "/BackendApp/api/quick-career/deleteQuickCareerJobLink";

export const UPDATE_QUICK_CAREER_JOB_LINK = BASE_URL + "/BackendApp/api/quick-career/updateQuickCareerJobLinkDetails";


// External APIs

export const NEWS_API_LATEST = "https://newsdata.io/api/1/latest?apikey=";