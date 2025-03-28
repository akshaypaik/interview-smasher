import React from 'react';
import './MainContainer.css';
import CourseListContainer from '../CourseListContainer/CourseListContainer';

const MainContainer = () => {
  return (
    <div className='main-container'>
      <CourseListContainer />
    </div>
  )
}

export default MainContainer