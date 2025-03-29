import React from 'react'
import { useSelector } from 'react-redux'

const TopicPage = () => {

    const topicInfo = useSelector((store) => store.topic.currentTopic);

    return (
        <div>
            {topicInfo?.topicName}
        </div>
    )
}

export default TopicPage