import React, { useEffect, useState } from 'react';
import './CoursePage.css';
import { useParams } from 'react-router-dom';
import TopicCard from './TopicCard/TopicCard';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentCourse } from '../../utils/ReduxStore/courseSlice';
import { updateSearchBarQuery } from '../../utils/ReduxStore/appSlice';
import CourseCompletionStatus from './CourseCompletionStatus/CourseCompletionStatus';

const CoursePage = () => {

  const { courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState({});
  const courseName = useSelector((store) => store.course.currentCourse);
  const dispatch = useDispatch();
  const [courseByModule, setCourseByModule] = useState([]);
  const [filteredCourseByModule, setFilteredCourseByModule] = useState([]);
  const searchBarQuery = useSelector((store) => store.app.searchBarQuery);
  const [courseCompletionStatus, setCourseCompletionStatus] = useState();
  const [courseCompletionStatusData, setCourseCompletionStatusData] = useState([]);
  const [showCompletedText, setShowCompletedText] = useState(true);

  const TopicCardCompletedComp = TopicCardCompleted(TopicCard);

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

  const fetchCourseCompletionStatus = async () => {
    const result = await fetch(`http://localhost:3000/BackendApp/api/courses/getCourseCompletionStatus?courseId=${courseId}`);
    const resultJson = await result.json();
    setCourseCompletionStatus(resultJson.status);
    setCourseCompletionStatusData(resultJson.data);
  }

  const showCompletedTextTopicCard = () => {
    setShowCompletedText(true);
  }

  const hideCompletedTextTopicCard = () => {
    setShowCompletedText(false);
  }

  useEffect(() => {
    dispatch(updateSearchBarQuery(""));
    fetchCourseDetails();
    fetchCourseCompletionStatus();
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
      <div className='course-page-header-container'>
        <div className='course-page-header'>
          <img src={courseInfo?.basicInfo?.iconURL} alt='course-img' />
          <h1>{courseInfo?.basicInfo?.name}</h1>
        </div>
        <CourseCompletionStatus totalTopics={courseCompletionStatus?.totalTopics} completedTopics={courseCompletionStatus?.completedTopics} />
      </div>
      <p>{courseInfo?.basicInfo?.overviewText}</p>
      <div className='topic-card-course-container'>
        {filteredCourseByModule.length > 0 && filteredCourseByModule?.map((module) =>
          <div key={module.module} className='module-course-container'>
            <h2>{module.module.charAt(0).toUpperCase() + module.module.slice(1)}</h2>
            <div className='module-course-list'>
              {module.topicsInfo.map((topic) => {
                const statusData = courseCompletionStatusData.find((item) => item.topicName === topic.topicName);
                return statusData?.isCompleted ?
                  <TopicCardCompletedComp
                    key={topic.topicName}
                    topicInfo={topic}
                    showCompletedText={showCompletedText}
                    onShowCompletedTextTopicCard={showCompletedTextTopicCard}
                    onHideCompletedTextTopicCard={hideCompletedTextTopicCard} /> :
                  <TopicCard key={topic.topicName} topicInfo={topic} />
              })}
            </div>
          </div>)}
      </div>
    </div>
  )
}

export default CoursePage;

export function TopicCardCompleted(TopicCard) {
  return (props) => {
    return (
      <div className='topic-card-completed-container' onMouseEnter={props.onHideCompletedTextTopicCard}
        onMouseLeave={props.onShowCompletedTextTopicCard}>
        <TopicCard {...props} />
        {props.showCompletedText && <div className='complete-text'>Completed</div>}
      </div>
    )
  }
}