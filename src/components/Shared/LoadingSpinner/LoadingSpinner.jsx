import React from 'react';
import './LoadingSpinner.css';
import { useSelector } from 'react-redux';

const LoadingSpinner = () => {

    const darkMode = useSelector((store) => store.app.darkMode);

    return (
        <div className='loading-spinner-container'>
            <div className={`loader ${darkMode ? 
                'dark' : 
                'light'}`}></div>
            {/* <h2>Loading...</h2> */}
        </div>
    )
}

export default LoadingSpinner   