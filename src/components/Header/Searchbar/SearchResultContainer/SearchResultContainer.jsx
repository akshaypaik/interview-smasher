import React from 'react';
import './SearchResultContainer.css';
import { useSelector } from 'react-redux';

const SearchResultContainer = ({ results }) => {

    // const darkMode = useSelector((store) => store.app.darkMode);
    const darkMode = true;

    return (
        <ul className='search-result-container'>
            {results.map((result) => <li key={result}>
                <svg xmlns="http://www.w3.org/2000/svg" fill={darkMode ? 'white' : 'black'} height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path clipRule="evenodd" d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z" fillRule="evenodd"></path><img id="img" draggable="false" className="style-scope yt-img-shadow" alt="Avatar image" height="32" width="32" src="https://yt3.ggpht.com/yti/ANjgQV-zFt1B7XeQ598f8NF8stTz2kpJxymy-MZrvbuK56PTAr9K=s88-c-k-c0x00ffffff-no-rj" /></svg>
                {result}
            </li>)}
        </ul>
    )
}

export default SearchResultContainer