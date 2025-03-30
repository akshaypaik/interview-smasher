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
    const [isTopicCompleted, setIsTopicCompleted] = useState(false);

    const fetchTopicDetailsUsingTopicName = async () => {
        const result = await fetch(`http://localhost:3000/BackendApp/api/topics/getTopicByTopicName?topicName=${topicName}`);
        const resultJson = await result.json();
        console.log("resultJson: ", resultJson);
        setTopicsInfoState(resultJson[0]);
        setCurrentCourseId(resultJson[0].courseId);
    }

    const fetchTopicCompletionStatus = async () => {
        if (!topicInfoState.topicId) {
            return;
        }
        const result = await fetch(`http://localhost:3000/BackendApp/api/topics/getTopicCompletionStatus?topicId=${topicInfoState.topicId}`);
        const resultJson = await result.json();
        setIsTopicCompleted(resultJson.isCompleted);
    }

    const updateMarkAsCompleted = async () => {
        const topicCompletionObj = {
            courseId: topicInfoState.courseId,
            topicId: topicInfoState.topicId,
            isCompleted: true,
            module: topicInfoState.module,
            topicName: topicInfoState.topicName,
            user: {
                username: "akshay",
                email: "akshaypaik@gmail.com"
            }
        }
        const result = await fetch(`http://localhost:3000/BackendApp/api/topics/updateTopicCompletion`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(topicCompletionObj)
        });
        const resultJson = await result.json();
        setIsTopicCompleted(true);
        console.log("updateMarkAsCompleted resultJson: ", resultJson);
    }

    useEffect(() => {
        if (Object.keys(topicInfo).length <= 0) {
            fetchTopicDetailsUsingTopicName();
        } else {
            setTopicsInfoState(topicInfo);
        }
    }, [topicInfo]);

    useEffect(() => {
        fetchTopicCompletionStatus();
    }, [topicInfoState]);

    return (
        <div className='topic-page-container'>
            <div className='topic-page-nav-menu'>
                <Link to={`/course/${currentCourseId}`}><span>{courseName}</span></Link>
                {'>'}
                <span>{topicInfoState?.topicDisplayName}</span>
            </div>
            <div className='topic-heading-btn'>
                <h1>{topicInfoState?.topicDisplayName}</h1>
                {!isTopicCompleted ?
                    <button onClick={updateMarkAsCompleted}>Mark as complete</button> :
                    <button>Completed</button>}
            </div>
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