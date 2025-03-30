import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import './TopicPage.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const TopicPage = () => {

    let topicInfo = useSelector((store) => store.topic.currentTopic);
    const { courseName, topicName } = useParams();
    const [topicInfoState, setTopicsInfoState] = useState({});
    const [currentCourseId, setCurrentCourseId] = useState(0);

    const fetchTopicDetailsUsingTopicName = async () => {
        const result = await fetch(`http://localhost:3000/BackendApp/api/topics/getTopicByTopicName?topicName=${topicName}`);
        const resultJson = await result.json();
        console.log("resultJson: ", resultJson);
        setTopicsInfoState(resultJson[0]);
        setCurrentCourseId(resultJson[0].courseId);
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
            <div className='topic-page-nav-menu'>
                <Link to={`/course/${currentCourseId}`}><span>{courseName}</span></Link>
                {'>'}
                <span>{topicInfoState?.topicDisplayName}</span>
            </div>
            <h1>{topicInfoState?.topicDisplayName}</h1>
            <p>{topicInfoState?.description}</p>
            <div className='topic-page-code-snippet-container'>
                <SyntaxHighlighter language="javascript" style={dark}>
                    {topicInfoState?.codeSnippet}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}

export default TopicPage