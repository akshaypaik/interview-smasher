import React, { useEffect, useState } from 'react';
import './CourseListContainer.css';
import CourseCard from './CourseCard/CourseCard';
import { Link } from 'react-router-dom';

const CourseListContainer = () => {

    const [courseList, setCourseList] = useState([]);

    const fetchAllCourses = async () => {
        const result = await fetch(`http://localhost:3000/BackendApp/api/courses/getAllCourses`);
        const resultJson = await result.json();
        console.log(resultJson);
        setCourseList(resultJson);
    }

    useEffect(() => {
        fetchAllCourses();
    }, []);

    return (
        <>
            <h1>Pick a course</h1>
            <div className='course-list-container'>
                {/* <CourseCard /> */}

                {courseList.map((course) => <Link key={course.courseId} to={`/course/${course.courseId}`}>
                    <CourseCard info={course} />
                </Link>)}
            </div>
        </>
    )
}

export default CourseListContainer;