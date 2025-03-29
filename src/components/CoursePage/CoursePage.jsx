import React, { useEffect, useState } from 'react';
import './CoursePage.css';
import { useParams } from 'react-router-dom';
import TopicCard from './TopicCard/TopicCard';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentCourse } from '../../utils/ReduxStore/courseSlice';

const CoursePage = () => {

  const { courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState({});
  const courseName = useSelector((store) => store.course.currentCourse);
  const dispatch = useDispatch();

  const fetchCourseDetails = async () => {
    const result = await fetch(`http://localhost:3000/BackendApp/api/courses/getCourseDetailsByCourseId?courseId=${courseId}`);
    const resultJson = await result.json();
    console.log("resultJson: ", resultJson);
    setCourseInfo(resultJson);
  }

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  useEffect(() => {
    if (!courseName) {
      dispatch(updateCurrentCourse(courseInfo?.basicInfo?.name));
    }
  }, [courseInfo]);

  return (
    <div className='course-page-container'>
      <div className='course-page-header'>
        <img src={courseInfo?.basicInfo?.iconURL} alt='course-img' />
        <h1>{courseInfo?.basicInfo?.name}</h1>
      </div>
      <p>{courseInfo?.basicInfo?.overviewText}</p>
      <div className='topic-card-course-container'>
        {courseInfo?.topicsInfo?.map((topic) => <TopicCard key={topic.topicName} topicInfo={topic} />)}
      </div>
    </div>
  )
}

export default CoursePage;