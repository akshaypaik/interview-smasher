import React, { useEffect } from 'react';
import './Header.css';
import Searchbar from './Searchbar/Searchbar';
import Logo from './Logo/Logo';
import Profile from './Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setUserInfo, toggleSideBar } from '../../utils/ReduxStore/appSlice';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../utils/firebase/firbaseAuth';

const Header = () => {

    const dispatch = useDispatch();
    const darkMode = useSelector((store) => store.app.darkMode);

    const handleToggleSideBar = () => {
        dispatch(toggleSideBar());
    }

    useEffect(() => {
        const authStateUnsubscription = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                console.log(photoURL);
                dispatch(setUserInfo({ uid, email, displayName, photoURL }));
                return user;
            } else {
                // User is signed out
                dispatch(removeUser());
                return null;
            }
        });
        return () => {
            authStateUnsubscription();
        }
    }, []);

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