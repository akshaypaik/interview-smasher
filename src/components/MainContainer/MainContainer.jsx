import React from 'react';
import './MainContainer.css';
import CourseListContainer from '../CourseListContainer/CourseListContainer';
import LandingPage from '../LandingPage/LandingPage';

const MainContainer = () => {
  return (
    <div className='main-container w-full'>
      {/* <CourseListContainer /> */}
      <LandingPage />
    </div>
  )
}

export default MainContainer