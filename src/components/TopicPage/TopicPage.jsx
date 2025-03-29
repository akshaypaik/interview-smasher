import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import './TopicPage.css';

const TopicPage = () => {

    let topicInfo = useSelector((store) => store.topic.currentTopic);
    const { courseName, topicName } = useParams();
    const [topicInfoState, setTopicsInfoState] = useState({});

    const fetchTopicDetailsUsingTopicName = async () => {
        const result = await fetch(`http://localhost:3000/BackendApp/api/topics/getTopicByTopicName?topicName=${topicName}`);
        const resultJson = await result.json();
        console.log("resultJson: ", resultJson);
        setTopicsInfoState(resultJson[0].topicsInfo[0]);
    }

    useEffect(() => {
        if (Object.keys(topicInfo).length <= 0) {
            fetchTopicDetailsUsingTopicName();
        } else {
            setTopicsInfoState(topicInfo);
        }
    }, [topicInfo]);

    return (
        <div className='topic-page-container'>
            <h1>{topicInfoState?.topicDisplayName}</h1>
            <p>{topicInfoState?.description}</p>
        </div>
    )
}

export default TopicPage