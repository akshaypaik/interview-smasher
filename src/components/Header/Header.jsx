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
    const userInfo = useSelector((store) => store.app.userInfo);

    useAuthProviderStateChange();

    const handleToggleSideBar = () => {
        dispatch(toggleSideBar());
    }

    return (
        <div className='header-container shadow-xl'>
            <div className='menu-logo-container'>
                {userInfo?.email && <svg onClick={handleToggleSideBar} xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className='h-[28px]'
                    style={{ display: 'inherit' }}
                    stroke={darkMode ? 'white' : 'black'}>
                    <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z" fill={darkMode ? 'white' : 'black'}></path>
                </svg>}
                <Logo />
            </div>
            {userInfo?.email && <Searchbar />}
            <Profile />
        </div>
    )
}

export default Header;