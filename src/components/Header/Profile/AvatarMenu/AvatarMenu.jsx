import React from 'react';
import './AvatarMenu.css';
import { signOut } from 'firebase/auth';
import Cookies from 'js-cookie';
import { auth } from '../../../../utils/firebase/firbaseAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser, toogleDarkMode } from '../../../../utils/ReduxStore/appSlice';

const AvatarMenu = () => {

    const darkMode = useSelector((store) => store.app.darkMode);
    const userInfo = useSelector((store) => store.app.userInfo);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDarkMode = () => {
        dispatch(toogleDarkMode());
    }

    const handleSignOut = () => {
        if (userInfo.authProvider) {
            signOut(auth).then(() => {
                dispatch(removeUser());
                navigate("/");
            }).catch((error) => {
                dispatch(removeUser());
                console.error(error);
            });
        } else {
            Cookies.remove("is_token");
            dispatch(removeUser());
            navigate("/");
        }
    }

    return (
        <div className='avatar-details'>
            <ul>
                <li onClick={handleDarkMode}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        focusable="false" aria-hidden="true" height="24"
                        style={{ display: 'inherit' }} fill={darkMode ? 'white' : 'black'}>
                        <path d="M12 22C10.93 22 9.86998 21.83 8.83998 21.48L7.41998 21.01L8.83998 20.54C12.53 19.31 15 15.88 15 12C15 8.12 12.53 4.69 8.83998 3.47L7.41998 2.99L8.83998 2.52C9.86998 2.17 10.93 2 12 2C17.51 2 22 6.49 22 12C22 17.51 17.51 22 12 22ZM10.58 20.89C11.05 20.96 11.53 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3C11.53 3 11.05 3.04 10.58 3.11C13.88 4.81 16 8.21 16 12C16 15.79 13.88 19.19 10.58 20.89Z"></path>
                    </svg>
                    Appearance
                </li>
                <li onClick={handleSignOut}>
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