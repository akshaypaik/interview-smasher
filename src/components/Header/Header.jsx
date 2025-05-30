import React, { useEffect, useState } from 'react';
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
    const [currentMenu, setCurrentMenu] = useState("home");

    useAuthProviderStateChange();

    const handleToggleSideBar = () => {
        dispatch(toggleSideBar());
    }

    const onMenuSelect = (currentMenu) => {
        setCurrentMenu(currentMenu);
    }

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        const menuSelected = targetId.slice(1);
        onMenuSelect(menuSelected);
    };

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
            {!userInfo?.email && <ul className='flex gap-4 lg:gap-12 md:gap-10 sm:gap-8 text-sm font-semibold text-gray-600  cursor-pointer items-center'>
                <a href='#home' onClick={(e) => handleScroll(e, '#home')}
                    className={`hover:underline underline-offset-6 hover:text-red-700 ${currentMenu === "home" ? 'selected' : ''}`}>
                    Home
                </a>
                <a href='#services' onClick={(e) => handleScroll(e, '#services')}
                    className={`hover:underline underline-offset-6 hover:text-red-700 ${currentMenu === "services" ? 'selected' : ''}`}>
                    Services
                </a>
                <a href='#pricing' onClick={(e) => handleScroll(e, '#pricing')}
                    className={`hover:underline underline-offset-6 hover:text-red-700 ${currentMenu === "pricing" ? 'selected' : ''}`}>
                    Pricing
                </a>
                <a href='#about' onClick={(e) => handleScroll(e, '#about')}
                    className={`hover:underline underline-offset-6 hover:text-red-700 ${currentMenu === "about" ? 'selected' : ''}`}>
                    About
                </a>
                <a href='#contact' onClick={(e) => handleScroll(e, '#contact')}
                    className={`hover:underline underline-offset-6 hover:text-red-700 ${currentMenu === "contact" ? 'selected' : ''}`}>
                    Contact us
                </a>
            </ul>}
            <Profile />
        </div>
    )
}

export default Header;