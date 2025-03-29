import React, { useEffect, useState } from 'react';
import './CourseListContainer.css';
import CourseCard from './CourseCard/CourseCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CourseListContainer = () => {

    const [courseList, setCourseList] = useState([]);
    const [filteredCourseList, setFilteredCourseList] = useState([]);
    const searchBarQuery = useSelector((store) => store.app.searchBarQuery);

    const fetchAllCourses = async () => {
        const result = await fetch(`http://localhost:3000/BackendApp/api/courses/getAllCourses`);
        const resultJson = await result.json();
        setCourseList(resultJson);
        setFilteredCourseList(resultJson);
    }

    useEffect(() => {
        fetchAllCourses();
    }, []);

    useEffect(() => {
        setFilteredCourseList(courseList.filter((item) => item.name.toLowerCase().includes(searchBarQuery)));
    }, [searchBarQuery]);

    return (
        <>
            <h1>Pick a course</h1>
            <div className='course-list-container'>
                {/* <CourseCard /> */}
                {filteredCourseList.map((course) => <Link key={course.courseId} to={`/course/${course.courseId}`}>
                    <CourseCard info={course} />
                </Link>)}
            </div>
        </>
    )
}

export default CourseListContainer;