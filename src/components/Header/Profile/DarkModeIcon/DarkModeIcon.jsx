import React from 'react';
import './DarkModeIcon.css';
import { toogleDarkMode } from '../../../../utils/ReduxStore/appSlice';
import { useDispatch, useSelector } from 'react-redux';

const DarkModeIcon = () => {

    const darkMode = useSelector((store) => store.app.darkMode);
    const dispatch = useDispatch();

    const handleDarkMode = () => {
        dispatch(toogleDarkMode());
    }

    return (
        <div className='dark-mode-icon' onClick={handleDarkMode}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="100"
                height="100"
                fill={`${darkMode ? 'black' : 'white'}`}
                stroke={`${darkMode ? 'white' : 'black'}`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 6 6 0 0 0 21 12.79z" />
            </svg>
        </div>
    )
}

export default DarkModeIcon