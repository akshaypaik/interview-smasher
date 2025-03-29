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
  const [filteredCourseByModule, setFilteredCourseByModule] = useState([]);
  const searchBarQuery = useSelector((store) => store.app.searchBarQuery);

  const getUpdatedCourseByModule = (resultJson) => {
    const moduleCategories = new Set([]);
    resultJson?.topicsInfo?.forEach((topic) => {
      moduleCategories.add(topic.module);
    });

    const updatedCourseByModule = [];
    moduleCategories.forEach((moduleCategory) => {
      const topicModuleInfos = resultJson?.topicsInfo?.filter((topic) => topic.module === moduleCategory);
      updatedCourseByModule.push({ module: moduleCategory, topicsInfo: topicModuleInfos });
    });

    return updatedCourseByModule;
  }

  const fetchCourseDetails = async () => {
    const result = await fetch(`http://localhost:3000/BackendApp/api/courses/getCourseDetailsByCourseId?courseId=${courseId}`);
    const resultJson = await result.json();
    setCourseInfo(resultJson);

    setCourseByModule(getUpdatedCourseByModule(resultJson));
    setFilteredCourseByModule(getUpdatedCourseByModule(resultJson));
  }

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  useEffect(() => {
    if (!courseName) {
      dispatch(updateCurrentCourse(courseInfo?.basicInfo?.name));
    }
  }, [courseInfo]);

  useEffect(() => {
    if (courseByModule && courseByModule.length > 0) {
      let filteredTopicsInfo = {
        topicsInfo: []
      };
      filteredTopicsInfo.topicsInfo = courseInfo?.topicsInfo?.filter((topic) => topic.topicDisplayName.toLowerCase().includes(searchBarQuery));
      const filteredTopics = getUpdatedCourseByModule(filteredTopicsInfo)
      setFilteredCourseByModule(filteredTopics);
    }
  }, [searchBarQuery]);

  return (
    <div className='course-page-container'>
      <div className='course-page-header'>
        <img src={courseInfo?.basicInfo?.iconURL} alt='course-img' />
        <h1>{courseInfo?.basicInfo?.name}</h1>
      </div>
      <p>{courseInfo?.basicInfo?.overviewText}</p>
      <div className='topic-card-course-container'>
        {filteredCourseByModule.length > 0 && filteredCourseByModule?.map((module) =>
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