import React, { useEffect, useState } from 'react';
import './CourseListContainer.css';
import CourseCard from './CourseCard/CourseCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchBarQuery } from '../../utils/ReduxStore/appSlice';

const CourseListContainer = () => {

    const [courseList, setCourseList] = useState([]);
    const [filteredCourseList, setFilteredCourseList] = useState([]);
    const searchBarQuery = useSelector((store) => store.app.searchBarQuery);
    const dispatch = useDispatch();

    const fetchAllCourses = async () => {
        const result = await fetch(`http://localhost:3000/BackendApp/api/courses/getAllCourses`);
        const resultJson = await result.json();
        setCourseList(resultJson);
        setFilteredCourseList(resultJson.sort((a,b) => {
            return a.courseId - b.courseId
        }));
    }

    useEffect(() => {
        dispatch(updateSearchBarQuery(""));
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
                {filteredCourseList.map((course) =>
                    course.isCourseActive ? (
                        <Link key={course.courseId} to={`/course/${course.courseId}`}>
                            <CourseCard info={course} />
                        </Link>
                    ) : (
                        <CourseCard key={course.courseId} info={course} />
                    )
                )}
            </div>
        </>
    )
}

export default CourseListContainer;