import React, { useEffect } from 'react';
import './Header.css';
import Searchbar from './Searchbar/Searchbar';
import Logo from './Logo/Logo';
import Profile from './Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar } from '../../utils/ReduxStore/appSlice';
import useAuthProviderStateChange from '../../utils/custom-hooks/useAuthProviderStateChange';

const Header = () => {

    const dispatch = useDispatch();
    const darkMode = useSelector((store) => store.app.darkMode);

    useAuthProviderStateChange();

    const handleToggleSideBar = () => {
        dispatch(toggleSideBar());
    }

    return (
        <div className='header-container'>
            <div className='menu-logo-container'>
                <svg onClick={handleToggleSideBar} xmlns="http://www.w3.org/2000/svg"
                    height="24" viewBox="0 0 24 24"
                    width="24" focusable="false"
                    aria-hidden="true"
                    style={{ display: 'inherit', height: '100%' }}
                    stroke={darkMode ? 'white' : 'black'}>
                    <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z" fill={darkMode ? 'white' : 'black'}></path>
                </svg>
                <Logo />
            </div>
            <Searchbar />
            <Profile />
        </div>
    )
}

export default Header;