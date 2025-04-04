import React, { useEffect, useState } from 'react';
import './CoursePage.css';
import { useParams } from 'react-router-dom';
import TopicCard from './TopicCard/TopicCard';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentCourse } from '../../utils/ReduxStore/courseSlice';
import { updateSearchBarQuery } from '../../utils/ReduxStore/appSlice';
import CourseCompletionStatus from './CourseCompletionStatus/CourseCompletionStatus';
import useCourseDetailsByCourseId from '../../utils/custom-hooks/useCourseDetailsByCourseId';
import { GET_COURSE_COMPLETION_STATUS } from '../../utils/constants/apiConstants';

const CoursePage = () => {

  const { courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState({});
  const courseName = useSelector((store) => store.course.currentCourse);
  const dispatch = useDispatch();
  const [filteredCourseByModule, setFilteredCourseByModule] = useState([]);
  const searchBarQuery = useSelector((store) => store.app.searchBarQuery);
  const [courseCompletionStatus, setCourseCompletionStatus] = useState();
  const [courseCompletionStatusData, setCourseCompletionStatusData] = useState([]);
  const [hideTopicCardComplete, setHideTopicCardComplete] = useState("");

  const TopicCardCompletedComp = TopicCardCompleted(TopicCard);

  const { courseByModule } = useCourseDetailsByCourseId(courseId);

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

  const fetchCourseCompletionStatus = async () => {
    const result = await fetch(`${GET_COURSE_COMPLETION_STATUS}${courseId}`);
    const resultJson = await result.json();
    setCourseCompletionStatus(resultJson.status);
    setCourseCompletionStatusData(resultJson.data);
  }

  const showCompletedTextTopicCard = () => {
    setHideTopicCardComplete("");
  }

  const hideCompletedTextTopicCard = (topicId) => {
    setHideTopicCardComplete(topicId);
  }

  useEffect(() => {
    dispatch(updateSearchBarQuery(""));
    fetchCourseCompletionStatus();
  }, []);

  useEffect(() => {
    setCourseInfo(courseByModule);
    setFilteredCourseByModule(getUpdatedCourseByModule(courseByModule));
  }, [courseByModule])

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
                    onShowCompletedTextTopicCard={showCompletedTextTopicCard}
                    onHideCompletedTextTopicCard={hideCompletedTextTopicCard}
                    hideTopicId={hideTopicCardComplete} /> :
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
    const curTopicId = props?.hideTopicId === props.topicInfo?.topicName ? true : false;
    return (

      <div className='topic-card-completed-container'
        onMouseEnter={() => props.onHideCompletedTextTopicCard(props.topicInfo?.topicName)}
        onMouseLeave={props.onShowCompletedTextTopicCard}>
        <TopicCard {...props} />
        {!curTopicId && <div className='complete-text'>Completed</div>}
      </div>
    )
  }
}