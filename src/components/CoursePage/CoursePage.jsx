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
  const [courseByModule, setCourseByModule] = useState([]);

  const fetchCourseDetails = async () => {
    const result = await fetch(`http://localhost:3000/BackendApp/api/courses/getCourseDetailsByCourseId?courseId=${courseId}`);
    const resultJson = await result.json();
    console.log("resultJson: ", resultJson);
    setCourseInfo(resultJson);
 
    const moduleCategories = new Set([]);
    resultJson?.topicsInfo?.forEach((topic) => {
      moduleCategories.add(topic.module);
    });

    const updatedCourseByModule = [];
    moduleCategories.forEach((moduleCategory) => {
      const topicModuleInfos = resultJson?.topicsInfo?.filter((topic) => topic.module === moduleCategory);
      updatedCourseByModule.push({ module: moduleCategory, topicsInfo: topicModuleInfos });
    });
    setCourseByModule(updatedCourseByModule);
    console.log("courseByModule: ", courseByModule);
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
        {courseByModule.length > 0 && courseByModule?.map((module) =>
          <div key={module.module} className='module-course-container'>
            <h2>{module.module.charAt(0).toUpperCase() + module.module.slice(1)}</h2>
            <div className='module-course-list'>
              {module.topicsInfo.map((topic) => <TopicCard key={topic.topicName} topicInfo={topic} />)}
            </div>
          </div>)}
      </div>
    </div>
  )
}

export default CoursePage;