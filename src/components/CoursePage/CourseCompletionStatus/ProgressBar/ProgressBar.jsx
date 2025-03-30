import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
    const [animatedProgress, setAnimatedProgress] = useState(0);

    useEffect(() => {
        setTimeout(() => setAnimatedProgress(progress), 150);
    }, [progress])

    return (
        <div>
            <div className='outer'>
                <div className='inner' style={{
                    transform: `translateX(${animatedProgress - 100}%)`
                }}
                    aria-valuemax="100" aria-valuemin="0" aria-valuenow={progress} role="progressbar">
                    {progress}%
                </div>
            </div>
        </div>
    )
}

export default ProgressBar