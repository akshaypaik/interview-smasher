import React, { useEffect } from 'react';
import './TopicCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTopic } from '../../../utils/ReduxStore/topicSlice';
import { useNavigate } from 'react-router-dom';

const TopicCard = ({ topicInfo }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const course = useSelector((store) => store.course.currentCourse);

    const handleTopicClick = () => {
        dispatch(updateCurrentTopic(topicInfo));
        navigate(`/topic/${course}/${topicInfo?.topicName}`);
    }

    useEffect(() => {
        if (!topicInfo) {
            console.log("call api");
        }
    }, [topicInfo]);

    return (
        <div className='topic-card-container' onClick={handleTopicClick}>
            {topicInfo?.topicDisplayName}
        </div>
    )
}

export default TopicCard