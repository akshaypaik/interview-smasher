import { useEffect, useState } from "react";
import { GET_COURSE_DETAILS_BY_COURSE_ID } from "../constants/apiConstants";

const useCourseDetailsByCourseId = (courseId) => {

    const [courseByModule, setCourseByModule] = useState([]);

    const fetchCourseDetails = async () => {
        const result = await fetch(`${GET_COURSE_DETAILS_BY_COURSE_ID}${courseId}`);
        const resultJson = await result.json();
        // setFilteredCourseByModule(getUpdatedCourseByModule(resultJson));
        setCourseByModule(resultJson);
    }

    useEffect(() => {
        fetchCourseDetails();
    }, []);

    return { courseByModule: courseByModule };
}

export default useCourseDetailsByCourseId;