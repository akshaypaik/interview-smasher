import React from 'react';
import './CourseCard.css';
import { useDispatch } from 'react-redux';
import { updateCurrentCourse } from '../../../utils/ReduxStore/courseSlice';

const CourseCard = ({ info }) => {

  const dispatch = useDispatch();

  const handleCourseClick = () => {
    dispatch(updateCurrentCourse(info.name));
  }

  return (
    <div className='course-card-container' onClick={handleCourseClick}>
      <img src={info.courseIconURL} alt='course-icon' />
      {info.name}
    </div>
  )
}

export default CourseCard