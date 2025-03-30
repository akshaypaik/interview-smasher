import React from 'react';
import './CourseCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentCourse } from '../../../utils/ReduxStore/courseSlice';

const CourseCard = ({ info }) => {

  const dispatch = useDispatch();
  const darkMode = useSelector((store) => store.app.darkMode);

  const handleCourseClick = () => {
    dispatch(updateCurrentCourse(info.name));
  }

  return (
    <div className={`${info.isCourseActive ? 'course-card-container' : 'disabled-course-card'}`}
      onClick={handleCourseClick}>
      <img src={info.courseIconURL} alt='course-icon' />
      <div>
        {info.name}

        {!info.isCourseActive &&
          <>
            <span>🔒</span>
            <div className='course-lock'>
              <svg xmlns="http://www.w3.org/2000/svg" stroke={`${darkMode ? 'white' : 'black'}`} style={{ display: 'inherit', height: '48px', width: '48px' }} height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17Zm-6 4q-.825 0-1.413-.588T4 19v-8q0-.825.588-1.413T6 9h1V6q0-2.075 1.463-3.538T12 1q2.075 0 3.538 1.463T17 6v3h1q.825 0 1.413.588T20 11v8q0 .825-.588 1.413T18 21H6Zm2-12h8V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6v3Zm-2 10h12v-8H6v8Zm0 0v-8 8Z" />
              </svg>
            </div>
          </>}
      </div>
    </div>
  )
}

export default CourseCard