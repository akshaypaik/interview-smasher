import React from 'react';
import './CourseCard.css';

const CourseCard = ({ info }) => {
  return (
    <div className='course-card-container'>
        {info.name}
    </div>
  )
}

export default CourseCard