import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className='loading-spinner-container'>
            <div className="loader"></div>
            <h2>Loading...</h2>
        </div>
    )
}

export default LoadingSpinner   