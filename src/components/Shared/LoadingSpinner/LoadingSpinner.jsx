import React from 'react';
import './LoadingSpinner.css';
import { useSelector } from 'react-redux';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

const LoadingSpinner = ({ width }) => {

    const darkMode = useSelector((store) => store.app.darkMode);

    return (
        <div className='loading-spinner-container'>
            <div className={`loader ${darkMode ? 
                'dark' : 
                'light'}`} style={{ width: width }}></div>
            {/* <h2>Loading...</h2> */}
        </div>
    )
}

export default LoadingSpinner   