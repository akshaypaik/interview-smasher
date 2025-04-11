import React from 'react';
import './AvatarMenu.css';
import { signOut } from 'firebase/auth';
import Cookies from 'js-cookie';
import { auth } from '../../../../utils/firebase/firbaseAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser, setCurrentSidebarTab, toogleDarkMode } from '../../../../utils/ReduxStore/appSlice';
import useSignOutUser from '../../../../utils/custom-hooks/useSignOutUser';

const AvatarMenu = () => {

    const darkMode = useSelector((store) => store.app.darkMode);
    const userInfo = useSelector((store) => store.app.userInfo);
    const signOutUser = useSignOutUser();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDarkMode = () => {
        dispatch(toogleDarkMode());
    }

    const handleUserProfileClick = () => {
        dispatch(setCurrentSidebarTab(""));
        navigate("user-profile");
    }

    const handleSignOut = () => {
        if (userInfo.authProvider) {
            signOut(auth).then(() => {
                signOutUser();
            }).catch((error) => {
                dispatch(removeUser());
                console.error(error);
            });
        } else {
            signOutUser();
            navigate("/");
        }
    }

    return (
        <div className='avatar-details absolute mt-2 top-[100%] dark:bg-gray-800 rounded-xl shadow-2xl bg-white border-2'>
            <ul>
                <li onClick={handleDarkMode} className='hover:bg-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        focusable="false" aria-hidden="true" height="24"
                        style={{ display: 'inherit' }} fill={darkMode ? 'white' : 'black'}>
                        <path d="M12 22C10.93 22 9.86998 21.83 8.83998 21.48L7.41998 21.01L8.83998 20.54C12.53 19.31 15 15.88 15 12C15 8.12 12.53 4.69 8.83998 3.47L7.41998 2.99L8.83998 2.52C9.86998 2.17 10.93 2 12 2C17.51 2 22 6.49 22 12C22 17.51 17.51 22 12 22ZM10.58 20.89C11.05 20.96 11.53 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3C11.53 3 11.05 3.04 10.58 3.11C13.88 4.81 16 8.21 16 12C16 15.79 13.88 19.19 10.58 20.89Z"></path>
                    </svg>
                    Appearance
                </li>
                <li onClick={handleUserProfileClick} className='hover:bg-gray-500'>
                    <svg viewBox="0 0 24 24" fill="none" height="24"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M14.5 8.5C14.5 9.88071 13.3807 11 12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5Z" fill={darkMode ? 'white' : 'black'}>
                            </path>
                            <path d="M15.5812 16H8.50626C8.09309 16 7.87415 15.5411 8.15916 15.242C9.00598 14.3533 10.5593 13 12.1667 13C13.7899 13 15.2046 14.3801 15.947 15.2681C16.2011 15.5721 15.9774 16 15.5812 16Z"
                                fill={darkMode ? 'white' : 'black'} stroke={darkMode ? 'white' : 'black'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <circle cx="12" cy="12" r="10" stroke={darkMode ? 'white' : 'black'} stroke-width="2">
                            </circle>
                        </g>
                    </svg>
                    Profile
                </li>
                <li onClick={handleSignOut} className='hover:bg-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24" height="24"
                        viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"
                        style={{ display: 'inherit' }} fill={darkMode ? 'white' : 'black'} >
                        <path d="M20 3v18H8v-1h11V4H8V3h12zm-8.9 12.1.7.7 4.4-4.4L11.8 7l-.7.7 3.1 3.1H3v1h11.3l-3.2 3.3z">
                        </path>
                    </svg>
                    Sign out
                </li>
            </ul>
        </div>
    )
}

export default AvatarMenu