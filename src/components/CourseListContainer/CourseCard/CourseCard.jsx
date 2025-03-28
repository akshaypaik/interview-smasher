import React from 'react';
import './CourseCard.css';

const CourseCard = ({ info }) => {
  return (
    <div className='course-card-container'>
        <img src={info.courseIconURL} alt='course-icon' />
        {info.name}
    </div>
  )
}

export default CourseCard