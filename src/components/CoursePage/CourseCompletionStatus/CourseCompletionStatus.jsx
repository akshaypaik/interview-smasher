import React, { useEffect, useState } from 'react';
import './CourseCompletionStatus.css';
import ProgressBar from './ProgressBar/ProgressBar';

const CourseCompletionStatus = ({ totalTopics, completedTopics }) => {

    const [progressVal, setProgressVal] = useState(0);

    const calcProgressValue = () => {
        if (completedTopics && totalTopics) {
            const progress = (completedTopics / totalTopics) * 100;
            console.log("progress: ", progress);
            setProgressVal(progress.toFixed());
        }
    }

    useEffect(() => {
        calcProgressValue();
    }, [totalTopics, completedTopics]);

    return (
        <div>
            <ProgressBar progress={progressVal} />
            <div className='course-completion-progress-status'>
                <div>
                    {completedTopics} of {totalTopics} Lessons Completed
                </div>
                <div className='course-completion-progress-status-value'>
                    {progressVal}%
                </div>
            </div>
        </div>
    )
}

export default CourseCompletionStatus