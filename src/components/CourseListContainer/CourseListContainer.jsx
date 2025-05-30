import React, { useEffect, useState } from 'react';
import './CourseListContainer.css';
import CourseCard from './CourseCard/CourseCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchBarQuery } from '../../utils/ReduxStore/appSlice';
import { GET_ALL_COURSES } from '../../utils/constants/apiConstants';

const CourseListContainer = () => {

    const [courseList, setCourseList] = useState([]);
    const [filteredCourseList, setFilteredCourseList] = useState([]);
    const searchBarQuery = useSelector((store) => store.app.searchBarQuery);
    const dispatch = useDispatch();

    const fetchAllCourses = async () => {
        const result = await fetch(`${GET_ALL_COURSES}`);
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
        <div className='flex flex-col'>
            <h1 className='text-2xl font-bold mt-8'>Pick a course</h1>
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
        </div>
    )
}

export default CourseListContainer;